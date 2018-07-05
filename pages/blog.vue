<template>
  <section class="blog">
    <Header/>
    <keep-alive>
      <router-view class="wrapper" role="main"/>
    </keep-alive>
    <Footer/>
  </section>
</template>

<script>
import Header from '~/components/AppHeader'
import Footer from '~/components/AppFooter'
import debounce from '~/lib/debounce'
import eventBus from '~/lib/event-bus'

export default {
  data () {
    return {
      initialScroll: 0,
      nowScroll: 0
    }
  },

  methods: {
    onScroll () {
      // Must filter `/blog/writings`, otherwise it will cause a bug that show
      // a error `style of undefined` when from `/` to '/blog/writings` first time
      if (this.$route.path === '/blog/writings') return

      this.nowScroll = document.body.scrollTop + document.documentElement.scrollTop

      if (this.nowScroll > this.initialScroll) {
        eventBus.$emit('hideHeader')
      } else if (this.nowScroll < this.initialScroll) {
        eventBus.$emit('showHeader')
      }

      this.initialScroll = this.nowScroll
    }
  },

  mounted() {
    window.addEventListener('scroll', debounce(this.onScroll))
  },


  // redirect solution: https://nuxtjs.org/api/context
  asyncData ({ route, redirect }) {
    if (/^\/blog(\/)?$/i.test(route.path)) {
      redirect(301, '/blog/writings')
    }
  },

  components: {
    Header,
    Footer
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

