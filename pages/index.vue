<template>
  <section class="container">
    <div>
      <app-logo/>
      <h1 class="title">
        Bowen
      </h1>
      <h4 class="subtitle">
        Think more, do more.
      </h4>
      <div class="links">
        <nuxt-link
          to="/blog/writing"
          class="button--green">Writings</nuxt-link>
        <a
          href="https://github.com/lbwa"
          target="_blank"
          class="button--grey">GitHub</a>
      </div>
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
@import '~/assets/style/variable.sass'

.container
  min-height: 100vh
  display: flex
  justify-content: center
  align-items: center
  text-align: center
</style>
