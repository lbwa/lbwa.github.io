<template>
  <div class="blog-tags">

    <Catalog :title="title" :subtitle="subtitle">
      <nav class="tags-content" slot="main">
        <router-link
          class="tag-link button-primary"
          v-for="(tag, index) in tags"
          :key="index"
          :to="genLink(tag)">{{tag}}</router-link>
      </nav>
    </Catalog>

  </div>
</template>

<script>
import Catalog from '~/components/Catalogs'
import postsData from '~/source/_posts/menu.json'

export default {
  data () {
    return {
      title: '标签',
      subtitle: '归纳总结'
    }
  },

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
  },

  components: {
    Catalog
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/sass/index.sass'

.catalog-wrapper
  text-align: center
  +catalog-header

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
