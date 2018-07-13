<template>
  <div class="skeleton">
    <div class="skeleton-img"></div>

    <slot name="main"></slot>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="sass" scoped>

@keyframes loading
  0%
    background-position: -150% 0
  100%
    background-position: 200% 0

.skeleton-img
  height: 200px
  width: 200px
  background: rgba(0, 0, 0, .2)

  // :empty 伪类匹配该元素没有子节点时的情况
  // 当节点被任意子节点填充时，伪类将解除匹配
  &:empty::after
    content: ' '
    display: block
    width: 100%
    height: 100%
    border-radius: 6px
    box-shadow: 0 10px 45px rgba(0, 0, 0, .1)

    background-image: linear-gradient(90deg, rgba(lightgrey, 0) 0, rgba(lightgrey, .8) 50%, rgba(lightgrey, 0) 100%)

    background-size: 50% 100%
    background-repeat: no-repeat

    animation: loading 1s infinite

</style>
