<template>
  <div class="home">
    <HomeHeader/>

    <nuxt/>

    <footer class="home-footer ta-center">
      <div class="footer-info">Copyright &copy; {{genYear}} <a
        rel="noopener"
        href="mailto:me@set.sh"
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
  background-image: url('~/static/world-map.png')
  background-repeat: no-repeat
  background-position: 50%
  background-size: contain

  +mobile
    padding: 50px 0

  .footer-info
    font-size: .8rem

    .author
      font-weight: bold
</style>

