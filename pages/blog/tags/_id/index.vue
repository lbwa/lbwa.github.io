<template>
  <main class="tags-detail">
    <WritingsList
      :title="$route.params.id || title"
      :subtitle="subtitle"
      :menu="menuFilter"
      @emitLoading="activateLoading"
    />
  </main>
</template>

<script>
import WritingsList from '~/components/BaseWritingsList'
import { loadingMixin } from '~/lib/mixins'
import getMap from '~/lib/tags-map'

export default {
  mixins: [loadingMixin],

  data () {
    return {
      title: '标签',
      subtitle: '归纳总结'
    }
  },

  props: {
    menu: {
      type: Array,
      default () {
        return []
      }
    }
  },

  computed: {
    menuFilter () {
      const postsMap = getMap(this.menu, 'postsMap')
      return postsMap[this.$route.params.id]
    }
  },

  components: {
    WritingsList
  },

  head () {
    return {
      title: `${this.$route.params.id || '标签'} | Bowen Blog`,
      link: [
        { rel: 'alternate', href: `https://set.sh${this.$route.path}`, hreflang: 'zh'}
      ]
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
