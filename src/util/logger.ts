const logger = {
  info(message: string) {
    console.log(`\x1B[32m${message}\x1B[0m`)
  },

  warn(message: string) {
    console.log(`\x1B[33m${message}\x1B[0m`)
  },

  error(message: string) {
    console.log(`\x1B[31m${message}\x1B[0m`)
  },
}

export { logger }
