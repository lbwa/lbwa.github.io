<template>
  <section class="blog">
    <Header/>
    <keep-alive>
      <router-view class="wrapper" role="main"/>
    </keep-alive>
  </section>
</template>

<script>
import Header from '~/components/AppHeader'

export default {
  // redirect solution: https://nuxtjs.org/api/context
  asyncData ({ route, redirect }) {
    if (/^\/blog(\/)?$/i.test(route.path)) {
      redirect(301, '/blog/writings')
    }
  },

  components: {
    Header
  }
}
</script>

<style lang="sass">
@import '~/assets/sass/index.sass'

.blog
  position: relative
  color: $text

  .wrapper
    margin: 0 auto
    +desktop
      max-width: $desktop - (2 * $gap)
      width: $desktop - (2 * $gap)

  a.header-anchor
    font-size: .9em
    float: left
    margin-left: -0.87em
    padding-right: 0.23em
    margin-top: 0.125em

</style>

