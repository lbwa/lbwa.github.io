<template>
  <keep-alive>
    <router-view class="wrapper sf-reference" :menu="menu" role="main"/>
  </keep-alive>
</template>

<script>
import { throttle } from '~/lib/debounce-throttle'
import eventBus from '~/lib/event-bus'
import { getMenu } from '~/lib/axios'

export default {
  layout: 'blog',

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
        this.nowScroll = document.documentElement.scrollTop
        || window.pageYOffset
        || document.body.scrollTop

        // fix a bug when scroll bar in IOS browser screen top
        if (this.nowScroll < 0 || this.initialScroll < 0) return

        if (this.nowScroll > this.initialScroll) {
          eventBus.$emit('hideHeader')
        } else if (this.nowScroll < this.initialScroll) {
          eventBus.$emit('showHeader')
        }

        this.initialScroll = this.nowScroll
      }
    },

    resetHeader (newRoute, oldRoute) {
      if (newRoute.path === '/blog/writings/') {
        eventBus.$emit('showHeader')
      }
    }
  },

  watch: {
    '$route': 'resetHeader'
  },

  // https://nuxtjs.org/faq/window-document-undefined#window-or-document-undefined-
  mounted() {
    // ! make sure remove same callback before component has been destroyed
    this.cacheOnScroll = throttle(this.onScroll)
    window.addEventListener('scroll', this.cacheOnScroll, false)
  },

  // redirect solution: https://nuxtjs.org/api/context
  async asyncData ({ error, route, redirect }) {
    if (/^\/blog(\/)?$/i.test(route.path)) {
      redirect(301, '/blog/writings/')
    }

    if (eventBus.$data.menu) {
      return {
        menu: [...eventBus.$data.menu]
      }
    }

    let res
    try {
      res = await getMenu()
    } catch (err) {
      error({ statusCode: 404, message: err })
    }
    const menu = res.data

    eventBus.$data.menu = [...menu]

    return { menu }
  },

  beforeDestroy() {
    window.removeEventListener('scroll', this.cacheOnScroll, false)
  }
}
</script>

<style lang="sass">
@import '~/assets/sass/index.sass'
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

