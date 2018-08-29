<template>
  <section class="err__main __position">
    <div class="err__main__info">$ Seems nothing could fund</div>
    <div class="err__main__info" v-if="shouldWait">$ Start redirecting</div>
    <div class="err__main__info"> .......... </div>
    <div
      class="err__main__info"
      v-if="shouldWait"
      >$ {{cursor}}
      <span class="err__main__animation err__main__cursor">&nbsp;</span>
    </div>
    <router-link v-if="!shouldWait" class="err__main__btn" to="/">Go back to home page.</router-link>
  </section>
</template>

<script>
import { sleep } from '~/lib/utils'

export default {
  props: ['error'],

  data () {
    return {
      cursor: '5',
      shouldWait: false
    }
  },

  computed: {
    msg () {
      return this.error.message
    },
    status () {
      return (this.error && this.error.statusCode) || 500
    }
  },

  mounted () {
    // Back button should be shown if not support Promise
    this.shouldWait = this.status === 404 && Promise
    this.shouldWait ? this.wait() : console.error(this.error)
  },

  methods: {
    async wait () {
      let i = 5
      while (i+1) {
        await sleep(1000)
        this.cursor += `   ${--i}`
      }
      this.$router.push('/')
    }
  },

  head () {
    return {
      title: this.msg
    }
  }
}
</script>

<style lang="sass">
@import '~/assets/mixins/index.sass'
@import '~/assets/mixins/rwd.sass'
@import '~/assets/font/var.sass'
@import '~/assets/font/font.sass'
@import '~/assets/color/index.sass'

@keyframes breath
  0%
    opacity: 0.1

  50%
    opacity: 1

  100%
    opacity: 0.1

.err__main
  +position(absolute, 50%, null, null, 50%)
  transform: translate(-50%, -50%)
  font-family: 'Libre Barcode 128 Text', monospace, sans-serif

  +mobile
    width: 90vw

.err__main__info
  margin-top: 20px
  font-size: 3.5rem

  +mobile
    font-size: 2.5rem

.err__main__animation
  animation: breath 1s forwards infinite ease

.err__main__cursor
  font-size: 2rem
  background-color: $pr-900

.err__main__btn
  display: inline-block
  margin-top: 10px
  font-family: $font-family
  font-size: 1.2rem
</style>
