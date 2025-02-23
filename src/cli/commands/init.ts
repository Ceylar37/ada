import { get } from '@/config';
import { Manager, managerSchema } from '@/entities/manager';
import { logger, resolveCurrentDir } from '@/util';

import { AppCommand } from '../type';

import { exec } from 'child_process';
import fsPromises from 'fs/promises';
import { z } from 'zod';

const initSchema = z.object({
  prettier: z.boolean().optional(),
  eslint: z.boolean().optional(),
  typescript: z.boolean().optional(),
  stylelint: z.boolean().optional(),
  manager: managerSchema.optional()
});

const getInstallationString = (manager: Manager, packages: string[]) => {
  switch (manager) {
    case 'npm':
      return `npm install --save-dev ${packages.join(' ')}`;
    case 'yarn':
      return `yarn add --dev ${packages.join(' ')}`;
    case 'pnpm':
      return `pnpm add --save-dev ${packages.join(' ')}`;
  }
};

const installDependencies = (manager: Manager, packages: string[]) => {
  const childProcess = exec(getInstallationString(manager, packages));
  childProcess.stdout?.pipe(process.stdout);
  childProcess.stderr?.pipe(process.stderr);
};

const copyResource = async (resource: string) => {
  await fsPromises.copyFile(resolveCurrentDir('resources', resource), resource);
};

type Init = z.infer<typeof initSchema>;
const setupFunctionsDictionary: Record<Exclude<keyof Init, 'manager'>, (manager: Manager) => void> = {
  prettier: async (manager) => {
    await copyResource('prettier.config.mjs');
    installDependencies(manager, ['prettier']);
  },
  eslint: async (manager) => {
    await copyResource('eslint.config.mjs');
    installDependencies(manager, [
      'eslint',
      '@eslint/js',
      'eslint-plugin-react',
      'eslint-plugin-react-hooks',
      'eslint-plugin-simple-import-sort',
      'globals',
      'typescript-eslint'
    ]);
  },
  typescript: async (manager) => {
    await copyResource('tsconfig.json');
    installDependencies(manager, ['typescript']);
  },
  stylelint: async (manager) => {
    await copyResource('stylelint.config.mjs');
    installDependencies(manager, ['stylelint', 'stylelint-config-standard-scss']);
  }
};

const init: AppCommand<typeof initSchema> = {
  name: 'init',
  description: 'initialize configs',
  options: [
    ['-p, --prettier', 'setup prettier'],
    ['-e, --eslint', 'setup eslint'],
    ['-t, --typescript', 'setup typescript'],
    ['-s, --stylelint', 'setup stylelint'],
    ['-m, --manager <npm | yarn | pnpm>', 'package manager that will be used to install dependencies']
  ],
  schema: initSchema,
  isDefault: true,
  action: (options) => {
    const optionsWithConfig = {
      ...get(),
      ...options
    };

    const { manager, ...rest } = optionsWithConfig;

    if (!manager) {
      return logger.error(
        "Manager didn't specified. Please, set it up with `set` command or use -m or --manager option."
      );
    }

    Object.entries(rest).forEach(([key, value]) => {
      if (value) {
        setupFunctionsDictionary[key as keyof typeof rest](manager);
      }
    });
  }
};

export { init };
