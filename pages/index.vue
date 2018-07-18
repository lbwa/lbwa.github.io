<template>
  <section class="home-container">
    <app-logo class="logo" :logoColor="logoColor" :logoWidth="logoWidth" :logoRate="logoRate"/>
    <h4 class="home-subtitle subtitle">
      Positive exploration &amp; deep thinking
    </h4>
    <div :class="['home-navigator', 'animation', animation ? '' : 'ini-ani']">
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
  data () {
    return {
      logoColor: 'hsl(210, 12%, 16%)',
      logoWidth: '15rem',
      logoRate: 0.2777, // width / height
      animation: false
    }
  },

  mounted () {
    this.animation = true
  },

  components: {
    AppLogo
  }
}
</script>

<style lang="sass">
@import '~/assets/sass/index.sass'

.home-container
  +fullscreen-center-helper(100%, column)

  .logo
    margin-bottom: .625rem

  .home-subtitle
    display: block

  .home-navigator
    display: flex

    .home-btn
      flex: 1
      margin: 0 .75rem
      transition: all .4s

.animation
  transition: opacity 235ms cubic-bezier(.4,0,.2,1), transform 500ms cubic-bezier(.4,0,.2,1)

  &.ini-ani
    opacity: 0
    transform: translateY(120%)

</style>
