import { get as getConfig } from '@/config';
import { selectConfigSchema } from '@/config/schema';
import { isEmpty } from '@/util';

import { AppCommand } from '../type';

const get: AppCommand<typeof selectConfigSchema> = {
  name: 'get',
  description: 'get variables from config',
  options: [['-m, --manager', 'package manager that will be used to install dependencies']],
  schema: selectConfigSchema,
  action: (options) => {
    if (isEmpty(options)) {
      console.log(getConfig());
      return;
    }
    console.log(getConfig(options));
  }
};

export { get };
