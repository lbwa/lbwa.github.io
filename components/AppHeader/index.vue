<template>
  <header :class="['header', 'components-animation', hide ? 'hide-menu' : '']">
    <nav class="navigator" role="navigation">
      <router-link
        class="navigator-link hover-animation"
        v-for="item of category" :key="item"
        :to="genPath(item)"
        exact
      >{{ item.toUpperCase() }}</router-link>
      <a class="navigator-link hover-animation" href="https://github.com/lbwa" target="_blank" rel="noopener">CONTACT</a>
    </nav>
  </header>
</template>

<script>
import eventBus from '~/lib/event-bus'

export default {
  data () {
    return {
      category: [
        'home',
        'writings',
        'projects',
        'tags'
      ],

      hide: false
    }
  },

  mounted () {
    eventBus.$on('hideHeader', () => {
      this.hideMenu()
    })
    eventBus.$on('showHeader', () => {
      this.showMenu()
    })
  },

  methods: {
    genPath (name) {
      if (name === 'home') {
        return '/'
      } else if (name !== 'contact') {
        return `/blog/${name.toLowerCase()}/`
      }
    },

    // https://cn.vuejs.org/v2/api/#ref
    // 不推荐使用 $refs 来进行数据绑定
    hideMenu () {
      this.hide = true
    },

    showMenu () {
      this.hide = false
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/sass/index.sass'

// https://github.com/lbwa/lbwa.github.io/issues/5
.hide-menu
  transform: translateY(-90%)

.header
  position: fixed
  top: 0
  left: 0
  width: 100vw // keep header debounce when scroll bar show up
  background-color: $background-dark
  z-index: 999
  font-size: 0 // delete white space

  .navigator
    display: flex
    margin: 0 auto
    padding: 20px 10px
    max-width: 500px
    text-align: center

    .navigator-link
      flex: 1
      vertical-align: top
      color: $text-grey-light
      font-size: 1rem
      font-weight: 300
      text-decoration: none
      transition: color .15s ease

      &.nuxt-link-exact-active
        color: $text-light

// TODO: 适配低分辨率移动端，如 i5
+mobile
  .header
    .navigator
      padding: 15px
    .navigator-link
      margin-right: 1em

+desktop
  .navigator
    max-width: $desktop - (2 * $gap)
    width: $desktop - (2 * $gap)

</style>

