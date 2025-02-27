#!/usr/bin/env node
import * as commands from '@/cli/commands';
import { parseCliError } from '@/cli/util';
import { logger } from '@/util';

import packageJSON from '../package.json';

import { program } from 'commander';

program.name('ada');
program.version(packageJSON.version);

Object.values(commands).map((command) => {
  const currentCommand = program.command(command.name, {
    isDefault: command.isDefault
  });

  currentCommand.description(command.description);

  command.options?.forEach((option) => {
    currentCommand.option(option[0], option[1]);
  });

  currentCommand.action((options) => {
    const { success, data, error } = command.schema.safeParse(options);
    if (success) {
      // @ts-expect-error: type inference
      command.action(data);
    } else {
      logger.error(`${parseCliError(error, process.argv, command.options || [])}`);
    }
  });
});

// program
//   .command('init', { isDefault: true })
//   .description('initialize configs')
//   .option('-p, --prettier', 'setup prettier')
//   .option('-e, --eslint', 'setup eslint')
//   .action((options) => {
//     console.log('init', options);
//   });

// program
//   .command('set')
//   .description('sets variable to config')
//   .option('-m, --manager <npm | yarn | pnpm>', 'package manager that will be used to install dependencies')
//   .action((options) => {
//     console.log('set', options);
//   });

program.parse(process.argv);
