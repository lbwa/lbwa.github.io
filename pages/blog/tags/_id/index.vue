<template>
  <div class="tags-detail">
    <Catalog :title="result[0].tag || title" :subtitle="subtitle">
      <nav class="tag-list" slot="main">
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
import postsData from '~/source/_posts/menu.json'
import Catalog from '~/components/Catalogs'

export default {
  data () {
    return {
      title: '标签',
      subtitle: '归纳总结'
    }
  },

  async asyncData ({ params, error }) {

    const id = params.id
    let result = []
    postsData.forEach(post => {
      post.tags.forEach(tag => {

        // tag.toLowerCase() -- compatible uppercase tags
        if (tag.toLowerCase() === id) result.push({
          tag: tag.toLowerCase(),
          title: post.title,
          to: post.to
        })
      })
    })

    return { result }
  },

  components: {
    Catalog
  },

  head () {
    return {
      title: `${this.result[0].tag || '标签'} | Bowen Blog`
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
      margin: .625rem 0

</style>
