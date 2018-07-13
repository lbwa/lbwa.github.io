<template>
  <section :class="['sk-container', filterData ? '' : '__has-hide__']">
    <div class="sk-show-helper" v-if="filterData">
      <slot></slot>
    </div>
  </section>
</template>

<script>
// This components has been deprecated because of suitability
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

$card-padding: 24px
$desc-line-height: 10px
$desc-line-skeleton: linear-gradient(white $desc-line-height, transparent 0)
$desc-line-1-width: 140px
$desc-line-1-position: $card-padding 20px
$desc-line-2-width: 140px
$desc-line-2-position: $card-padding 40px
$desc-line-3-width: 210px
$desc-line-3-position: $card-padding * 8 20px
$desc-line-4-width: 160px
$desc-line-4-position: $card-padding * 8 40px

.sk-container
  position: relative

  &.__has-hide__
    padding: 1.25rem 0

  // 仅当子元素为空时匹配，并展示伪元素背景图
  &:empty::after
    content: ' '
    display: block
    margin: 0 auto
    min-height: 12.5rem
    width: 90%
    border-radius: 5px
    z-index: -1

    background-image: $desc-line-skeleton, $desc-line-skeleton, $desc-line-skeleton, $desc-line-skeleton
    background-size: $desc-line-1-width $desc-line-height, $desc-line-2-width $desc-line-height, $desc-line-3-width $desc-line-height, $desc-line-4-width $desc-line-height
    background-position: $desc-line-1-position, $desc-line-2-position, $desc-line-3-position, $desc-line-4-position
    background-repeat: no-repeat
    background-color: $skeleton-bg
</style>
