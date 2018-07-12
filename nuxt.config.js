const axios = require('axios')

module.exports = {
  head: {
    title: 'Bowen',
    htmlAttrs: {
      lang: 'zh'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' },
      { name: 'keywords', content: 'bowen blog, bowen 博客, vuejs, reactjs, ssr, 前端开发, 前端 , web开发, nodejs, github' },
      { hid: 'description', name: 'description', content: '一个分享代码经历的地方' },
      { name: 'apple-mobile-web-app-capable', content: 'yes'},
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black'}
    ],
    link: [
      { rel: 'alternate', href:'https://set.sh', hreflang: 'zh'},
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  css: [
    { src: '~/assets/theme.sass', lang: 'sass' },
    { src: '~/assets/code/highlight.scss', lang: 'scss'}
  ],

  plugins: [
    { src: '~/plugins/ga.js', ssr: false }
  ],

  loading: { color: '#3eaf7c', height: '2px' },

  // https://nuxtjs.org/api/configuration-loading-indicator
  // Only work for SPA mode
  // loadingIndicator: {
  //   name: 'rectangle-bounce',
  //   color: '#24292e',
  //   background: 'white'
  // },

  // mode: 'spa',
  mode: 'universal',

  build: {
    extractCSS: {
      allChunks: true
    },

    vendor: ['axios'],

    analyze: {
      analyzerMode: 'static'
    },

    plugins: [

    ],
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
      const res = await axios.get('https://docs.set.sh/menu.json')
      const posts = res.data
      const postLink = posts.map(post => `/blog/writings/${post.to}/`)
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
