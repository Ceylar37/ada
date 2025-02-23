import { resolveCurrentDir } from '@/util';

import { get } from './get';
import { Config } from './type';

import fs from 'fs';

const set = (newConfigData: Config) => {
  const configPath = resolveCurrentDir('config.json');
  const config = get();
  fs.writeFileSync(configPath, JSON.stringify({ ...config, ...newConfigData }));
};

export { set };
