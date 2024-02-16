import { Inject } from '@nestjs/common';
import { DB_CONNECTION_NAME } from '../injects';

export function InjectKnex() {
  return function (target: any, key: string | symbol, index?: number) {
    Inject(DB_CONNECTION_NAME)(target, key, index);
  };
}
