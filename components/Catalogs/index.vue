<template>
  <section class="catalog-wrapper">
    <div class="catalog-text">
      <h2 class="catalog-title" v-if="title !== ''">{{title}}</h2>
      <h3 class="catalog-subtitle" v-if="subtitle !== ''">{{subtitle}}</h3>
    </div>

    <ul class="catalog-writings" v-if="list[0] && list[0].author">
      <li
        class="catalog-item"
        v-for="post in list" :key="post.title">
        <div class="post-info">
          <div class="post-date">{{post.date}}</div>
        </div>
        <a class="post-title"
          :href='`/blog/writings/${post.to}`'
        >{{post.title}}</a>
      </li>
    </ul>

    <ul class="catalog-projects" v-if="list[0] && list[0].name">
      <li
        class="catalog-item"
        v-for="project in list" :key="project.url"
      >
        <a
          class="project-name"
          :href="project.url"
          target="_blank"
        >{{project.name}}</a>
        <div class="project-desc">{{project.desc}}</div>
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
  }
}
</script>
