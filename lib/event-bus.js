import Vue from 'vue'

// storage functionality only works on current session.
// 因为应用暂时需要管理的状态不算太多，暂缓使用 vuex，保证应用轻便
const bus = new Vue({
  data: {
    writings: {},
    tagsMap: {},
    postsMap: {}
    // menu: [],
    // projects: [],
  }
})

export default bus
