<template>
  <div class="tags-detail">
    <Catalog :title="tagTitle || title" :subtitle="subtitle">
      <nav class="tag-list" slot="main" @click.stop="activateLoading">
        <router-link
          class="tag-link"
          v-for="post in result"
          :key="post.to"
          :to="`/blog/writings/${post.to}/`"
        >{{post.title}}</router-link>
      </nav>
    </Catalog>
  </div>
</template>

<script>
import Catalog from '~/components/Catalogs'
import eventBus from '~/lib/event-bus'

export default {
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
    result () {
      const id = this.$route.params.id
      let storage = []
      this.menu.forEach(post => {
        post.tags.forEach(tag => {

          // tag.toLowerCase() -- compatible uppercase tags
          if (tag.toLowerCase() === id) storage.push({
            tag: tag.toLowerCase(),
            title: post.title,
            to: post.to
          })
        })
      })

      return storage
    },

    tagTitle () {
      // 组件离开时（<keep-alive> 缓存），result 为默认值 []，为避免
      // this.result[0].tag 在缓存组件时报错，故使用计算属性
      return this.result[0] ? this.result[0].tag : ''
    }
  },

  methods: {
    // how to support v-on:click on router-link component (custom components)
    // https://github.com/vuejs/vue-router/issues/800
    activateLoading () {
      eventBus.$emit('toggleLoading', true)
    },

    closeLoading () {
      eventBus.$emit('toggleLoading', false)
    }
  },

  watch: {
    '$route': 'closeLoading'
  },

  components: {
    Catalog
  },

  head () {
    return {
      title: `${this.tagTitle || '标签'} | Bowen Blog`
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/sass/mixins.sass'

.catalog-wrapper
  +catalog-header

  .tag-list
    display: flex
    flex-direction: column
    text-align: center

    .tag-link
      flex: 1
      // 此处只能设置 padding，因为 margin 不算是可点击区域，那么在事件委托的前提下，// 点击到 margin 区域时将只触发过渡动画的回调，但没有触发路由请求
      padding: .625rem 0

</style>
