export default {
  info (...info) {
    console.info(`[Info]:`, ...info)
  },

  warn (...warn) {
    console.warn(`[Warn]:`, ...warn)
  },

  err (...err) {
    console.error(`[Error]:`, ...err)
  }
}
