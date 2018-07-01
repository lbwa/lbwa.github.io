<template>
  <div class="avatar-wrapper">
    <img class="avatar" src="./avatar.jpg" alt="avatar">
  </div>
</template>

<style lang="sass">

.avatar-wrapper
  position: relative
  width: 180px
  padding-top: 180px // padding 占位，防止加载图像时弹跳
  overflow: hidden
  white-space: nowrap

  .avatar
    position: absolute
    top: 0
    left: 0
</style>

