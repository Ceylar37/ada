import type { z } from 'zod'

import type { managerSchema } from './schema'

type Manager = z.infer<typeof managerSchema>

export type { Manager }
