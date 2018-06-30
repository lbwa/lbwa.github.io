<template>
  <section class="blog-catalog">
    <div class="catalog-text">
      <h2 class="catalog-title" v-if="title !== ''">{{title}}</h2>
      <h3 class="catalog-subtitle" v-if="subtitle !== ''">{{subtitle}}</h3>
    </div>
    <ul class="catalog-items">
      <li
        class="catalog-item"
        v-for="post in list" :key="post.title">
        <div class="post-info">
          <div class="post-date">{{post.date}}</div>
        </div>
        <a class="post-title"
          :href='genLink(post.to)'
        >{{post.title}}</a>
      </li>
    </ul>
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
    list: {
      type: Array,
      default () {
        return {}
      }
    }
  },

  methods: {
    genLink (path) {
      return `/blog/writing/${path}`
    }
  }
}
</script>
