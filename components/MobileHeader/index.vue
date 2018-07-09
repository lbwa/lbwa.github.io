!<template>
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
</template>

<script>
export default {
  methods: {
    mobileShowList () {
      this.$emit('toggleMenuList')
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/sass/index.sass'

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
    background-color: $background-white
    transition: transform 0.2s 0.2s

  .line-crust-top
    +position(absolute, 23px, null, null, 16px)
    transform: translateY(-3px)

  .line-crust-bottom
    +position(absolute, null, null, 23px, 16px)
    transform: translateY(3px)

.show-list
  .line-crust
    transform: translateY(0)

  .line-top
    transform: rotate(45deg)

  .line-bottom
    transform: rotate(-45deg)

</style>
