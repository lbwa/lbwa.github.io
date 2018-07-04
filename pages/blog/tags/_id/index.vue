<template>
  <div class="tags-detail">
    <Catalog :title="mainTitle" :subtitle="subtitle">
      <nav class="tag-list" slot="main">
        <router-link
          class="tag-link"
          v-for="post in result"
          :key="post.to"
          :to="`/blog/writings/${post.to}`"
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
      mainTitle: '标签',
      subtitle: '归纳总结'
    }
  },

  async asyncData ({ params, error }) {

    const id = params.id
    let result = []
    postsData.forEach(post => {
      post.tags.forEach(tag => {
        if (tag === id) result.push({tag, title: post.title, to: post.to})
      })
    })

    return { result }
  },

  components: {
    Catalog
  },

  // head () {
  //   return {
  //     title: this.title
  //   }
  // }
}
</script>

