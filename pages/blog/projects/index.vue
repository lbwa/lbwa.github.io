<template>
  <div class="blog-project">
    <Catalog :title="title" :list="list"/>
  </div>
</template>

<script>
import projects from '~/source/_projects/projects.json'
import Catalog from '~/components/Catalogs'

export default {
  data () {
    return {
      title: 'Projects'
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

