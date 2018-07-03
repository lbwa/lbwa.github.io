<template>
  <article class="blog-writings">
    <div class="article-header">
      <h2 class="article-title" v-html="title"></h2>
      <span class="article-author" v-html="author"></span>
      <span class="article-date" v-html="date"></span>
      <div class="article-tags" v-html="tags"></div>
    </div>
    <div class="article-content" v-html="content"></div>
  </article>
</template>

<script>
import markdownParser from '~/lib/parseMarkdown'

export default {
  validate ({ params }) {
    // TODO: detect title in catalog object
    return /^\d+/.test(params.id)
  },

  // 是基于路由改变而调用，而与有无服务端无关
  // 在组件创建之前被调用，故此时无上下文
  async asyncData ({ params, error }) {
    //
    try {
      const { id } = params

      // extract meta info from markdown file
      const { title, date, author, tags, content } = markdownParser(id)

      return { title, date, author, tags, content }
    } catch (err) {
      error({ statusCode: 404, message: err })
    }
  },

  head () {
    return {
      title: this.title
    }
  }
}
</script>

<style lang="sass">
@import '~/assets/sass/mixins.sass'

.article-header
  text-align: center

.article-author, .article-date
  display: inline-block
  margin: 0 10px 10px 0
  font-weight: bold

// generate by parseMarkdown.js
.article-tag
  margin: 0 5px
  &:first-child
    margin-left: 0
  &:last-child
    margin-right: 0

+desktop
  .blog-writings
    padding: 100px 50px

    .article-title
      margin-bottom: 50px
      font-size: 2rem

    .article-tags
      display: inline-block

    .article-content
      margin-top: 50px

+mobile
  .blog-writings
    padding: 70px 30px

</style>

