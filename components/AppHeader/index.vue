<template>
  <header class="header">
    <nav class="navigator" role="navigation">
      <router-link class="blog-logo" to="/" exact>
        <img class="header-logo" src="./logo.png" alt="logo">
      </router-link>
      <div class="links">
        <router-link
          class="navigator-link"
          v-for="item of category" :key="item"
          :to="`/blog/${item.toLowerCase()}`"
        >{{ item }}</router-link>
        <a href="https://github.com/lbwa" target="_blank" rel="noopener banner" class="github-link">Created by Bowen</a>
      </div>
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
  font-size: 0

  .navigator
    display: flex
    box-sizing: border-box
    margin: 0 auto
    padding: 13px 10px

    .blog-logo
      flex: 0 0 50px

      .header-logo
        width: 30px

    .links
      flex: 1
      display: flex

    .navigator-link, .github-link
      font-size: 1rem
      font-weight: 300
      text-decoration: none

    .navigator-link
      display: inline-block
      vertical-align: top
      color: $text-light
      transition: color .15s ease
      margin-right: 1.6875rem

    .github-link
      color: $text-light
      margin-left: auto

+mobile
  .header
    .navigator
      padding: 15px
    .navigator-link, .github-link
      margin-right: 1em
    .github-link
      display: none

+desktop
  .navigator
    max-width: $desktop - (2 * $gap)
    width: $desktop - (2 * $gap)
  .router-link-active, .nuxt-link-active
    margin-bottom: -2px
    border-bottom: 2px solid rgba(255, 255, 255, .2)

+widescreen
  .navigator
    max-width: $widescreen - (2 * $gap)
    width: $widescreen - (2 * $gap)

+fullhd
  .navigator
    max-width: $fullhd - (2 * $gap)
    width: $fullhd - (2 * $gap)
</style>

