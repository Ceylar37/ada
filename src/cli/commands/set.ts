import type { AppCommand } from '../type'

import { configSchema, set as setConfig } from '@/config'

const set: AppCommand<typeof configSchema> = {
  name: 'set',
  description: 'sets variable to config',
  options: [['-m, --manager <npm | yarn | pnpm>', 'package manager that will be used to install dependencies']],
  schema: configSchema,
  action: setConfig,
}

export { set }
