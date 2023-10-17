import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('auth/sign-up')
  signup() {}

  @Post('auth/sign-in')
  signin() {}

  @Post('auth/verification')
  verification() {}

  @Post('auth/logout')
  logout() {}
}
