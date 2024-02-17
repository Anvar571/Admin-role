import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { AuthRepository } from './repository/auth.repository';
import { PasswordRepository } from './repository/password.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly passwordRepository: PasswordRepository,
  ) {}

  async registerWeb({ data }: RegisterDto) {
    const { password, ...otherData } = data;
    return this.authRepository.insertAccountAndPassword(otherData, password);
  }
}
