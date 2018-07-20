<template>
  <main class="tags-detail">
    <Catalog :title="tagTitle || title" :subtitle="subtitle">
      <nav class="catalog-list" slot="main" @click.stop="activateLoading">
        <div
          class="catalog-item"
          v-for="navItem of result"
          :key="navItem.to"
        >
          <time class="nav-date">{{navItem.date}}</time>
          <router-link
            class="nav-item"
            :to='`/blog/writings/${navItem.to}`'
          >{{navItem.title}}</router-link>
        </div>
      </nav>
    </Catalog>
  </main>
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
      // 组件离开时（<keep-alive> 缓存），result 为默认值 []，为避免
      // this.result[0].tag 在缓存组件时报错，故使用计算属性
      return this.result[0] ? this.result[0].tag : ''
    }
  },

  methods: {
    // how to support v-on:click on router-link component (custom components)
    // https://github.com/vuejs/vue-router/issues/800
    activateLoading (evt) {
      const target = evt.target
      // msMatchesSelector is a ele.matches implementation on IE9
      if (target.msMatchesSelector && !target.msMatchesSelector('.nav-item')) return
      if (target.matches && !target.matches('.nav-item')) return
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

  .catalog-list
    display: flex
    flex-direction: column

    .catalog-item
      display: flex
      flex: 1
      padding: .625rem 1.25rem

.nav-date
  flex: 1
  font-size: .875rem
  font-style: italic
  color: $text
  letter-spacing: 1px
  text-transform: uppercase
  text-align: right
  margin-right: 40px

.nav-item
  flex: 1
  text-decoration: none
  font-weight: bold

+mobile
  .catalog-item
    flex-direction: column

    .nav-date
      text-align: left
      margin-bottom: .3125rem

</style>
