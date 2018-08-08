<template>
  <section class="section-container">
    <div class="home-section nav-section full-m-height ta-center grid grid-center grid-jc-center">
      <div class="logo-container">
        <HomeLogo
          class="home-logo show-animation"
          :logoColor="homeColor"
          :logoWidth="logoWidth"
          :logoRate="logoRate"
        />
        <h4 :style="fontColor" class="home-subtitle subtitle show-animation">
          Positive exploration &amp; deep thinking
        </h4>
      </div>
      <div class="arrow-container __position">
        <svg :fill="homeColor" width="24px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path d="M256 294.1L383 167c9.4-9.4 24.6-9.4 33.9 0s9.3 24.6 0 34L273 345c-9.1 9.1-23.7 9.3-33.1.7L95 201.1c-4.7-4.7-7-10.9-7-17s2.3-12.3 7-17c9.4-9.4 24.6-9.4 33.9 0l127.1 127z"/>
        </svg>
      </div>
    </div>

    <RecentPosts class="grid col grid-center grid-jc-center" :recentPosts="recentPosts"/>
  </section>
</template>

<script>
import HomeLogo from '~/components/HomeLogo'
import RecentPosts from '~/components/RecentPosts'
import { getRecentPosts } from '~/lib/axios'
import eventBus from '~/lib/event-bus'

export default {
  layout: 'home',

  data () {
    return {
      homeColor: 'hsl(210, 12%, 16%)',
      logoWidth: '15rem',
      logoRate: 0.2777 // width / height
    }
  },

  computed: {
    fontColor () {
      return `color: ${this.homeColor}`
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
      ({ data } = await getRecentPosts())
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
    HomeLogo,
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

.home-section

  /deep/ .home-icon
    display: inline-block
    margin-right: 5px
    height: 1.6rem // for ie 11
    width: 1.6rem

  &.full-m-height
    min-height: 100vh

  .home-subtitle
    display: block
    margin: 0
    padding: 0

  .home-logo
    margin: 0 auto

// background-image with a wrapper

// ie 需设定 height 来修正垂直居中失效的问题
// min-height 可覆盖 height
// https://stackoverflow.com/questions/19371626/flexbox-not-centering-vertically-in-ie
.nav-section
  height: 1px
  background-image: linear-gradient(rgba(255, 255, 255, .65), rgba(255, 255, 255, .65)), url('~/static/bg/home-nav.jpg')
  background-size: cover
  background-position: 50% 50%
  background-repeat: no-repeat
  background-attachment: fixed

// animation

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
    transform: translate3d(-50%, -150px, 0)

  50%
    opacity: 1
    transform: translate3d(-50%, 0, 0)

  to
    opacity: 1
    transform: translate3d(-50%, 0, 0)

.arrow-container
  +position(absolute, null, null, 30px, calc(50% + 12px))
  width: 24px
  opacity: 0
  animation: showArrow 6s forwards cubic-bezier(.86,0,.07,1) 1s
  font-size: 0

  +mobile
    bottom: 30px

</style>
