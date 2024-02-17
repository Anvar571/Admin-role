import {
  CallHandler,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  NestInterceptor,
} from '@nestjs/common';
import { ServerResponse } from 'http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    try {
      const response = context.switchToHttp().getResponse<ServerResponse>();

      if (response.statusCode === 500) {
        throw new InternalServerErrorException(
          'something happened on the server',
        );
      }

      return next.handle();
    } catch (error) {
      throw new InternalServerErrorException(
        'something happened on the server',
      );
    }
  }
}
