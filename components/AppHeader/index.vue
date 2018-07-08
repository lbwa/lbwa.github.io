<template>
  <header
    :class="[
      'header',
      '__position',
      'components-animation',
      hide ? 'hide-header' : '',
      mobileShow ? 'show-list' : ''
      ]">

    <nav class="mobile-navigator">
      <label
        class="label-line"
        @click.stop.prevent="mobileShowList"
      >
        <span class="__position label-line line-top">
          <span class="__position line-crust line-crust-top"></span>
        </span>
        <span class="__position label-line line-bottom">
          <span class="__position line-crust line-crust-bottom"></span>
        </span>
      </label>
    </nav>

    <nav
      class="navigator __position"
      role="navigation"
      @click.stop="selectCategory"
    >
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

      hide: false,

      mobileShow: false
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
    },

    mobileShowList () {
      this.mobileShow = !this.mobileShow
    },

    selectCategory () {
      const mobileShow = this.mobileShow
      if (this.mobileShow) this.mobileShow = false
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/sass/index.sass'

.header
  +position(fixed, 0, null, null,0)
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
      transition: color .15s ease, opacity .3s linear, transform .3s linear

      &.nuxt-link-exact-active
        color: $text-light

  .mobile-navigator
    display: none

+mobile
  .header
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
        margin-bottom: 20px
        transform: scale(1.1, 1.1) translateY(-24px)
        opacity: 0

+desktop
  .navigator
    max-width: $desktop - (2 * $gap)
    width: $desktop - (2 * $gap)

// https://github.com/lbwa/lbwa.github.io/issues/5
.hide-header
  transform: translateY(-90%)

.label-line
  +position(absolute, 0, null, null, 0)
  z-index: 1 // 防止展开动画过程中 menu 遮挡
  display: inline-block
  height: 48px
  width: 48px
  transition: transform 0.25s 0.2s cubic-bezier(0.4, 0.01, 0.165, 0.99)

  .line-crust
    display: block
    height: 1px
    width: 17px
    background-color: #fff
    transition: transform 0.2s 0.2s

  .line-crust-top
    +position(absolute, 23px, null, null, 16px)
    transform: translateY(-3px)

  .line-crust-bottom
    +position(absolute, null, null, 23px, 16px)
    transform: translateY(3px)

.show-list
  .navigator
    visibility: visible
    transform: translateY(0)

    .navigator-link
      opacity: 1
      transition-delay: 300ms, 300ms
      transform: none
      @for $i from 1 through 5
        &:nth-child(#{$i})
          transition-delay: ($i - 1) * 60ms + 300ms, ($i - 1) * 60ms + 300ms

  .line-crust
    transform: translateY(0)

  .line-top
    transform: rotate(45deg)

  .line-bottom
    transform: rotate(-45deg)

</style>

