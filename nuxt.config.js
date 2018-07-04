module.exports = {
  head: {
    title: 'Bowen',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' },
      { name: 'keywords', content: 'bowen博客 vue ssr blog,前端开发,前端,web开发,node,vue,react,webpack,git' },
      { hid: 'description', name: 'description', content: 'bowen博客 vue ssr blog,前端开发,前端,web开发,node,vue,react,webpack,git' },
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

  build: {
    extractCSS: {
      allChunks: true
    },

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
      const posts = await require('./source/_posts/menu.json')
      const postLink = posts.map(post => `/blog/writings/${post.to}`)
      const tags = new Set()
      posts.forEach(post => {
        post.tags.forEach(tag => {
          tags.add(tag)
        })
      })
      const tagLink = Array.from(tags).map(tag => `/blog/tags/${tag}`)
      return [...postLink, ...tagLink]
    }
  }
}
