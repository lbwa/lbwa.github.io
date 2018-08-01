// ! fn shouldn't be a array function, otherwise it will cause invalid bind.
// Because array function has no own `this`
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

// only works on above 10 in IE series
// 1000ms/60 --> Invoked by every 16.666ms
export function requestAnimationFrame (fn = function () {}) {
  window.requestAnimationFrame(fn)
}
