<template>
  <div class="catalog-wrapper">
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

<style lang="sass">
@import '~/assets/sass/index.sass'

.catalog-wrapper
  padding: 100px 25px 25px 25px

.blog-catalog
  margin: 0 auto
  width: 500px

  .catalog-text
    margin: 0 0 3.125rem
    text-align: center

  .catalog-title
    letter-spacing: 5px
    font-size: 1.125rem

  .catalog-subtitle
    color: $text-subtitle
    font-size: .875rem
    font-weight: normal

  .catalog-items
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
    padding-top: 20px

  .blog-catalog
    width: 100%
</style>
