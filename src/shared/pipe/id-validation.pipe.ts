import { z } from 'zod';
import { ZodDtoClass } from './validation.pipe';

const idSchema = z.object({
  id: z
    .string()
    .regex(/^\d+$/, {
      message: 'Invalid id',
    })
    .transform(Number),
});

export class IdDto extends ZodDtoClass<typeof idSchema> {
  static override schema = idSchema;
}
