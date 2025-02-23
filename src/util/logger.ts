const logger = {
  info(message: string) {
    console.log(`\x1b[32m${message}\x1b[0m`);
  },

  warn(message: string) {
    console.log(`\x1b[33m${message}\x1b[0m`);
  },

  error(message: string) {
    console.log(`\x1b[31m${message}\x1b[0m`);
  }
};

export { logger };
