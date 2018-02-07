/* jshint esversion: 6 */
let app = (function() {
  let num = [
      [0, 1, 2, 3, 4, 5], // 0
      [1, 2],
      [0, 1, 6, 4, 3],
      [0, 1, 6, 2, 3],
      [5, 6, 1, 2],
      [0, 5, 6, 2, 3],
      [0, 5, 4, 3, 2, 6],
      [0, 1, 2],
      [0, 1, 2, 3, 4, 5, 6],
      [0, 5, 6, 1, 2, 3]
    ],
    $ = document.querySelectorAll.bind(document),
    _hour = $('.hour'),
    _min = $('.min'),
    _sec = $('.sec'),
    _point = $('.point'),
    time = [_hour[0], _hour[1], _min[0], _min[1], _sec[0], _sec[1]];

  return {

    setTime: function(nowTime) {
      let part = this.querySelectorAll('.part'),
        current = parseInt(this.getAttribute('data-value'));
      if (!isNaN(current) && current != nowTime) {
        num[current].forEach((num) => {
          part[num].classList.remove('on');
        });
      }
      if (isNaN(current) || current != nowTime) {
        num[nowTime].forEach((num, index) => {
          part[num].classList.add('on');
        });
      }
      this.setAttribute('data-value', nowTime);
    },

    runTime: function() {
      let now = /(\d)(\d):(\d)(\d):(\d)(\d)/.exec(new Date()),
        setTime = app.setTime;
      for (let i = 1; i <= 6; i++) {
        setTime.call(time[i - 1], now[i]);
      }
      // 位操作比其他数学操作符和布尔操作符快得多
      // 偶数的的最低位是0，奇数的最低位是1
      if (now[6] & 1) {
        [0, 1, 2, 3].forEach((number) => {
          _point[number].classList.remove('on');
        });
      } else {
        [0, 1, 2, 3].forEach((number) => {
          _point[number].classList.add('on');
        });
      }
    },

    trigger: function(event) {
      // 若多次访问同一对象的方法，则将该方法赋值给局部变量，减少不必要的属性搜索
      runTime = app.runTime;
      setInterval(runTime, 1000);
    }

  };
})();
window.addEventListener('load', app.trigger, false);
