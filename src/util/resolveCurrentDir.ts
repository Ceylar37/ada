import { resolve } from 'node:path'

function resolveCurrentDir(...paths: string[]) {
  return resolve(import.meta.dirname, ...paths)
}

export { resolveCurrentDir }
