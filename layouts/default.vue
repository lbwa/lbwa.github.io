<template>
  <nuxt/>
</template>

<style lang="sass">
@import '~/assets/style/variable.sass'

html
  width: 100vw
  overflow-x: hidden
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif
  font-size: 16px
  word-spacing: 1px
  -ms-text-size-adjust: 100%
  -webkit-text-size-adjust: 100%
  -moz-osx-font-smoothing: grayscale
  -webkit-font-smoothing: antialiased
  box-sizing: border-box

*, *:before, *:after
  box-sizing: border-box
  margin: 0

ul,ol
  padding-left: 1.2em

ul, ol, p
  line-height: 1.7

p
  margin: 1em 0

h2
  margin: 0.83em 0

a
  color: $theme-lightgreen

.button--green
  display: inline-block
  border-radius: 4px
  border: 1px solid $theme-green
  color: $theme-green
  text-decoration: none
  padding: 10px 30px

.button--green:hover
  color: #fff
  background-color: $theme-green

.button--grey
  display: inline-block
  border-radius: 4px
  border: 1px solid $theme-blue
  color: $theme-blue
  text-decoration: none
  padding: 10px 30px
  margin-left: 15px

.button--grey:hover
  color: #fff
  background-color: $theme-blue

.view
  max-width: 800px
  margin: 0 auto
  position: relative

.appear-active
  transition: opacity 0.4s ease
</style>
