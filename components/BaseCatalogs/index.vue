<template>
  <section class="catalog-wrapper">
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
    }
  }
}
</script>

<style lang="sass" scoped>

</style>

