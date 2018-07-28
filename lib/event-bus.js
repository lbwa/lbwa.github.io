import Vue from 'vue'

// storage functionality only works on this session.
// implement local storage without window.sessionStorage even if disable cache
// 灵感来自于既然 event bus 能做到 独立于 应用形成一个监听事件的系统，那么亦可作为存储数据的中介
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
