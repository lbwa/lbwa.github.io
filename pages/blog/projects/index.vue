<template>
  <main class="blog-projects">

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
              rel="noopener"
            >{{project.name}}</a>
            <div class="project-desc">{{project.desc}}</div>
          </li>
        </ul>

    </Catalog>

  </main>
</template>

<script>
import Catalog from '~/components/Catalogs'
import { headMixin } from '~/lib/mixins'
import axios from '~/lib/axios'
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
        list: eventBus.$data.projects
      }
    }
    let res
    try {
      res = await axios.get('project.json')
    } catch (err) {
      error({ statusCode: 404, message: err })
    }
    const list = res.data
    eventBus.$data.projects = list
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
  max-width: 500px
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

