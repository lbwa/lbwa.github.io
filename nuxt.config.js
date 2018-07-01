const webpack = require('webpack')

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
    { src: '~/assets/global-preset.sass', lang: 'sass' },
    { src: '~/assets/global-transition.sass', lang: 'sass' },
    // highlight style
    { src: '~/assets/highlight/dracula.scss', lang: 'scss'}
  ],

  router: {
    routes: [
      {
        path: '/blog',
        redirect: '/blog/writings'
      }
    ]
  },

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
      // only way to reduce highlight.js bundle size
      // If not, webpack alway import all language package
      // https://bjacobel.com/2016/12/04/highlight-bundle-size/
      // https://webpack.docschina.org/plugins/context-replacement-plugin/
      new webpack.ContextReplacementPlugin(
        /highlight\.js\/lib\/languages$/,
        new RegExp(`^./(${['css', 'scss', 'js', 'ts', 'bash', 'html', 'yml'].join('|')})$`),
      )
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

    routes: function () {
      const posts = require('./source/_posts/menu.json')
      return posts.map(post => {
        return `/blog/writings/${post.to}`
      })
    }
  }
}
