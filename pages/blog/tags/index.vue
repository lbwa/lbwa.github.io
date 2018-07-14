<template>
  <main class="blog-tags">

    <Catalog :title="title" :subtitle="subtitle">
      <nav class="tags-content" slot="main">
        <router-link
          class="tag-link button-primary"
          v-for="(tag, index) in tags"
          :key="index"
          :to="genLink(tag)">{{tag}}</router-link>
      </nav>
    </Catalog>

  </main>
</template>

<script>
import Catalog from '~/components/Catalogs'
import { headMixin } from '~/lib/mixins'

export default {
  mixins: [headMixin],

  props: {
    menu: Array,
    default () {
      return []
    }
  },

  data () {
    return {
      title: '标签',
      subtitle: '归纳总结'
    }
  },

  computed: {
    tags () {
      let result = new Set()
      this.menu.forEach(post => {
        post.tags.forEach(tag => {
          result.add(tag)
        })
      })

      return [...result._c]
    }
  },

  methods: {
    genLink (tag) {
      return `/blog/tags/${tag.toLowerCase()}/`
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
