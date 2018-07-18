<template>
  <section class="home-container">
    <app-logo class="logo"/>
    <h4 class="home-subtitle subtitle">
      Positive exploration &amp; deep thinking
    </h4>
    <div class="home-navigator">
      <nuxt-link
        to="/blog/writings/"
        class="home-btn button-primary">Writings</nuxt-link>
      <a
        href="https://github.com/lbwa"
        target="_blank"
        rel="noopener"
        class="home-btn button-primary">GitHub</a>
    </div>
  </section>
</template>

<script>
import AppLogo from '~/components/AppLogo'

export default {
  components: {
    AppLogo
  }
}
</script>

<style lang="sass">
@import '~/assets/sass/index.sass'

.home-container
  +fullscreen-center-helper(100vh, column)

  .logo
    margin-bottom: .625rem

  .home-subtitle
    display: block

  .home-navigator
    display: flex
    .home-btn
      flex: 1 0 0
      margin: 0 .75rem
      transition: all .4s

</style>
