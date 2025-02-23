import { z } from 'zod';

interface AppCommand<Schema extends z.ZodType> {
  name: string;
  description: string;
  options?: [string, string?][];
  action: (options: z.infer<Schema>) => void;
  schema: Schema;
  isDefault?: true;
}

export type { AppCommand };
