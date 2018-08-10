<template>
  <Catalog :title="title" :subtitle="subtitle">
    <ul
      class="catalog-list"
      v-if="menu[0] && menu[0].to"
      slot="main"
      @click.stop.prevent="activateLoading"
    >
      <li
        class="catalog-item grid"
        v-for="navItem of menu"
        :key="navItem.to"
      >
        <time class="nav-date grid-cell">{{navItem.date}}</time>
        <nuxt-link
          class="nav-title grid-cell grid-sm-7 offset-1"
          :to="`/blog/${navItem.to}`"
        >{{navItem.title}}</nuxt-link>
      </li>
    </ul>
  </Catalog>
</template>

<script>
import Catalog from '~/components/BaseCatalogs'

export default {
  props: {
    title: {
      type: String,
      default: ''
    },

    subtitle: {
      type: String,
      default: ''
    },

    menu: {
      type: Array,
      default () {
        return []
      }
    }
  },

  methods: {
    activateLoading (evt) {
      this.$emit('emitLoading', evt)
    }
  },

  components: {
    Catalog
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/sass/index.sass'

// /deep/ is one of `>>>` alias
// deep selector: https://github.com/vuejs/vue-loader/issues/661
// https://vue-loader.vuejs.org/zh/guide/scoped-css.html#深度作用选择器

.catalog-wrapper
  margin: 0 auto
  max-width: 800px
  padding-left: 25px
  padding-right: 25px
  +catalog-header

  .catalog-list
    list-style-type: none
    padding: 50px
    border-radius: 4px
    background-color: $background-white
    +shadow-wrapper

  .catalog-item
    padding: 0.6rem 1.875rem
    border-bottom: 1px solid $border-white

  .nav-date
    font-size: .875rem
    font-style: italic
    text-align: center
    letter-spacing: 1px
    text-transform: uppercase

  .nav-title
    // flex: 2
    text-decoration: none
    font-weight: bold

+mobile
  .catalog-wrapper
    width: 100%
    padding-left: 10px
    padding-right: 10px

    .catalog-list
      padding: 20px

  .catalog-item
    flex-direction: column

    .nav-title, .nav-date
      padding: 0

    .nav-title
      margin-left: 0

    .nav-date
      text-align: left
</style>
