import { registerSchema } from 'src/schema';
import { ZodDtoClass } from 'src/shared/pipe/validation.pipe';

export class RegisterDto extends ZodDtoClass<typeof registerSchema> {
  static override schema = registerSchema;
}
