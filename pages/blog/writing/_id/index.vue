<template>
  <article class="blog-post">
    <h2 class="post-title" v-html="title"></h2>
    <span class="post-author" v-html="author"></span>
    <span class="post-date" v-html="date"></span>
    <div class="post-tags" v-html="tags"></div>
    <div class="blog-content" v-html="content"></div>
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
  }
}
</script>

<style lang="sass">
@import '~/assets/style/mixins.sass'

.blog-post
  padding: 0 40px
  .post-title
    font-size: 2.5rem
  .post-author, .post-date
    display: inline-block
    margin: 0 10px 10px 0
    font-weight: bold
  .post-tags
    display: inline-block
    +mobile
      display: block
  .post-tag
    margin: 0 5px
    &:first-child
      margin-left: 0
</style>

