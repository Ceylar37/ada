import { resolve } from 'path';

const resolveCurrentDir = (...paths: string[]) => {
  return resolve(import.meta.dirname, ...paths);
};

export { resolveCurrentDir };
