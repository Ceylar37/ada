import { managerSchema } from '@/entities/manager';

import { z } from 'zod';

const configShape = {
  manager: managerSchema.optional()
};
const configSchema = z.object(configShape);

type ToSelectConfigType<T> = {
  [K in keyof T]: z.ZodOptional<z.ZodBoolean>;
};
const selectConfigSchema = z.object(
  Object.fromEntries(configSchema.keyof().options.map((key) => [key, z.boolean().optional()])) as ToSelectConfigType<
    typeof configShape
  >
);

export { configSchema, selectConfigSchema };
