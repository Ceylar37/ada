import { configSchema, selectConfigSchema } from './schema';

import { z } from 'zod';

type Config = z.infer<typeof configSchema>;
type SelectConfig = z.infer<typeof selectConfigSchema>;

export type { Config, SelectConfig };
