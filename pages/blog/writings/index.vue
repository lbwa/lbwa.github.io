<template>
  <div class="blog-writings">
    <Catalog :title="catalogTitle" :subtitle="catalogSubtitle" :list="list"/>
  </div>
</template>

<script>
import menu from '~/source/_posts/menu.json'
import Catalog from '~/components/Catalogs'
export default {
  data () {
    return {
      catalogTitle: '指南',
      catalogSubtitle: '主动探索，积极思考',
      list: menu
    }
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

  /deep/ .catalog-text
    margin: 0 0 3.125rem
    text-align: center

    .catalog-title
      letter-spacing: 5px
      font-size: 1.125rem

    .catalog-subtitle
      color: $text-subtitle
      font-size: .875rem
      font-weight: normal

  /deep/ .catalog-writings
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
