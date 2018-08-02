<template>
  <main class="blog-projects">

    <Catalog :title="title" :subtitle="subtitle">

        <ul class="catalog-projects" v-if="list[0] && list[0].name" slot="main">
          <li
            class="catalog-item grid"
            v-for="project in list" :key="project.url"
          >
            <a
              class="project-name grid-cell grid-cell-4"
              :href="project.url"
              target="_blank"
              rel="noopener"
            >{{project.name}}</a>
            <div class="project-desc grid-cell grid-cell-8">{{project.desc}}</div>
          </li>
        </ul>

    </Catalog>

  </main>
</template>

<script>
import Catalog from '~/components/BaseCatalogs'
import { headMixin } from '~/lib/mixins'
import { getProjects } from '~/lib/axios'
import eventBus from '~/lib/event-bus'

export default {
  mixins: [headMixin],

  props: {
    menu: {
      type: Array,
      default () {
        return []
      }
    }
  },

  data () {
    return {
      title: '实践',
      subtitle: '实践是最好的学习'
    }
  },

  // invoked before creating vue instance
  async asyncData ({ error }) {
    // implement local storage without window.sessionStorage even if disable cache
    // store remote data to local object like vuex
    if (eventBus.$data.projects) {
      return {
        list: [...eventBus.$data.projects]
      }
    }
    let res
    try {
      res = await getProjects()
    } catch (err) {
      error({ statusCode: 404, message: err })
    }
    const list = res.data
    eventBus.$data.projects = [...list]
    return { list }
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
  max-width: 550px
  +catalog-header

  .catalog-projects
    list-style-type: none
    padding: 0

    .catalog-item
      .project-desc
        text-decoration: none
        font-weight: bold

+mobile
  .catalog-wrapper
    width: 100%
    padding: 0 20px

    .project-name, .project-desc
      flex-basis: 100% !important
      max-width: 100% !important

    .project-name
      margin-bottom: 6px

</style>

