// ! fn shouldn't be a array function, otherwise it will cause invalid bind.
// Because array function has no own `this`
/**
 * @param {Function} fn callback
 * @param {now} now invoke callback when first calling
 * @param {wait} wait waiting period
 * @return {Function} callback wrapper
 */
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

/**
 * throttle function that only invokes 'fn' at most once per every `period` time
 *
 * @export
 * @param {*} fn the function to throttle
 * @param {number} [period=200] the number of ms to throttle invocations
 * @returns a function wrapper
 */
export function throttle (fn, period=200) {
  let _lastTime = null
  let _timer = null
  return function (...args) {
    const _nowTime = +new Date()

    _timer && clearTimeout(_timer)

    if (!_lastTime || _nowTime - _lastTime > period) {
      fn.apply(this, args)
      _lastTime = _nowTime
    } else {
      // Ensure last invoking will be performed
      // using Array function to keep `this` value
      _timer = setTimeout(() => {
        fn.apply(this, args)
      }, period)
    }
  }
}

// 1000ms/60 --> Invoked by every 16.666ms
/**
 * activate callback by window.requestAnimationFrame
 * @param {Function} fn callback
 * @param {Element} ele DOM element, repaint area(optional)
 * @return {Function} a callback wrapper
 */
export function activateAnimation (fn = function () {}, ele) {
  // 函数惰性加载
  let _requestAnimation = window.requestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.mozRequestAnimationFrame
    || window.oRequestAnimationFrame
    || window.msRequestAnimationFrame

  if (!_requestAnimation) {
    ele = 200
    _requestAnimation = throttle
  }

  // id 用于 window.cancelAnimationFrame
  let _id

  // callback wrapper
  return function () {
    _id = _requestAnimation(fn, ele)
  }
}
