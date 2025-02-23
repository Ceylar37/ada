import { ZodError } from 'zod';

const getOptionKeys = (option: [string, string?]) => {
  const short = option[0].match(/(?<!-)-(\w)/)?.[1];
  const long = option[0].match(/--(\w+)/)?.[1];

  return { short, long };
};

const parseCliError = (error: ZodError, argv: string[], declaredOptions: [string, string?][]) => {
  const option = declaredOptions.map(getOptionKeys).find(({ long, short }) => {
    return long ? error.errors[0].path[0] === long : error.errors[0].path[0] === short;
  });

  if (option) {
    const { short, long } = option;
    const errorOption = argv.findLast((arg) => arg === `-${short}` || arg === `--${long}`);

    return `Error in option "${errorOption}". ${error.errors[0].message}`;
  }
};

export { parseCliError };
