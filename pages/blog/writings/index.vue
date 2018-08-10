<template>
  <main class="blog-writings">
    <WritingsList
      :title="title"
      :subtitle="subtitle"
      :menu="menu"
      @emitLoading="activateLoading"
    />
  </main>
</template>

<script>
import WritingsList from '~/components/BaseWritingsList'
import { headMixin, loadingMixin } from '~/lib/mixins'

export default {
  mixins: [headMixin, loadingMixin],

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
      title: '写作',
      subtitle: '主动探索，积极思考'
    }
  },

  components: {
    WritingsList
  }
}
</script>

<style lang="sass" scoped>
</style>
