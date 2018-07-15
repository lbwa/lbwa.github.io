<template>
  <section class="blog">
    <Header/>

    <keep-alive>
      <router-view class="wrapper" :menu="menu" role="main"/>
    </keep-alive>

    <Footer/>

    <Loading/>
  </section>
</template>

<script>
import Header from '~/components/AppHeader'
import Footer from '~/components/AppFooter'
import Loading from '~/components/Loading'
import debounce from '~/lib/debounce'
import eventBus from '~/lib/event-bus'
import axios from '~/lib/axios'

export default {
  data () {
    return {
      initialScroll: 0,
      nowScroll: 0
    }
  },

  methods: {
    onScroll () {
      // only work with writings page
      if (/^\/blog\/writings\/\S+/.test(this.$route.path)) {
        this.nowScroll = document.body.scrollTop + document.documentElement.scrollTop

        if (this.nowScroll > this.initialScroll) {
          eventBus.$emit('hideHeader')
        } else if (this.nowScroll < this.initialScroll) {
          eventBus.$emit('showHeader')
        }

        this.initialScroll = this.nowScroll
      }
    }
  },

  mounted() {
    window.addEventListener('scroll', debounce(this.onScroll), false)
  },

  // redirect solution: https://nuxtjs.org/api/context
  async asyncData ({ error, route, redirect }) {
    if (/^\/blog(\/)?$/i.test(route.path)) {
      redirect(301, '/blog/writings/')
    }

    if (eventBus.$data.menu) {
      return {
        menu: eventBus.$data.menu
      }
    }

    let res
    try {
      res = await axios.get('menu')
    } catch (err) {
      error({ statusCode: 404, message: err })
    }
    const menu = res.data

    eventBus.$data.menu = menu

    return { menu }
  },

  beforeDestroy() {
    window.removeEventListener('scroll', debounce(this.onScroll), false)
  },

  components: {
    Header,
    Footer,
    Loading
  }
}
</script>

<style lang="sass">
@import '~/assets/sass/index.sass'

.blog
  position: relative
  top: 0
  left: 0
  min-height: 100%
  padding-bottom: 150px
  color: $text

  +mobile
    padding-bottom: 100px

  // locate route view
  .wrapper
    margin: 0 auto 0 auto
    padding-top: 60px

    +desktop
      max-width: $desktop - (2 * $gap)
      width: $desktop - (2 * $gap)
      padding-top: 70px

      &.articles-container
        padding-right: 20px
        padding-left: 20px

  a.header-anchor
    opacity: 0 // unlock by h1, ... tags hover status
    font-size: .9em
    float: left
    margin-left: -0.87em
    padding-right: 0.23em
    margin-top: 0.125em

</style>

