import { loginSchema } from 'src/schema';
import { ZodDtoClass } from 'src/shared/pipe/validation.pipe';

export class LoginWebDto extends ZodDtoClass<typeof loginSchema> {
  static override schema = loginSchema;
}
