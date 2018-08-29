<template>
  <transition name="fad">
    <button
      class="floating-btn __position"
      v-show="isOffset"
      @click.stop.prevent="scrollToTop"
    >
      <svg class='icon-rocket' viewBox="0 0 512 512">
        <path d="M256 421.6c-18.1 0-33.2-6.8-42.9-10.9-5.4-2.3-11.3 1.8-10.9 7.6l3.5 51c.2 3.1 3.8 4.7 6.3 2.8l14.5-11c1.8-1.4 4.5-.9 5.7 1l20.5 32.1c1.5 2.4 5.1 2.4 6.6 0l20.5-32.1c1.2-1.9 3.9-2.4 5.7-1l14.5 11c2.5 1.9 6.1.3 6.3-2.8l3.5-51c.4-5.8-5.5-10-10.9-7.6-9.8 4.1-24.8 10.9-42.9 10.9z"/>
        <path d="M397.7 293.1l-48-49.1c0-158-93.2-228-93.2-228s-94.1 70-94.1 228l-48 49.1c-1.8 1.8-2.6 4.5-2.2 7.1L130.6 412c.9 5.7 7.1 8.5 11.8 5.4l67.1-45.4s20.7 20 47.1 20c26.4 0 46.1-20 46.1-20l67.1 45.4c4.6 3.1 10.8.3 11.8-5.4l18.5-111.9c.2-2.6-.6-5.2-2.4-7zM256.5 192c-17 0-30.7-14.3-30.7-32s13.8-32 30.7-32c17 0 30.7 14.3 30.7 32s-13.7 32-30.7 32z"/>
      </svg>
    </button>
  </transition>
</template>

<script>
import { throttle } from '~/lib/debounce-throttle'

const OFFSET_SHOW = 200

export default {
  data () {
    return {
      isOffset: false
    }
  },

  methods: {
    scrollToTop () {
      const ROOT = document.documentElement

      if (ROOT.scrollIntoView) {
        ROOT.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
        return
      }

      if (window.scrollTo) {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
        return
      }

      if (ROOT.scrollTop) {
        ROOT.scrollTop = 0
      }
    },

    setVisibility () {
      /**Compatible with IOS browser
       * 1. document.documentElement.scrollTop only work with desktop chrome,
       * doesn't work on some ios browser(including qq, chrome, safari)
       * 2. document.body.scrollTop work on ios browser(qq, chrome, safari),
       * doesn't work on desktop chrome
       */
      this.isOffset = (document.documentElement.scrollTop
        || window.pageYOffset
        || document.body.scrollTop)
        >= OFFSET_SHOW
    }
  },

  mounted () {
    // ! make sure remove same callback before component has been destroyed
    this.cacheOnScroll = throttle(this.setVisibility)
    window.addEventListener('scroll', this.cacheOnScroll, false)
  },

  beforeDestroy () {
    window.removeEventListener('scroll', this.cacheOnScroll, false)
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/sass/index.sass'
@import '~/assets/color/background.sass'

.floating-btn
  +position(fixed, null, 26px, 26px, null)
  padding: 10px
  width: 56px
  height: 56px
  background: $background-dark
  color: $text-light
  border: none
  border-radius: 50%
  outline: none
  cursor: pointer
  box-shadow: 0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)

.icon-rocket
  fill: $text-light

.fad-enter-active, .fad-leave-active
  transition: all .3s ease
  transform-origin: center center 0px

.fad-enter, .fad-leave-to
  transform: scale(0)
</style>
