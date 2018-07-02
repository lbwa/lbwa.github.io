<template>
  <div class="blog-projects">
    <Catalog :title="title" :subtitle="subtitle" :list="list"/>
  </div>
</template>

<script>
import projects from '~/source/_projects/projects.json'
import Catalog from '~/components/Catalogs'

export default {
  data () {
    return {
      title: '实践',
      subtitle: '实践是最好的学习'
    }
  },

  computed: {
    list () {
      return projects
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

  /deep/ .catalog-projects
    list-style-type: none
    padding: 0

    .catalog-item
      display: flex

      .project-name
        flex: 1

      .project-desc
        flex: 2
        text-decoration: none
        font-weight: bold

+mobile
  .catalog-wrapper
    width: 100%

</style>

