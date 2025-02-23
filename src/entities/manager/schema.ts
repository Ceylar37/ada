import { z } from 'zod';

const managerSchema = z.enum(['npm', 'yarn', 'pnpm']);

export { managerSchema };
