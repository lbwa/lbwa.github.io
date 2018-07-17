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
          class="catalog-item"
          v-for="post in menu"
          :key="post.title"
        >
          <time class="post-date">{{post.date}}</time>
          <router-link class="post-title"
            :to='`/blog/writings/${post.to}/`'
          >{{post.title}}</router-link>
        </li>
      </ul>
    </Catalog>

  </main>
</template>

<script>
import Catalog from '~/components/Catalogs'
import { headMixin } from '~/lib/mixins'
import eventBus from '~/lib/event-bus'
import axios from '~/lib/axios'

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
      const index = Array.from(evt.target.classList).indexOf('post-title')
      if (index === -1) return
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
      display: flex
      padding: 0.6rem 1.875rem
      border-bottom: 1px solid $border-white

      .post-date
        flex: 1
        font-size: .875rem
        font-style: italic
        letter-spacing: 1px
        text-transform: uppercase

      .post-title
        flex: 3
        text-decoration: none
        font-weight: bold
        margin-left: 40px

+mobile
  .catalog-wrapper
    width: 100%

  .catalog-item
    flex-direction: column

    .post-title
      margin-left: 0 !important
</style>
