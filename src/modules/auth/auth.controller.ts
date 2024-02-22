import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginWebDto } from './dto/login.dto';
import { PublicAPI } from 'src/shared/utility/public.api';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @PublicAPI()
  @Post('auth/sign-in')
  loginWeb(@Body() dto: LoginWebDto) {
    return this.authService.loginWeb(dto);
  }

  @Post('auth/sign-up')
  registerWeb(@Body() data: RegisterDto) {
    return this.authService.registerWeb(data);
  }

  @Get('verifications')
  getAllPendingVerifications() {}
}
