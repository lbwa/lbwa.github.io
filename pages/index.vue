<template>
  <section class="home-container">
    <HomeHeader/>

    <div class="home entry-section full-m-height ta-center flex-js-center flex-ai-center">
      <app-logo class="logo show-animation" :logoColor="logoColor" :logoWidth="logoWidth" :logoRate="logoRate"/>
      <h4 class="home-subtitle subtitle show-animation">
        Positive exploration &amp; deep thinking
      </h4>
      <div class="arrow-container">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path d="M256 294.1L383 167c9.4-9.4 24.6-9.4 33.9 0s9.3 24.6 0 34L273 345c-9.1 9.1-23.7 9.3-33.1.7L95 201.1c-4.7-4.7-7-10.9-7-17s2.3-12.3 7-17c9.4-9.4 24.6-9.4 33.9 0l127.1 127z"/>
        </svg>
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
import HomeHeader from '~/components/HomeHeader'
import AppLogo from '~/components/AppLogo'
import RecentPosts from '~/components/RecentPosts'
import axios from '~/lib/axios'
import eventBus from '~/lib/event-bus'

export default {
  data () {
    return {
      logoColor: 'hsl(210, 12%, 16%)',
      logoWidth: '15rem',
      logoRate: 0.2777, // width / height
      sessionStorage: false
    }
  },

  computed: {
    genYear () {
      const date = new Date().getFullYear()
      return date === 2018 ? date : `2018 - ${date}`
    }
  },

  async asyncData ({ error }) {
    if (eventBus.$data.recentPosts) {
      return {
        recentPosts: [...eventBus.$data.recentPosts]
      }
    }

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

    eventBus.$data.recentPosts = [...data]

    return { recentPosts }
  },

  components: {
    HomeHeader,
    AppLogo,
    RecentPosts,
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

  .home-subtitle
    display: block
    margin: 0
    padding: 0

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

@keyframes show
  from
    opacity: 0

  to
    opacity: 1

.show-animation
  animation: show 3s forwards

@keyframes showArrow
  0%
    opacity: 0
    transform: translateY(-250px)

  50%
    opacity: 1
    transform: translateY(0)

  to
    opacity: 1
    transform: translateY(0)

.arrow-container
  position: absolute
  // left: 50%
  // transform: translateX(-50%)
  bottom: 50px
  width: 24px
  opacity: 0
  animation: showArrow 6s forwards cubic-bezier(.86,0,.07,1) 1s
  font-size: 0

</style>
