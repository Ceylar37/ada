import type { z } from 'zod'

import type { configSchema, selectConfigSchema } from './schema'

type Config = z.infer<typeof configSchema>
type SelectConfig = z.infer<typeof selectConfigSchema>

export type { Config, SelectConfig }
