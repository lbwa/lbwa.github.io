const axios = require('axios')

module.exports = {
  head: {
    title: 'Bowen',
    htmlAttrs: {
      lang: 'zh'
    },
    meta: [
      { 'http-equiv': '"X-UA-Compatible', content: 'IE=edge,chrome=1' },
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' },
      { name: 'keywords', content: 'bowen blog, bowen 博客, vuejs, reactjs, ssr, 前端开发, 前端 , web开发, nodejs, github' },
      { hid: 'description', name: 'description', content: '一个分享代码经历的地方' },
      { name: 'apple-mobile-web-app-capable', content: 'yes'},
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black'}
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      // language tag should be defined on unique components according to $route.path
    ]
  },

  manifest: {
    name: 'Bowen Blog',
    theme_color: '#24292e',
    lang: 'zh',
    description: 'A place which is used to share programming experiences'
  },

  css: [
    { src: '~/assets/theme.sass', lang: 'sass' },
    { src: '~/assets/code/highlight.scss', lang: 'scss'},
    { src: 'grid-style/dist/index.min.css', lang: 'css'}
  ],

  modules: [
    '@nuxtjs/pwa'
  ],

  plugins: [
    { src: '~/plugins/ga.js', ssr: false }
  ],

  loading: { color: '#3eaf7c', height: '2px' },

  mode: 'universal',

  layoutTransition: 'layout',

  router: {
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
        // savedPosition is only available for popstate navigations (back button)
        return savedPosition
      }

      // ! default scroll behavior is { x: 0, y: 0 }
      // if the returned position is falsy or an empty object, will retain
      // current scroll position.
      let position = { x: 0, y: 0 }

      if (to.matched.length < 2) {
        // scroll to the top of the page
        position = { x: 0, y: 0 }
      } else if (to.matched.some(r => r.components.default.options.scrollToTop)) {
        // if one of the children has scrollToTop option set to true
        position = { x: 0, y: 0 }
      }

      // ! https://github.com/nuxt/nuxt.js/issues/2738#issuecomment-362485495
      // ! triggerScroll event cannot not be triggered at sometimes
      return new Promise( resolve => {
        if (to.hash) {
          position = { selector: to.hash }
        }
        resolve(position)
      })
    }
  },

  build: {
    extractCSS: {
      allChunks: true
    },

    // 为了首屏更快的加载，不分离 markdown-it 和 prismjs
    // 这两个依赖仅在文章页 page_writings_id chunk 使用，那么没有必要在首页 vendor 中包含并引入
    // 此时的 vendor 仅包含 vue 相关库和 axios
    vendor: [
      'axios'
    ],

    // analyze: {
    //   analyzerMode: 'static'
    // },

    plugins: [],
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        // extract css
        const extract = config.plugins.find(plugin => plugin.renderExtractedChunk)
        extract.options.allChunks = true

        // eslint
        config.module.rules.push(
          {
            enforce: 'pre',
            test: /\.(js|vue)$/,
            loader: 'eslint-loader',
            exclude: /(node_modules)/
          }
        )
      }
    }
  },

  generate: {
    minify: {
      collapseBooleanAttributes: true,
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true
    },

    // multiple dynamic routes
    // https://github.com/nuxt/nuxt.js/issues/1018
    // https://github.com/nuxt/nuxt.js/issues/440
    routes: async function () {
      const res = await axios.get('https://docs.set.sh/menu')
      const posts = res.data
      const postLink = posts.map(post => `/blog/${post.to}/`)
      const tags = new Set()
      posts.forEach(post => {
        post.tags.forEach(tag => {
          tags.add(tag.toLowerCase())
        })
      })
      const tagLink = Array.from(tags).map(tag => `/blog/tags/${tag}/`)
      return [...postLink, ...tagLink]
    }
  }
}
