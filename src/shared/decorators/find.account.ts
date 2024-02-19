import {
  ExecutionContext,
  UnauthorizedException,
  createParamDecorator,
} from '@nestjs/common';
import { IncomingMessage } from 'http';

export const User = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest<IncomingMessage>();

    if (!req['user']) {
      throw new UnauthorizedException();
    }

    return req['user'];
  },
);
