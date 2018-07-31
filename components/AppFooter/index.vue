<template>
  <footer class="blog-footer sf-main">
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
  display: flex
  flex-direction: column
  justify-content: center

  +mobile
    margin: 20px 0 30px 0

  .footer-info
    text-align: center
    font-size: .8rem

    .author
      font-weight: bold
</style>

