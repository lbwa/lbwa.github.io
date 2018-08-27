<template>
  <main class="articles-container">
    <article class="articles-main">
      <div class="article-header">
        <h2 class="article-title" v-html="title"></h2>
        <span class="article-author" v-html="author"></span>
        <span class="article-date" v-html="date"></span>
        <div class="article-tags">
          <router-link
            class="article-tag"
            v-for="tag of tags"
            :key="tag"
            :to="`/blog/tags/${tag.toLowerCase()}`"
          >{{ tag }}</router-link>
        </div>
      </div>
      <div class="article-content" @click.stop="nav" v-html="content"></div>
    </article>
    <BaseFloatingButton/>
  </main>
</template>

<script>
import BaseFloatingButton from '~/components/BaseFloatingButton'
import MDParser from '~/lib/markdown/index'
import { getWriting } from '~/lib/axios'
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

  methods: {
    nav (evt) {
      const href = evt.target.getAttribute('href')
      // ensure internal links is handled by vue-router
      if (href && !/^http/.test(href)) {
        evt.preventDefault()
        this.$router.push(decodeURIComponent(href))
      }
    }
  },

  components: {
    BaseFloatingButton
  },

  // 是基于路由改变而调用，而与有无服务端无关
  // 在组件创建之前被调用，故此时无组件实例 this
  async asyncData ({ params, error }) {
    const { id } = params

    const post = eventBus.$data.writings[id]

    if (post && post.content) {
      return {
        ...eventBus.$data.writings[id]
      }
    }

    // `axios` module is a drop in replacement for `fs`
    let res

    try {
      res = await getWriting(id)
    } catch (err) {
      error({ statusCode: 404, message: err })
    }
    // TODO: 检测 errno，异常时重定向至自定义 error 页面
    const raw = res.data

    const { title, date, author, tags, content } = MDParser(raw)

    // implement local storage without window.sessionStorage even if disable cache
    eventBus.$data.writings[id] = { title, date, author, tags, content }

    return { title, date, author, tags, content }
  }
}
</script>

<style lang="sass">
@import '~/assets/sass/mixins.sass'

.article-header
  margin-bottom: 100px

.article-author, .article-date
  display: inline-block
  margin: 0 10px 10px 0
  font-weight: bold

// generate by markdown.js
.article-tag
  margin: 0 5px
  &:first-child
    margin-left: 0
  &:last-child
    margin-right: 0

.articles-main
  padding: 30px 30px 60px
  margin: 10px
  border-radius: 2px
  box-shadow: 0 4px 5px 0 rgba(0, 0, 0,.2), 0 1px 20px 0 rgba(0, 0, 0,.2), 0 2px 5px -1px rgba(0, 0, 0,.2)

  h1:hover, h2:hover, h3:hover, h4:hover, h5:hover, h6:hover
    a.header-anchor
      opacity: 1

+desktop
  .article-title
    font-size: 2rem

  .article-tags
    display: inline-block

  .article-content
    margin-top: 50px

  .articles-main
    padding: 70px 70px 100px

</style>

