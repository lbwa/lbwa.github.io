<template>
  <section class="home-container">
    <app-logo/>
    <h1 class="title">
      Bowen
    </h1>
    <h4 class="home-subtitle subtitle">
      Positive exploration &amp; deep thinking
    </h4>
    <div class="home-navigator">
      <nuxt-link
        to="/blog/writings"
        class="home-btn button-primary">Writings</nuxt-link>
      <a
        href="https://github.com/lbwa"
        target="_blank"
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
  min-height: 100vh
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  text-align: center

  .home-navigator
    display: flex
    .home-btn
      flex: 1 0 0
      margin: 0 12px

  .home-subtitle
      display: block

+mobile
  html
    font-size: 14px
</style>
