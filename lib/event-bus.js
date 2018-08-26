import Vue from 'vue'

// storage functionality only works on current session.
// implement local storage without window.sessionStorage even if disable cache
// 因为应用暂时需要管理的状态不算太多，暂缓使用 vuex，保证应用轻便
const bus = new Vue({
  data: {
    // prevent undefined error which occur when first read
    // eventBus.$data.writings[id]
    writings: {}
    // menu: [],
    // projects: []
  }
})

export default bus
