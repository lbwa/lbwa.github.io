export default {
  info (...info) {
    console.info(`info:`, ...info)
  },

  warn (...warn) {
    console.warn(`warn:`, ...warn)
  },

  err (...err) {
    console.error(`error:`, ...err)
  }
}
