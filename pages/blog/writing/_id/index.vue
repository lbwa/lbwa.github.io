<template>
  <article class="blog-post">
    <h2 class="title">i am a title</h2>
    <div class="blog-content" v-html="htmlData"></div>
  </article>
</template>

<script>
import mdParser from '~/lib/parseMarkdown'

export default {
  validate ({ params }) {
    // TODO: detect title
    return /^\d+/.test(params.id)
  },

  // 是基于路由改变而调用，而与有无服务端无关
  // 在组件创建之前被调用，故此时无上下文
  async asyncData ({ params, error }) {
    //
    try {
      const { id } = params
      const htmlData = mdParser(id)
      return { htmlData }
    } catch (err) {
      error({ statusCode: 404, message: err })
    }
  }
}
</script>

<style lang="sass">
@import '~/assets/style/index.sass'

.blog-post
  padding: 0 40px
</style>

