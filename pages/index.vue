<template>
  <section class="home-container">
    <div class="home full-m-height ta-center flex-js-center flex-ai-center">
      <app-logo class="logo" :logoColor="logoColor" :logoWidth="logoWidth" :logoRate="logoRate"/>
      <h4 class="home-subtitle subtitle">
        Positive exploration &amp; deep thinking
      </h4>
      <div :class="['home-navigator', 'animation', animation ? '' : 'ini-ani']">
        <router-link
          to="/blog/writings/"
          class="home-btn button-primary">Writings</router-link>
        <a
          href="https://github.com/lbwa"
          target="_blank"
          rel="noopener"
          class="home-btn button-primary">GitHub</a>
      </div>
    </div>

    <RecentPosts :recentPosts="recentPosts"/>

    <footer class="home-footer ta-center">
      <div class="footer-info">Copyright &copy; {{genYear}} <a
        target="_blank"
        rel="noopener"
        href="https://github.com/lbwa"
        class="author"
      >Bowen</a></div>
    </footer>
  </section>
</template>

<script>
import AppLogo from '~/components/AppLogo'
import RecentPosts from '~/components/RecentPosts'
import axios from '~/lib/axios'

export default {
  data () {
    return {
      logoColor: 'hsl(210, 12%, 16%)',
      logoWidth: '15rem',
      logoRate: 0.2777, // width / height
      animation: false,
      sessionStorage: false
    }
  },

  computed: {
    genYear () {
      const date = new Date().getFullYear()
      return date === 2018 ? `2018` : `2018 - ${date}`
    }
  },

  async asyncData ({ error, route }) {
    let data
    try {
      ({ data } = await axios.get('recent-posts'))
    } catch (err) {
      error({
        statusCode: 404,
        message: err
      })
    }

    const recentPosts = data

    return { recentPosts }
  },

  mounted () {
    this.animation = true
  },

  components: {
    AppLogo,
    RecentPost
  },

  head () {
    return {
      link: [
        { rel: 'alternate', href: `https://set.sh${this.$route.path}`, hreflang: 'zh'}
      ]
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/sass/index.sass'

.home
  +flex-box(column)

  /deep/ .home-icon
    display: inline-block
    margin-right: 5px
    width: 1.6rem

  &.full-m-height
    min-height: 100vh

  .logo
    margin-bottom: .625rem

  .home-subtitle
    display: block

  .home-navigator
    +flex-box(row)

    .home-btn
      flex: 1
      margin: 0 .75rem
      transition: all .4s

.animation
  transition: opacity 235ms cubic-bezier(.4,0,.2,1), transform 500ms cubic-bezier(.86,0,.07,1)

  &.ini-ani
    opacity: 0
    transform: translateY(120%)

.home-footer
  padding: 100px 0
  border-top: 1px solid $border-white

  .footer-info
    font-size: .8rem

    .author
      font-weight: bold

@keyframe fadeIn
  from
    opacity: 0
    transform: translate3d(-100%, 0 ,0)

  to
    opacity: 1
    transform: none

.fade-in
  animation-name: fadeIn

</style>
