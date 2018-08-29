<template>
  <div
    class="home-section recent-section"
    v-if="hasRecentPosts"
  >
    <header class="recent-section-header">
      <h2 class="recent-section-title">Latest Writings</h2>
    </header>
    <ul class="recent-posts">
      <li
        class="front-teaser no-list-style"
        v-for="post of recentPosts"
        :key="post.to"
      >
        <router-link
          :to="`/blog/${post.to}`"
          class="post-title no-text-decoration"
        >
          <h3 class="post-title-content">{{post.title}}</h3>
          <time class="post-date">{{post.date}}</time>
        </router-link>
        <div class="title-cover __position"></div>
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

@import '~/assets/color/background.sass'
@import '~/assets/color/text.sass'

.recent-section
  border-top: 1px solid $border-white
  padding: 100px 25px

  +mobile
    padding: 100px 0

  .recent-section-header
    margin: 0.83rem 0 4rem

    .recent-section-title
      margin: 0
      font-weight: 300
      text-transform: capitalize
      line-height: 2.5rem
      border-bottom: 1px solid $border-dark


  .recent-posts
    padding-left: 0
    font-size: 0

  .front-teaser
    position: relative
    border-radius: 5px

    +mobile
      margin-right: 15px
      margin-left: 15px

    &::after
      margin-left: 50%
      transform: translateX(-50%)
      transition: opacity .3s ease

    &:hover
      .title-cover
        opacity: .03

    .title-cover
      +position(absolute, 0)
      width: 100vw
      height: 100%
      margin-left: 50%
      transform: translateX(-50%)
      background-color: #24292e
      background-size: cover
      background-position: 50% 50%
      background-repeat: no-repeat
      opacity: 0
      transition: opacity .1s ease

  .post-title
    display: block
    position: relative // 防止容器背景遮蔽伪元素阴影
    z-index: 2 // 防止容器背景遮蔽伪元素阴影
    padding: 1.875rem // 扩充有效点击范围

  .post-title-content
    display: inline-block
    margin: 0 0 10px
    font-weight: normal
    font-size: 1.2rem

  .post-date
    display: block
    color: $text-grey
    font-family: "Crimson Text","Kagami SC",sans-serif,"Kagami Emoji"
    font-weight: 300
    font-size: .9rem

.read-more-posts
  display: inline-block
  margin-top: 30px
  padding: 10px 20px
  background-color: $background-white
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)
  border-radius: 40px
  font-size: .9rem
  transition: all .3s cubic-bezier(0, 0, 0.2, 1)

  &:hover
    color: $text-light
    background-color: $background-dark
</style>
