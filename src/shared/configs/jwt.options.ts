import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModuleOptions, JwtOptionsFactory } from "@nestjs/jwt";

@Injectable()
export class JwtOptions implements JwtOptionsFactory {
    constructor(private readonly configService: ConfigService) { }

    createJwtOptions(): JwtModuleOptions | Promise<JwtModuleOptions> {
        return {
            secret: this.configService.get('JWT_SECRET') || 'secret',
            signOptions: {
                expiresIn: this.configService.get('JWT_EXPIRE_AT') || '1h'
            }
        }
    }
}