import { configSchema, set as setConfig } from '@/config';

import { AppCommand } from '../type';

const set: AppCommand<typeof configSchema> = {
  name: 'set',
  description: 'sets variable to config',
  options: [['-m, --manager <npm | yarn | pnpm>', 'package manager that will be used to install dependencies']],
  schema: configSchema,
  action: setConfig
};

export { set };
