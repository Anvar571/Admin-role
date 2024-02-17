import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('auth/sign-in')
  loginWeb() {}

  @Post('auth/sign-up')
  registerWeb(@Body() data: RegisterDto) {
    return this.authService.registerWeb(data);
  }

  @Get('verifications')
  getAllPendingVerifications() {}
}
