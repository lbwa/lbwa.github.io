<template>
  <header class="header">
    <nav class="navigator" role="navigation">
      <router-link
        class="navigator-link hover-animation"
        v-for="item of category" :key="item"
        :to="genPath(item)"
        exact
      >{{ item.toUpperCase() }}</router-link>
      <a class="navigator-link hover-animation" href="https://github.com/lbwa" target="_blank">CONTACT</a>
    </nav>
  </header>
</template>

<script>
export default {
  data () {
    return {
      category: [
        'home',
        'writings',
        'tags',
        'projects'
      ]
    }
  },

  methods: {
    genPath (name) {
      if (name === 'home') {
        return '/'
      } else if (name !== 'contact') {
        return `/blog/${name.toLowerCase()}`
      }
    }
  }
}
</script>

<style lang="sass">
@import '~/assets/sass/index.sass'

.header
  position: fixed
  top: 0
  left: 0
  width: 100vw // keep header debounce when scroll bar show up
  background-color: $background-dark
  z-index: 999
  font-size: 0 // delete white space

  .navigator
    display: flex
    margin: 0 auto
    padding: 20px 10px
    max-width: 500px
    text-align: center

    .navigator-link
      flex: 1
      vertical-align: top
      color: $text-light
      font-size: 1rem
      font-weight: 300
      text-decoration: none
      transition: color .15s ease

// TODO: 适配低分辨率移动端
+mobile
  .header
    .navigator
      padding: 15px
    .navigator-link
      margin-right: 1em

+desktop
  .navigator
    max-width: $desktop - (2 * $gap)
    width: $desktop - (2 * $gap)

</style>

