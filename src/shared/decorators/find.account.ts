import {
  ExecutionContext,
  InternalServerErrorException,
  UnauthorizedException,
  createParamDecorator,
} from '@nestjs/common';
import { IncomingMessage } from 'http';

export const User = createParamDecorator(
  (data: string, context: ExecutionContext) => {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest<IncomingMessage>();
    const user = req['user'];

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    try {
      if (!data) {
        return user.user;
      } else if (!(data in user?.user)) {
        throw new InternalServerErrorException(
          'There is an error in the user decarator',
        );
      }

      return user.user[data];
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  },
);
