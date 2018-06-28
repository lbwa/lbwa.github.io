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
  // redirect: https://nuxtjs.org/api/context
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
  +desktop
    max-width: $desktop - (2 * $gap)
    width: $desktop - (2 * $gap)
  +widescreen
    max-width: $widescreen - (2 * $gap)
    width: $widescreen - (2 * $gap)
  +fullhd
    max-width: $fullhd - (2 * $gap)
    width: $fullhd - (2 * $gap)
</style>

