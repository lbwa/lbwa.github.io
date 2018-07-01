<template>
  <div class="blog-tags">
    <!-- <h2 class="tags-header">tags</h2> -->
    <div class="tags-content fullscreen-center-helper">
      <router-link
        class="tag-link"
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

<style lang="sass">
@import '~/assets/sass/index.sass'

.blog-tags
  .tag-link
    margin: 0 10px
    flex: 1
    flex-wrap: wrap
</style>
