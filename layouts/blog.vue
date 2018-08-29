<template>
  <section class="blog sf__parent__clearfix">
    <Header/>

    <nuxt/>

    <Footer/>

    <Loading/>
  </section>
</template>

<script>
import Header from '~/components/BlogHeader'
import Footer from '~/components/BlogFooter'
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
  min-height: 100%
  color: $text
  background-color: $background-white-bis
</style>
