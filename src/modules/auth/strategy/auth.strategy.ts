import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { JWT_INTERFACE } from "@shared/configs/jwt.options";
import { InjectKnex } from "@shared/utility/knex.inject";
import { Knex } from "knex";
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Request as RequestType } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectKnex() private readonly knex: Knex,
        private readonly configService: ConfigService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                JwtStrategy.extractJWT,
                ExtractJwt.fromAuthHeaderAsBearerToken()
            ]),
            ignoreExpiration: false,
            secretOrKey: configService.get(JWT_INTERFACE.JWT_SECRET),
        })
    }

    private static extractJWT(req: RequestType): string | null {
        if (
            req.cookies &&
            'user_refresh_token' in req.cookies &&
            req.cookies.user_refresh_token.length > 0
        ) {
            return req.cookies.user_refresh_token;
        }
        return null;
    }
    async validate(payload: any) {
        return { userId: payload.id };
    }
}