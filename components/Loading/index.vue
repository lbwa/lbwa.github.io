<template>
  <section class="loading-wrapper" v-show="show">
    <div class="loading">
      <div class="loading-item"></div>
      <div class="loading-item"></div>
      <div class="loading-item"></div>
      <div class="loading-item"></div>
      <div class="loading-item"></div>
    </div>
    <a class="loading-tips"  @click.stop.prevent="back">Back to page</a>
  </section>
</template>

<script>
import eventBus from '~/lib/event-bus'

export default {
  data () {
    return {
      show: false
    }
  },

  methods: {
    toggleLoading (status = false) {
      this.show = status
    },

    back () {
      this.toggleLoading(false)
      this.$router.push('/blog/writings/')
    }
  },

  created () {
    eventBus.$on('toggleLoading', (status) => this.toggleLoading(status))
  }
}
</script>

<style lang="sass">
@import '~/assets/sass/var/index.sass'

@keyframes loading-scale
  0%
    transform: scaleY(1.0)
  50%
    transform: scaleY(0.4)
  100%
    transform: scaleY(1.0)

@function delay($interval, $count, $index)
  @return ($index * $interval) - ($interval * $count)

.loading-wrapper
  position: fixed
  top: 0
  left: 0
  right: 0
  bottom: 0
  z-index: 999
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  background-color: rgba(0, 0, 0, .95)

@for $i from 1 through 5
  .loading-item:nth-child(#{$i})
    animation: loading-scale 1s delay(0.1s, 5, $i) infinite cubic-bezier(.2,.68,.18,1.08)

.loading-item
  display: inline-block
  width: 4px
  height: 35px
  border-radius: 2px
  margin: 2px
  background-color: $text-light

.loading-tips
  margin-top: 20px
  cursor: pointer
  color: $text-light
</style>
