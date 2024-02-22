import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { AuthRepository } from './repository/auth.repository';
import { AccountsRepository } from '../account/repository/account.repository';
import * as bcrypt from 'bcrypt';
import { LoginWebDto } from './dto/login.dto';
import { PasswordRepository } from './repository/password.repository';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly passwordRepository: PasswordRepository,
    private readonly accountRepository: AccountsRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
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

    return this.authRepository.insertAccountAndPassword(otherData, hash);
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

    const access_token = await this.genereateToken({
      sub: hashAccount.id,
      user: {
        id: hashAccount.id,
        name: hashAccount.first_name,
        role_id: hashAccount.role_id,
      },
    });

    console.log(access_token, 'access_token');

    return { id: hashAccount.id, type: 'accounts', access_token };
  }

  async genereateHash(password: string): Promise<string> {
    const hash = await bcrypt.hash(password, 10);

    return hash;
  }

  async compareHash(hash: string, password: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  async genereateToken(payload: any): Promise<string> {
    const options = {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: this.configService.get('JWT_EXPIRE_AT'),
    };

    return this.jwtService.sign(payload, options);
  }
}
