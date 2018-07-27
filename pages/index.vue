<template>
  <section class="home-container">
    <div class="home full-m-height ta-center flex-js-center flex-ai-center">
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
    </div>

    <div class="home recent-section ta-center flex-js-center flex-ai-center">
      <header class="recent-section-header">
          <svg class="home-icon icon-bookmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path d="M128 80v380c0 3.3 3.8 5.2 6.4 3.2l116.8-92c2.9-2.1 6.8-2.1 9.6 0l116.8 92c2.6 2 6.4.1 6.4-3.2V80c0-17.7-14.3-32-32-32H160c-17.7 0-32 14.3-32 32z"/>
        </svg>
        <h2 class="recent-section-title">Recent Posts</h2>
      </header>
      <ul class="recent-posts">
        <li
          class="front-teaser no-list-style"
          v-for="post of recentPosts"
          :key="post.to"
        >
          <router-link
            :to="`/blog/writings/${post.to}`"
            class="post-title no-text-decoration"
          >
            <h3 class="post-title-content">{{post.title}}</h3>
          </router-link>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import AppLogo from '~/components/AppLogo'
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
    AppLogo
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

<style lang="sass">
@import '~/assets/sass/index.sass'

.home
  +flex-box(column)

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

.recent-section
  border-top: 1px solid $border-white
  padding: 100px 25px

  +mobile
    padding: 100px 0

  .recent-section-header
    margin: 0.83em 0
    font-style: italic

    .recent-section-title
      display: inline-block
      margin: 0

    .icon-bookmark
      vertical-align: bottom
      fill: $icon-red

  .recent-posts
    padding-left: 0

  .front-teaser
    position: relative
    margin-top: 1rem
    margin-bottom: 1rem

    +mobile
      margin-right: 15px
      margin-left: 15px

    // box-shadow: 1px 1px 15px 4px rgba(67, 38, 100, 0.15)
    +shadow-basis(-1, 1)

    &::after
      border-radius: 5px

  .post-title
    display: block
    padding: 1.875rem // 扩充有效点击范围

  .post-title-content
    display: inline-block
    margin: 0

.animation
  transition: opacity 235ms cubic-bezier(.4,0,.2,1), transform 500ms cubic-bezier(.86,0,.07,1)

  &.ini-ani
    opacity: 0
    transform: translateY(120%)

.home-icon
  display: inline-block
  margin-right: 5px
  width: 1.6rem

</style>
