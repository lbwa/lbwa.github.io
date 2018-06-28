<template>
  <nuxt/>
</template>

<style lang="sass">
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
  color: #3eaf7c

.button--green
  display: inline-block
  border-radius: 4px
  border: 1px solid #3b8070
  color: #3b8070
  text-decoration: none
  padding: 10px 30px

.button--green:hover
  color: #fff
  background-color: #3b8070

.button--grey
  display: inline-block
  border-radius: 4px
  border: 1px solid #35495e
  color: #35495e
  text-decoration: none
  padding: 10px 30px
  margin-left: 15px

.button--grey:hover
  color: #fff
  background-color: #35495e

.view
  max-width: 800px
  margin: 0 auto
  position: relative

.appear-active
  transition: opacity 0.4s ease
</style>
