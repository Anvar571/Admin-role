import { Body, Controller, Get, Post, Response } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginWebDto } from './dto/login.dto';
import { PublicAPI } from '@shared/utility/public.api';
import { Response as ResExpr } from 'express';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @PublicAPI()
  @Post('auth/sign-in')
  async loginWeb(
    @Response({ passthrough: true }) res: ResExpr,
    @Body() dto: LoginWebDto,
  ) {
    const result = await this.authService.loginWeb(dto);
    res.cookie('user_refresh_token', result.refresh_token, {
      httpOnly: false,
    });
    delete result.refresh_token;
    return result;
  }

  @PublicAPI()
  @Post('auth/sign-up')
  registerWeb(@Body() data: RegisterDto) {
    return this.authService.registerWeb(data);
  }

  @Get('verifications')
  getAllPendingVerifications() {}
}
