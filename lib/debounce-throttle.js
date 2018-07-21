
export function debounce (fn, now=true, wait=200) {
  let _timer = null
  // anonymous wrapper
  return function (...args) {
    clearTimeout(_timer)
    if (now) {
      const callNow = !_timer
      _timer = setTimeout(() => {
        // using Array function to keep `this` value
        fn.apply(this, args)
      }, wait)

      // Only work with first calling
      callNow && fn.apply(this, args)
    } else {
      // when now is false
      _timer = setTimeout(() => {
        fn.apply(this, args)
      }, wait)
    }
  }
}
