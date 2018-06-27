<template>
  <div class="blog">
    <Header/>
    <keep-alive>
      <router-view role="main"/>
    </keep-alive>
  </div>
</template>

<script>
import Header from '~/components/AppHeader'

export default {
  // redirect: https://nuxtjs.org/api/context
  asyncData ({ route, redirect }) {
    if (/^\/blog(\/)?$/i.test(route.path)) {
      redirect(301, '/blog/writing')
    }
  },

  components: {
    Header
  }
}
</script>

<style lang="scss">

</style>

