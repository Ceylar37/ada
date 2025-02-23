import { resolveCurrentDir } from '@/util';

import { Config, SelectConfig } from './type';

import fs from 'fs';

interface Get {
  (): Config;
  <T extends SelectConfig>(configSelect: SelectConfig): Pick<Config, T extends SelectConfig ? keyof T : never>;
  <T extends keyof Config>(key: T): Config[T];
}

const get = ((key: keyof Config | SelectConfig | undefined) => {
  const configPath = resolveCurrentDir('config.json');
  const exists = fs.existsSync(configPath);

  if (!exists) {
    return {} as Config;
  }

  const config = JSON.parse(fs.readFileSync(configPath, 'utf-8')) as Config;

  if (key && typeof key === 'object') {
    return Object.fromEntries(
      Object.entries(key)
        .filter(([key]) => config[key as keyof SelectConfig] !== undefined)
        .map(([key]) => [key, config[key as keyof SelectConfig]] as const)
    ) as Pick<Config, keyof SelectConfig>;
  }

  if (key) {
    return config[key];
  }

  return config;
}) as Get;

export { get };
