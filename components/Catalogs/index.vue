<template>
  <section class="catalog-wrapper" :style="catalogPadding">
    <div class="catalog-text">
      <h2 class="catalog-title" v-if="title !== ''">{{title}}</h2>
      <h3 class="catalog-subtitle" v-if="subtitle !== ''">{{subtitle}}</h3>
    </div>

    <slot name="main"></slot>
  </section>
</template>

<script>
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
    padding: {
      type: String,
      default: '0 25px'
    }
  },

  computed: {
    catalogPadding () {
      return `padding: ${this.padding}`
    }
  }
}
</script>

<style lang="sass" scoped>

</style>

