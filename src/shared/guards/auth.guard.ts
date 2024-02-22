import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { IncomingMessage } from 'http';
import { IS_PUBLIC_KEY } from '../constants';
import { AccountsRepository } from '@src/modules/account/repository/account.repository';

@Injectable()
export class AuthGuardWithJwt extends AuthGuard('jwt') {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly accountRepository: AccountsRepository
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = context.switchToHttp();
    const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());

    if (isPublic) {
      return ctx.getNext();
    }

    const req = ctx.getRequest<IncomingMessage>();

    if (!req.headers['user-agent']) {
      throw new UnauthorizedException();
    }

    const authToken: string = req.headers['authorization'];

    if (!authToken) {
      throw new UnauthorizedException('Token not found')
    }

    const [hasBearer, token] = authToken.split(' ');

    if (hasBearer !== 'Bearer') {
      throw new UnauthorizedException();
    } else if (!token) {
      throw new UnauthorizedException('Token was not found');
    }

    const checkToken = await this.jwtService.decode(token);
    
    if (!checkToken?.user?.id) {
      throw new UnauthorizedException('An error was found with the user token')
    }

    const hasAccount = await this.accountRepository.findByAnyParam({ id: checkToken.user.id });

    if (!hasAccount) {
      throw new UnauthorizedException('Account not found');
    }

    if (!checkToken) {
      throw new UnauthorizedException('Invalid token');
    }

    req['user'] = checkToken;

    return ctx.getNext();
  }
}
