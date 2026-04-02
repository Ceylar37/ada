import type { Config } from './type'

import fs from 'node:fs'

import { resolveCurrentDir } from '@/util'
import { get } from './get'

function set(newConfigData: Config) {
  const configPath = resolveCurrentDir('config.json')
  const config = get()
  fs.writeFileSync(configPath, JSON.stringify({ ...config, ...newConfigData }))
}

export { set }
