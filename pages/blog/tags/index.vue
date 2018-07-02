<template>
  <div class="blog-tags">
    <div class="tags-header">
      <h2 class="tags-title">标签</h2>
      <h4 class="tags-subtitle">归纳总结</h4>
    </div>
    <div class="tags-content">
      <router-link
        class="tag-link button-primary"
        v-for="(tag, index) in tags"
        :key="index"
        :to="genLink(tag)">{{tag}}</router-link>
    </div>
  </div>
</template>

<script>
import postsData from '~/source/_posts/menu.json'
export default {
  computed: {
    tags () {
      let result = new Set()
      postsData.forEach(post => {
        post.tags.forEach(tag => {
          result.add(tag)
        })
      })
      // I'm confusing that correct Set instance is part of `_c` property.
      // It should return correct instance including unique data, but return a
      // instance that has only property `_c` in fact.
      // `_c` is a wrapper.
      return [...result._c]
    }
  },

  methods: {
    genLink (tag) {
      return `/blog/tags/${tag.toLowerCase()}`
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/sass/index.sass'

.blog-tags
  text-align: center

  .tags-header
    margin: 0 0 3.125rem 0

  .tags-title
    letter-spacing: 5px
    font-size: 1.125rem

  .tags-subtitle
    color: $text-subtitle
    font-size: .875rem
    font-weight: normal

  .tags-content
    display: flex
    flex-wrap: wrap
    justify-content: center
    align-items: center
    text-align: center

    .tag-link
      margin: 0 10px 10px 10px
      flex: 1
      white-space: nowrap // 防止拆字换行
      text-decoration: none
      &:hover
        transition: all .3s
</style>
