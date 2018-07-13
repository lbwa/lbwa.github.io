<template>
  <section :class="['sk-container', filterData ? '' : '__has-hide__']">
    <div class="sk-show-helper" v-if="filterData">
      <slot></slot>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    contentData: {
      default: ''
    }
  },

  computed: {
    filterData () {
      if (this.contentData === 0) return true // when input `0` number value
      if (this.contentData.length === 0) return false // when input []
      return !!this.contentData
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/sass/var/index.sass'

.sk-container
  position: relative

  &.__has-hide__
    padding: 1.25rem 0

  // 仅当子元素为空时匹配，并展示伪元素背景图
  &:empty::after
    content: ' '
    display: block
    margin: 0 auto
    min-height: 6.25rem
    width: 90%
    background: $skeleton-bg
    border-radius: 5px
    z-index: -1
</style>
