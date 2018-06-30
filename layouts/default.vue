<template>
  <nuxt/>
</template>

<style lang="sass">
@import '~/assets/style/variable.sass'

// global sass

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

p, li
  line-height: 1.8
  margin: .5em 0

h1, h2, h3, h4
  margin: 0.83em 0

a
  color: $theme-lightgreen

table
  display: block
  width: 100%
  border-collapse: collapse
  border-spacing: 0
  margin: 16px 0
  tr:nth-child(2n)
    background-color: #f6f8fa
  tr
    background-color: $background-white
    border-top: 1px solid $text-grey
    th, td
      padding: 6px 13px
      border: 1px solid $theme-grey

.button--green
  display: inline-block
  border-radius: 4px
  border: 1px solid $theme-green
  color: $theme-green
  text-decoration: none
  padding: 10px 30px
  &:hover
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
  &:hover
    color: #fff
    background-color: $theme-blue

.view
  max-width: 800px
  margin: 0 auto
  position: relative

.appear-active
  transition: opacity 0.4s ease

.title
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif
  display: block
  font-weight: 300
  font-size: 5vh
  color: $text-title
  letter-spacing: 1px

.subtitle
  font-weight: 300
  font-size: 2vh
  color: $text-subtitle
  word-spacing: 5px
  padding-bottom: 15px

</style>
