<template>
  <div class="avatar-wrapper">
    <img class="avatar" src="./author.svg" alt="author">
  </div>
</template>

<style lang="sass">
@import '~/assets/sass/index.sass'

$logo-width: 15rem

.avatar-wrapper
  position: relative
  width: $logo-width
  padding-top: 0.277 * $logo-width // padding is used to avatar debounce
  overflow: hidden
  white-space: nowrap
  border-radius: 5px

  .avatar
    position: absolute
    top: 0
    left: 0
</style>

