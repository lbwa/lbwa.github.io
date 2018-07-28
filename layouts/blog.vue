<template>
  <section class="blog">
    <Header/>

    <nuxt/>

    <Footer/>

    <Loading/>
  </section>
</template>

<script>
import Header from '~/components/AppHeader'
import Footer from '~/components/AppFooter'
import Loading from '~/components/Loading'

export default {
  components: {
    Header,
    Footer,
    Loading
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/sass/index.sass'

.blog
  position: relative
  top: 0
  left: 0
  min-height: 100%
  padding-bottom: 150px
  color: $text

  +mobile
    padding-bottom: 100px
</style>
