<template>
  <header
    :class="[
      'header',
      '__position',
      'components-animation',
      hide ? 'hide-header' : '',
      showMenuList ? 'show-list' : ''
      ]">

    <MobileHeader @toggleMenuList="toggleMenuList"/>

    <nav
      class="navigator __position grid"
      role="navigation"
      @click.stop="collapseMenuList"
    >
      <router-link
        class="navigator-link hover-animation grid-cell"
        v-for="item of category" :key="item"
        :to="genPath(item)"
        exact
      >{{ item.toUpperCase() }}</router-link>
      <a class="navigator-link hover-animation grid-cell" href="https://github.com/lbwa" target="_blank" rel="noopener">GITHUB</a>
    </nav>

    <div class="background-helper __position" @click.stop.prevent="collapseMenuList"></div>

  </header>
</template>

<script>
import MobileHeader from '~/components/MobileHeader'
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

      hide: false,

      showMenuList: false
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
    // 不推荐使用 $refs 来进行数据绑定，因为不能保证取值时 $ref 一定已经存在
    hideMenu () {
      this.hide = true
      this.collapseMenuList()
    },

    showMenu () {
      this.hide = false
    },

    toggleMenuList () {
      this.showMenuList = !this.showMenuList
    },

    collapseMenuList () {
      if (this.showMenuList) this.showMenuList = false
    }
  },

  components: {
    MobileHeader
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/sass/index.sass'

@import '~/assets/color/background.sass'
@import '~/assets/color/text.sass'

.header
  +position(fixed, 0, null, null,0)
  width: 100vw // keep header debounce when scroll bar show up
  background-color: $background-dark
  z-index: 999
  font-size: 0 // delete white space
  box-shadow: 0 5px 15px rgba(0, 0, 0, .50)

  .navigator
    margin: 0 auto
    padding: 0 10px
    max-width: 500px
    text-align: center

    .navigator-link
      vertical-align: top
      padding: 20px 0
      color: $text-grey-light
      font-size: 1rem
      font-weight: 300
      text-decoration: none
      transition: color .15s ease, opacity .3s linear, transform .3s linear

      &.nuxt-link-exact-active
        color: $text-light

  .mobile-navigator
    display: none

+mobile
  .header
    // ! show mobile header
    .mobile-navigator
      display: block

    .navigator
      +position(absolute, 40px, 0, null, 0)
      display: block
      height: auto
      padding: 0 15px
      visibility: hidden
      max-width: 100%
      transform: translateY(-100%)
      background-color: $background-dark
      transition: all .3s linear

    .navigator-link
      display: block
      transform: scale(1.1, 1.1) translateY(-24px) // animation beginning position
      opacity: 0

      &:not(:last-child)
        padding: 10px 0

      &:last-child
        padding-top: 10px

+desktop
  .navigator
    max-width: $desktop - (2 * $gap)
    width: $desktop - (2 * $gap)

// https://github.com/lbwa/lbwa.github.io/issues/5
.hide-header
  transform: translateY(-90%)

.show-list
  .background-helper
    +position(fixed, 41px, 0, 0, 0)
    background-color: rgba(0, 0, 0, .5)
    z-index: -1

  .navigator
    visibility: visible
    transform: translateY(0)

    .navigator-link
      opacity: 1
      transform: none
      @for $i from 1 through 5
        &:nth-child(#{$i})
          transition-delay: ($i - 1) * 50ms + 300ms, ($i - 1) * 50ms + 300ms

</style>

