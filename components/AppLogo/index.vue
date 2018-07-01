<template>
  <div class="avatar-wrapper">
    <img class="avatar" src="./avatar.jpg" alt="avatar">
  </div>
</template>

<style lang="sass">

.avatar-wrapper
  position: relative
  width: 180px
  padding-top: 180px // padding is used to avatar debounce
  overflow: hidden
  white-space: nowrap

  .avatar
    position: absolute
    top: 0
    left: 0
</style>

