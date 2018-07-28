<template>
  <header class="home-header __position ta-center">
    <nav class="nav-list">
      <router-link
        class="nav-item hover-scale-animation no-text-decoration"
        v-for="item of navigators"
        :key="item.name"
        :to="item.to"
      >{{item.name}}</router-link>
      <a href="mailto:mr_lbw@outlook.com" class="nav-item hover-scale-animation no-text-decoration">Contact</a>
    </nav>
  </header>
</template>

<script>
export default {
  data () {
    return {
      navigators: [
        {
          name: 'Writings',
          to: `/blog/writings/`
        },
        {
          name: 'Projects',
          to: '/blog/projects/'
        }
      ]
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/sass/index.sass'

.home-header
  +position(fixed, 0, null, null, 0)
  z-index: 99
  width: 100%
  background-color: $background-white

  .nav-list
    padding: 30px 0

    .nav-item
      margin: 0  10px
      opacity: 0.45
      font-size: .9rem
      font-weight: 500
      text-transform: uppercase

      &:hover
        color: $link
        opacity: 1

.hover-scale-animation
  position: relative

  &::after
    content: ' '
    position: absolute
    left: 0
    width: 100%
    height: 1px
    bottom: -5px
    background-color: $link
    opacity: 0
    transform: scale(0)
    transition: all .25s cubic-bezier(.82,0,.12,1)

  &:hover::after
    opacity: 1
    transform: scale(1)

+mobile
  .home-header
    .nav-list
      padding: 15px 0
</style>
