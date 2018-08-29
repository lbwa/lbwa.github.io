<template>
  <div class="home">
    <HomeHeader/>

    <nuxt/>

    <footer class="home-footer home-footer__center">
      <div class="home-footer__info__size">Copyright &copy; {{genYear}} <a
        rel="noopener"
        href="mailto:me@set.sh"
        class="home-footer__info__bold"
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
@import '~/assets/mixins/rwd.sass'
@import '~/assets/color/border.sass'

.home-footer
  padding: 100px 0
  border-top: 1px solid $border-white
  background-image: url('~/static/world-map.png')
  background-repeat: no-repeat
  background-position: 50%
  background-size: contain

  @at-root #{&}__center
    text-align: center

  +mobile
    padding: 50px 0

  @at-root #{&}__info__size
    font-size: .8rem

  @at-root #{&}__info__bold
    font-weight: bold
</style>

