<template>
  <main class="blog-tags">

    <Catalog :title="title" :subtitle="subtitle">
      <nav class="tags-content grid grid-center grid-jc-center" slot="main">
        <router-link
          class="tag-link button-text grid-cell"
          v-for="(tag, index) in tags"
          :key="index"
          :to="genLink(tag)">{{tag}}</router-link>
      </nav>
    </Catalog>

  </main>
</template>

<script>
import Catalog from '~/components/BaseCatalogs'
import { headMixin } from '~/lib/mixins'
import getMap from '~/lib/tags-map'

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
      return getMap(this.menu, 'tagsMap')
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
@import '~/assets/mixins/index.sass'
@import '~/assets/mixins/rwd.sass'

.catalog-wrapper
  padding-left: 25px
  padding-right: 25px
  text-align: center
  +catalog-header

  .tags-content
    align-items: center
    text-align: center

    .tag-link
      margin: 0 10px 10px 10px
      white-space: nowrap // 防止拆字换行
      text-decoration: none
      &:hover
        transition: all .3s
</style>
