<template>
  <div class="blog-writings">

    <Catalog :title="title" :subtitle="subtitle">
      <ul class="catalog-writings" v-if="list[0] && list[0].author" slot="main">
        <li
          class="catalog-item"
          v-for="post in list" :key="post.title">
          <div class="post-info">
            <div class="post-date">{{post.date}}</div>
          </div>
          <a class="post-title"
            :href='`/blog/writings/${post.to}/`'
            @click.stop.prevent="navigate"
          >{{post.title}}</a>
        </li>
      </ul>
    </Catalog>

  </div>
</template>

<script>
import menu from '~/source/_posts/menu.json'
import Catalog from '~/components/Catalogs'
import { headMixin } from '~/lib/mixins'
import eventBus from '~/lib/event-bus'

export default {
  mixins: [headMixin],

  data () {
    return {
      title: '写作',
      subtitle: '主动探索，积极思考',
      list: menu
    }
  },

  methods: {
    // htmlParse component in nuxt-org
    // 阻止浏览器默认的多页面跳转行为，转为使用 vue 路由跳转，即可以使用 `读取` 进度条
    // 多页面跳转无法处理过渡动画的问题
    navigate (evt) {
      eventBus.$emit('toggleLoading', true)
      const href = evt.target.getAttribute('href')
      this.$router.push(href)
    },

    toggleLoading () {
      eventBus.$emit('toggleLoading', false)
    }
  },

  watch: {
    '$route': 'toggleLoading'
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
  width: 500px
  +catalog-header

  .catalog-writings
    list-style-type: none
    padding: 0

    .catalog-item
      display: flex

      .post-info
        flex: 1

      .post-title
        flex: 2
        text-decoration: none
        font-weight: bold

+mobile
  .catalog-wrapper
    width: 100%
</style>
