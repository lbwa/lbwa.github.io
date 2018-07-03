<template>
  <div class="blog-projects">

    <Catalog :title="title" :subtitle="subtitle">
      <ul class="catalog-projects" v-if="list[0] && list[0].name" slot="main">
        <li
          class="catalog-item"
          v-for="project in list" :key="project.url"
        >
          <a
            class="project-name"
            :href="project.url"
            target="_blank"
          >{{project.name}}</a>
          <div class="project-desc">{{project.desc}}</div>
        </li>
      </ul>
    </Catalog>

  </div>
</template>

<script>
import Catalog from '~/components/Catalogs'
import projects from '~/source/_projects/projects.json'

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
  +catalog-header

  .catalog-projects
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

