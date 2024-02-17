import {
  ArgumentMetadata,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { z, ZodSchema } from 'zod';

export abstract class ZodDtoClass<T extends ZodSchema> {
  static schema: ZodSchema;
  data!: z.infer<T>;
}

@Injectable()
export class ZodValidationPipe {
  transform(value: Record<string, unknown>, metadata: ArgumentMetadata): any {
    const schemaClass: typeof ZodDtoClass =
      metadata.metatype! as unknown as typeof ZodDtoClass;
    if (!schemaClass?.schema) {
      return value;
    }
    const result = schemaClass.schema.safeParse(value);

    if (result.success === false) {
      const error = result.error.format();
      throw new UnprocessableEntityException(error);
    }
    return result;
  }
}
