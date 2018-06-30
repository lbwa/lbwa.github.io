const posts = require('./source/_posts/menu.json')
const webpack = require('webpack-bundle-analyzer')

module.exports = {
  head: {
    title: 'Bowen',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'keywords', content: 'bowen博客 vue ssr blog,前端开发,前端,web开发,node,vue,react,webpack,git' },
      { hid: 'description', name: 'description', content: 'bowen博客 vue ssr blog,前端开发,前端,web开发,node,vue,react,webpack,git' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  css: [
    { src: '~/assets/blog-transition.sass', lang: 'sass' },
    // highlight style
    { src: '~/assets/highlight/dracula.scss', lang: 'scss'}
  ],

  router: {
    routes: [
      {
        path: '/blog',
        redirect: '/blog/writing'
      }
    ]
  },

  plugins: [
    { src: '~/plugins/ga.js', ssr: false }
  ],

  loading: { color: '#3eaf7c', height: '2px' },

  build: {
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
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
    routes: function () {
      return posts.map(post => {
        return `/blog/writing/${post.to}`
      })
    }
  }
}
