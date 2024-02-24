import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { AuthRepository } from './repository/auth.repository';
import { AccountsRepository } from '../account/repository/account.repository';
import * as bcrypt from 'bcrypt';
import { LoginWebDto } from './dto/login.dto';
import { PasswordRepository } from './repository/password.repository';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JWT_INTERFACE } from '@shared/configs/jwt.options';
import { AccountStatus, VerificationAction } from '@schema/web';
import { VerificationRepository } from './repository/verification.repository';
import { randomBytes } from 'node:crypto';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly passwordRepository: PasswordRepository,
    private readonly accountRepository: AccountsRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly vereficationRepository: VerificationRepository,
  ) {}

  async registerWeb({ data }: RegisterDto) {
    const { password, ...otherData } = data;
    const hasAccount = await this.accountRepository.findByPhone(
      otherData.phone,
    );

    if (hasAccount) {
      throw new ConflictException('This account already registered');
    }

    const hash = await this.genereateHash(password);

    const [res] = await this.authRepository.insertAccountAndPassword(
      otherData,
      hash,
      AccountStatus.PENDING,
    );

    const verificationCode = await this.createVerification(
      res.id,
      VerificationAction.REGISTRATION,
    );

    return {
      id: verificationCode.id,
      code: verificationCode.code,
    };
  }

  async loginWeb({ data }: LoginWebDto) {
    const hashAccount = await this.accountRepository.findByPhone(data.phone);

    if (!hashAccount) {
      throw new NotFoundException('This account was not found');
    }

    const hasHash = await this.passwordRepository.findHashByAccountId(
      hashAccount.id,
    );

    if (!hasHash) {
      throw new NotFoundException('This account was not found');
    }

    if (!(await this.compareHash(hasHash.hash, data.password))) {
      throw new UnauthorizedException('Login and password is wrong');
    }

    const access_token = await this.genereateTokenAccessToken({
      sub: hashAccount.id,
      user: {
        id: hashAccount.id,
        name: hashAccount.first_name,
        type: hashAccount.type,
      },
    });

    const refresh_token = await this.genereateRefreshToken({
      sub: hashAccount.id,
      user: {
        id: hashAccount.id,
        name: hashAccount.first_name,
        type: hashAccount.type,
      },
    });

    return {
      id: hashAccount.id,
      type: hashAccount.type,
      access_token,
      refresh_token,
    };
  }

  async genereateHash(password: string): Promise<string> {
    const hash = await bcrypt.hash(password, 10);

    return hash;
  }

  async compareHash(hash: string, password: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  async genereateTokenAccessToken(payload: any): Promise<string> {
    const options = {
      secret: this.configService.get(JWT_INTERFACE.JWT_SECRET),
      expiresIn: this.configService.get(JWT_INTERFACE.JWT_EXPIRE_AT),
    };

    return this.jwtService.sign(payload, options);
  }

  /**
   * This method generate new access token by refresh token
   * @param user
   * @returns
   */
  async genereateRefreshToken(payload: any): Promise<string> {
    const options = {
      secret: this.configService.get(JWT_INTERFACE.JWT_REFRESH_SECRET),
      expiresIn: this.configService.get(JWT_INTERFACE.JWT_REFRESH_EXPIRES_IN),
    };

    return this.jwtService.sign(payload, options);
  }

  async updateAccessToken() {}

  async createVerification(
    account_id: number,
    action: VerificationAction,
  ): Promise<{ id: number; code: number }> {
    const code = Number(randomBytes(4).toString());

    const res = await this.vereficationRepository.createVerification(
      account_id,
      action,
      code,
    );

    return {
      id: res.id,
      code,
    };
  }

  async findAllVerifications() {
    return this.vereficationRepository.findAllVerifications();
  }

  async verifiedAccount(verification_id: number, code: string) {
    const hasVerification = await this.vereficationRepository.findVerification(
      verification_id,
    );

    if (!hasVerification) {
      throw new NotFoundException('Verification was not found');
    }

    if (hasVerification.code !== code) {
      throw new UnprocessableEntityException('Verification code wrong');
    }
  }
}
