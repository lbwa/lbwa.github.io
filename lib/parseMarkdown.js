const path = require('path')
const hljs = require('highlight.js/lib/highlight')
const js = require('highlight.js/lib/languages/javascript')
const ts = require('highlight.js/lib/languages/typescript')
const scss = require('highlight.js/lib/languages/scss')
const bash = require('highlight.js/lib/languages/bash')
const css = require('highlight.js/lib/languages/css')
const html = require('highlight.js/lib/languages/xml')
const yml = require('highlight.js/lib/languages/yaml')
const anchor = require('markdown-it-anchor')
const toc = require('markdown-it-table-of-contents')
const readMeta = require('front-matter')

const slugify = require('./slugify')
const formatDate = require('./util/formatDate')
const { parseHeader } = require('./util/parseHeader')

hljs.registerLanguage('js', js)
hljs.registerLanguage('ts', ts)
hljs.registerLanguage('scss', scss)
hljs.registerLanguage('bash', bash)
hljs.registerLanguage('css', css)
hljs.registerLanguage('html', html)
hljs.registerLanguage('yml', yml)

const postPath = path.resolve('./').split(path.sep).join('/')

const md = require('markdown-it')({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code>' +
               hljs.highlight(lang, str, true).value +
               '</code></pre>'
      } catch (__) {}
    }

    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>'
  }
})
  // generate anchor in article
  .use(anchor, {
    slugify,
    permalink: true,
    permalinkBefore: true,
    permalinkSymbol: '#'
  })
  // TODO: generate catalog of article
  // .use(toc, {
  //   slugify,
  //   includeLevel: [2, 3],
  //   format: parseHeader
  // })

// cache render function
// notice: MUST bind `this` value of render function
const render = md.render.bind(md)
const renderInline = md.renderInline.bind(md)

export default function (id) {
  if (process.server) {
    const raw = require('fs').readFileSync(`${postPath}/source/_posts/${id}.md`, 'utf8')

    // extract meta in markdown file
    const rawObj = readMeta(raw)

    const tags = rawObj.attributes.tags
    let postTags = ''
    for (let i = 0; i < tags.length; i++) {
      postTags += `<a class="post-tag">${tags[i]}</a>`
    }

    return {
      title: renderInline(rawObj.attributes.title),
      author: renderInline(rawObj.attributes.author),
      date: renderInline(`${formatDate(rawObj.attributes.date)}`),
      tags: postTags,
      content: render(rawObj.body)
    }
  }
}
