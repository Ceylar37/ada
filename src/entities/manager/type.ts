import { managerSchema } from './schema';

import { z } from 'zod';

type Manager = z.infer<typeof managerSchema>;

export type { Manager };
