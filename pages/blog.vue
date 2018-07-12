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
      if (/^\/blog\/writings\//.test(this.$route.path)) {
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

    let res
    try {
      res = await axios.get('menu.json')
    } catch (err) {
      error({ statusCode: 404, message: err })
    }
    const menu = res.data

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
    margin: 0 auto
    padding: 100px 25px

    +desktop
      max-width: $desktop - (2 * $gap)
      width: $desktop - (2 * $gap)

    +mobile
      padding: 60px 25px

  a.header-anchor
    font-size: .9em
    float: left
    margin-left: -0.87em
    padding-right: 0.23em
    margin-top: 0.125em

</style>

