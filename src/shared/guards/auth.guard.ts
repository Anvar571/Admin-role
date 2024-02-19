import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "@nestjs/passport";
import { IncomingMessage } from "http";

@Injectable()
export class AuthGuardWithJwt extends AuthGuard('jwt') {
    constructor(
        private readonly jwtService: JwtService
    ) {
        super();
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const ctx = context.switchToHttp();

        const req = ctx.getRequest<IncomingMessage>();

        const authToken = req.headers['authorization'];
        const [hasBearer, token] = authToken.split(' ');

        if (hasBearer !== 'Bearer') {
            throw new UnauthorizedException();
        } else if (!token) {
            throw new UnauthorizedException('Token was not found');
        }

        const checkToken = await this.jwtService.decode(token);

        if (!checkToken) {
            throw new UnauthorizedException('Invalid token')
        }

        req['user'] = checkToken;

        return ctx.getNext();
    }
}