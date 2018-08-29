<template>
  <section class="loading-wrapper grid col grid-center grid-jc-center" v-show="show">
    <div class="loading">
      <div class="loading-item"></div>
      <div class="loading-item"></div>
      <div class="loading-item"></div>
      <div class="loading-item"></div>
      <div class="loading-item"></div>
    </div>
    <a class="loading-tips"  @click.stop.prevent="back">Loading</a>
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
    }
  },

  created () {
    eventBus.$on('toggleLoading', (status) => this.toggleLoading(status))
  }
}
</script>

<style lang="sass">
@import '~/assets/color/background.sass'
@import '~/assets/color/text.sass'

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
  z-index: 998
  background-color: $background-white

@for $i from 1 through 5
  .loading-item:nth-child(#{$i})
    animation: loading-scale 1s delay(0.1s, 5, $i) infinite cubic-bezier(.2,.68,.18,1.08)

.loading-item
  display: inline-block
  width: 4px
  height: 35px
  border-radius: 2px
  margin: 2px
  background-color: $text

.loading-tips
  margin-top: 20px
  cursor: pointer
  color: $text
</style>
