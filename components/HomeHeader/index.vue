<template>
  <header :class="['home-header', '__position', isTop ? 'top' : 'not-top']">
    <nav class="nav-list">
      <router-link
        class="nav-item hover-scale-animation global__list__no-deco"
        v-for="item of navigators"
        :key="item.name"
        :to="item.to"
      >{{item.name}}</router-link>
      <a rel="noopener" target="_blank" href="https://github.com/lbwa" class="nav-item hover-scale-animation global__list__no-deco">Github</a>
    </nav>
  </header>
</template>

<script>
import { activateAnimation } from '~/lib/debounce-throttle'

export default {
  data () {
    return {
      navigators: [
        {
          name: 'Writings',
          to: `/blog/writings/`
        },
        {
          name: 'Projects',
          to: '/blog/projects/'
        }
      ],
      isTop: true
    }
  },

  methods: {
    onScroll () {
      this.isTop = (window.pageYOffset || window.scrollY) === 0
    }
  },

  mounted() {
    if (window.pageYOffset || window.scrollY) this.isTop = false

    // ! make sure remove same callback before component has been destroyed
    this.cacheOnScroll = activateAnimation(this.onScroll)
    window.addEventListener('scroll', this.cacheOnScroll, false)
  },

  beforeDestroy () {
    window.removeEventListener('scroll', this.cacheOnScroll, false)
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/mixins/index.sass'
@import '~/assets/mixins/rwd.sass'
@import '~/assets/color/text.sass'
@import '~/assets/color/link.sass'

.home-header
  +position(fixed, 0, null, null, 0)
  z-index: 10
  width: 100%
  transition: background .3s ease
  text-align: center

  .nav-list
    width: 100vw
    padding: 14px 0

  .nav-item
    margin: 0  10px
    font-size: .9rem
    font-weight: 500
    text-transform: uppercase

    &:hover
      color: $link

.hover-scale-animation
  position: relative

  &::after
    content: ' '
    position: absolute
    left: 0
    width: 100%
    height: 1px
    bottom: -5px
    background-color: $text
    opacity: 0
    transform: scale(0)
    transition: all .25s cubic-bezier(.82,0,.12,1)

  &:hover::after
    opacity: 1
    transform: scale(1)

.not-top
  background-color: white
  border: none

  .nav-item, .nav-item:hover
    color: $text-title

  .nav-item::after
    background-color: $text-light

.top
  background-color: transparent

+mobile
  .home-header
    .nav-list
      padding: 15px 0
</style>
