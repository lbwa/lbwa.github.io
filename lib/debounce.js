
export default function debounce (fn, wait=200) {
  let _timer = null
  // anonymous wrapper
  return function (...args) {
    clearTimeout(_timer)
    _timer = setTimeout(() => {
      // using Array function to keep `this` value
      fn.apply(this, args)
    }, wait)
  }
}
