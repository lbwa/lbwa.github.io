<template>
  <footer class="blog-footer">
    <div class="footer-info">Copyright &copy; {{genYear}} <a
    target="_blank" rel="noopener" href="https://github.com/lbwa" class="author">Bowen</a></div>
  </footer>
</template>

<script>
export default {
  computed: {
    genYear () {
      return (new Date()).getFullYear()
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/sass/index.sass'

.blog-footer
  position: absolute
  left: 50%
  bottom: 0
  transform: translateX(-50%)
  margin: 30px 0 70px 0
  display: flex
  flex-direction: column
  justify-content: center
  height: 50px

  +mobile
    margin: 20px 0 30px 0

  .footer-info
    font-size: .8rem

    .author
      font-weight: bold
</style>

