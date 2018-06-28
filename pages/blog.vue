<template>
  <section class="blog">
    <Header/>
    <keep-alive>
      <router-view role="main"/>
    </keep-alive>
  </section>
</template>

<script>
import Header from '~/components/AppHeader'

export default {
  // redirect solution: https://nuxtjs.org/api/context
  asyncData ({ route, redirect }) {
    if (/^\/blog(\/)?$/i.test(route.path)) {
      redirect(301, '/blog/writing')
    }
  },

  components: {
    Header
  }
}
</script>

<style lang="sass">
@import '~/assets/style/index.sass'

.blog
  margin: 0 auto
  position: relative
  color: $text-dark
  +desktop
    max-width: $desktop - (2 * $gap)
    width: $desktop - (2 * $gap)
  +widescreen
    max-width: $widescreen - (2 * $gap)
    width: $widescreen - (2 * $gap)
  +fullhd
    max-width: $fullhd - (2 * $gap)
    width: $fullhd - (2 * $gap)

  a.header-anchor
    font-size: .85em
    float: left
    margin-left: -0.87em
    padding-right: 0.23em
    margin-top: 0.125em


  code
    color: $text-quote
    padding: 0.25em .5em
    margin: 0
    background-color: $background-dark
    border-radius: 3px
    font-size: .95em
    font-family: source-code-pro,Menlo,Monaco,Consolas,Courier New,monospace

  pre code
    color: $text-light
    padding: 0
</style>

