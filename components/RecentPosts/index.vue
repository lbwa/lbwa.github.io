<template>
  <div
    class="home-section recent-section bg-white-bis ta-center"
    v-if="hasRecentPosts"
  >
    <header class="recent-section-header">
      <svg width="1.6rem" height="1.6rem" class="home-icon icon-bookmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path d="M128 80v380c0 3.3 3.8 5.2 6.4 3.2l116.8-92c2.9-2.1 6.8-2.1 9.6 0l116.8 92c2.6 2 6.4.1 6.4-3.2V80c0-17.7-14.3-32-32-32H160c-17.7 0-32 14.3-32 32z"/>
      </svg>
      <h2 class="recent-section-title">Recent Posts</h2>
    </header>
    <ul class="recent-posts">
      <li
        class="front-teaser no-list-style"
        v-for="post of recentPosts"
        :key="post.to"
      >
        <router-link
          :to="`/blog/writings/${post.to}`"
          class="post-title no-text-decoration"
        >
          <h3 class="post-title-content">{{post.title}}</h3>
        </router-link>
      </li>
    </ul>
    <router-link to="/blog/writings" class="read-more-posts no-text-decoration">查看更多</router-link>
  </div>
</template>

<script>
export default {
  props: {
    recentPosts: {
      type: Array,
      default () {
        return []
      }
    }
  },

  computed: {
    hasRecentPosts () {
      return this.recentPosts.length !== 0
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/sass/index.sass'

.recent-section
  border-top: 1px solid $border-white
  padding: 100px 25px

  +mobile
    padding: 100px 0

  .recent-section-header
    margin: 0.83em 0

    .recent-section-title
      display: inline-block
      margin: 0

    .icon-bookmark
      vertical-align: bottom
      fill: $icon-red

  .recent-posts
    padding-left: 0

  .front-teaser
    position: relative
    margin-top: 1.2rem
    margin-bottom: 1.2rem
    border-radius: 5px
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)

    +mobile
      margin-right: 15px
      margin-left: 15px

    // box-shadow: 1px 1px 15px 4px rgba(67, 38, 100, 0.15)
    +shadow-basis(0, 0) // z-index >= 0 防止容器背景遮蔽伪元素阴影

    &::after
      border-radius: 5px
      transition: opacity .3s ease

    // optimize hover shadow animation
    &:hover::after
      opacity: 1

  .post-title
    display: block
    position: relative // 防止容器背景遮蔽伪元素阴影
    z-index: 1 // 防止容器背景遮蔽伪元素阴影
    background-color: $background-white
    border-radius: 5px
    padding: 1.875rem // 扩充有效点击范围

    &:hover
      color: $link

  .post-title-content
    display: inline-block
    margin: 0
    font-size: 1rem

  .read-more-posts
    display: inline-block
    margin-top: 30px
    padding: 10px 20px
    background-color: $background-white
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)
    border-radius: 5px
    font-size: .9rem
    transition: all  .3s ease

    &:hover
      color: $text-light
      background-color: $background-dark
</style>
