<template>
  <div class="home">
    <HomeHeader/>

    <nuxt/>

    <footer class="home-footer ta-center">
      <div class="footer-info">Copyright &copy; {{genYear}} <a
        target="_blank"
        rel="noopener"
        href="https://github.com/lbwa"
        class="author"
      >Bowen</a></div>
    </footer>
  </div>
</template>

<script>
import HomeHeader from '~/components/HomeHeader'

export default {
  computed: {
    genYear () {
      const date = new Date().getFullYear()
      return date === 2018 ? date : `2018 - ${date}`
    }
  },

  components: {
    HomeHeader
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/sass/index.sass'

.home-footer
  padding: 100px 0
  border-top: 1px solid $border-white

  +mobile
    padding: 50px 0

  .footer-info
    font-size: .8rem

    .author
      font-weight: bold
</style>

