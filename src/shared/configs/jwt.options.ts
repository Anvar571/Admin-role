import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';

export enum JWT_INTERFACE {
  JWT_SECRET = 'JWT_SECRET',
  JWT_EXPIRE_AT = 'JWT_EXPIRE_AT',
  JWT_REFRESH_SECRET = 'JWT_REFRESH_SECRET',
  JWT_REFRESH_EXPIRES_IN = 'JWT_REFRESH_EXPIRES_IN'
}

@Injectable()
export class JwtOptions implements JwtOptionsFactory {
  constructor(private readonly configService: ConfigService) { }

  createJwtOptions(): JwtModuleOptions | Promise<JwtModuleOptions> {
    return {
      secret: this.configService.get(JWT_INTERFACE.JWT_SECRET) || 'secret',
      signOptions: {
        expiresIn: this.configService.get('JWT_EXPIRE_AT') || '1h',
      },
    };
  }
}
