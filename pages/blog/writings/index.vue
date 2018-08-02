<template>
  <main class="blog-writings">

    <Catalog :title="title" :subtitle="subtitle">
      <ul
        class="catalog-list"
        v-if="menu[0] && menu[0].author"
        slot="main"
        @click.stop.prevent="activateLoading"
      >
        <li
          class="catalog-item grid"
          v-for="post in menu"
          :key="post.title"
        >
          <time class="post-date grid-cell grid-sm-4">{{post.date}}</time>
          <router-link class="post-title grid-cell grid-sm-7 offset-1"
            :to='`/blog/writings/${post.to}/`'
          >{{post.title}}</router-link>
        </li>
      </ul>
    </Catalog>

  </main>
</template>

<script>
import Catalog from '~/components/BaseCatalogs'
import { headMixin } from '~/lib/mixins'
import eventBus from '~/lib/event-bus'

export default {
  mixins: [headMixin],

  props: {
    menu: {
      type: Array,
      default () {
        return []
      }
    }
  },

  data () {
    return {
      title: '写作',
      subtitle: '主动探索，积极思考'
    }
  },

  methods: {
    activateLoading (evt) {
      const target = evt.target
      // msMatchesSelector is a ele.matches implementation on IE9
      if (target.msMatchesSelector && !target.msMatchesSelector('.post-title')) return
      if (target.matches && !target.matches('.post-title')) return
      eventBus.$emit('toggleLoading', true)
    },

    closeLoading () {
      eventBus.$emit('toggleLoading', false)
    }
  },

  watch: {
    '$route': 'closeLoading'
  },

  components: {
    Catalog
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/sass/index.sass'

// /deep/ is one of `>>>` alias
// deep selector: https://github.com/vuejs/vue-loader/issues/661
// https://vue-loader.vuejs.org/zh/guide/scoped-css.html#深度作用选择器

.catalog-wrapper
  margin: 0 auto
  max-width: 600px
  +catalog-header

  .catalog-list
    list-style-type: none
    padding: 0

  .catalog-item
    padding: 0.6rem 1.875rem
    border-bottom: 1px solid $border-white

  .post-date
    font-size: .875rem
    font-style: italic
    text-align: center
    letter-spacing: 1px
    text-transform: uppercase

  .post-title
    // flex: 2
    text-decoration: none
    font-weight: bold

+mobile
  .catalog-wrapper
    width: 100%

  .catalog-item
    flex-direction: column

    .post-title, .post-date
      padding: 0

    .post-title
      margin-left: 0

    .post-date
      text-align: left
</style>
