export default {
  info (prefix=`[Info]`, ...info) {
    isDevMode() && console.info(`%c ${prefix}`, 'color: dodgerblue',  ...info)
  },

  warn (prefix=`[Warn]`, ...warn) {
    isDevMode() && console.warn(`%c ${prefix}`, 'color: yellow', ...warn)
  },

  err (prefix=`[Error]`, ...err) {
    isDevMode() && console.error(`%c ${prefix}`, 'color: red', ...err)
  }
}

function isDevMode () {
  return process.env.NODE_ENV === 'development' && isBrowser()
}

function isBrowser () {
  return typeof window !== undefined
}
