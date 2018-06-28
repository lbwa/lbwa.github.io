<template>
  <header class="header">
    <nav class="navigator" role="navigation">
      <router-link class="navigator-link blog-logo" to="/" exact>
        <img src="./logo.png" alt="logo" width="24px">
      </router-link>
      <router-link
        class="navigator-link"
        v-for="item of category" :key="item"
        :to="`/blog/${item.toLowerCase()}`"
      >{{ item }}</router-link>
      <a href="https://github.com/lbwa" target="_blank" rel="noopener banner" class="github-link">Created by Bowen</a>
    </nav>
  </header>
</template>

<script>
export default {
  data () {
    return {
      category: [
        'Writing',
        'Tags',
        'Project'
      ]
    }
  }
}
</script>

<style lang="sass">
@import '~/assets/style/index.sass'

.header
  background-color: $theme-deepgreen
  z-index: 999
  height: 55px
  .navigator
    max-width: 800px
    box-sizing: border-box
    margin: 0 auto
    padding: 15px 5px
    .blog-logo
      margin-right: 10px
    .navigator-link, .github-link
      font-weight: 300
      text-decoration: none
    .navigator-link
      display: inline-block
      vertical-align: top
      color: $text-light
      line-height: 24px
      transition: color .15s ease
      margin-right: 2.3125rem
      &.router-link-active, &.nuxt-link-active
        color: $text-dark
    .github-link
      color: $text-light
      font-size: .9em
      margin: 0
      float: right

+mobile
  .header
    .navigator
      padding: 15px
    .navigator-link, .github-link
      margin-right: 1em
    .github-link
      display: none
</style>

