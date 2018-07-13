<template>
  <main class="blog-projects">

    <Catalog :title="title" :subtitle="subtitle">

      <Skeleton :contentData="list" slot="main">
        <ul class="catalog-projects" v-if="list[0] && list[0].name">
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
      </Skeleton>

    </Catalog>

  </main>
</template>

<script>
import Skeleton from '~/components/Skeleton'
import Catalog from '~/components/Catalogs'
import { headMixin } from '~/lib/mixins'
import axios from '~/lib/axios'

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
      subtitle: '实践是最好的学习',
      list: []
    }
  },

  // invoked before creating vue instance, therefore we can not use `Skeleton` components
  // async asyncData ({ params, error }) {
  //   const res = await axios.get('project.json')
  //   const list = res.data
  //   return { list }
  // },

  created () {
    axios.get('project.json').then(res => {
      this.list = res.data
    })
  },

  components: {
    Skeleton,
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

