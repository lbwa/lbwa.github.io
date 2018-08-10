<template>
  <main class="tags-detail">
    <WritingsList
      :title="tagTitle || title"
      :subtitle="subtitle"
      :menu="menuFilter"
      @emitLoading="activateLoading"
    />
  </main>
</template>

<script>
import WritingsList from '~/components/BaseWritingsList'
import { loadingMixin } from '~/lib/mixins'

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
      const id = this.$route.params.id
      let storage = []
      this.menu.forEach(post => {
        post.tags.forEach(tag => {

          // tag.toLowerCase() -- compatible uppercase tags
          if (tag.toLowerCase() === id) storage.push({
            title: post.title,
            date: post.date,
            to: post.to,
            tag: tag.toLowerCase(),
          })
        })
      })

      return storage
    },

    tagTitle () {
      // 组件离开时（<keep-alive> 缓存），menuFilter 为默认值 []，为避免
      // this.menuFilter[0].tag 在缓存组件时报错，故使用计算属性
      return this.menuFilter[0] ? this.menuFilter[0].tag : ''
    }
  },

  components: {
    WritingsList
  },

  head () {
    return {
      title: `${this.tagTitle || '标签'} | Bowen Blog`,
      link: [
        { rel: 'alternate', href: `https://set.sh${this.$route.path}`, hreflang: 'zh'}
      ]
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
