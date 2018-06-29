const path = require('path')
const highlight = require('highlight.js')
const javascript = require('highlight.js/lib/languages/javascript')
const typescript = require('highlight.js/lib/languages/typescript')
const scss = require('highlight.js/lib/languages/scss')
const bash = require('highlight.js/lib/languages/bash')
const anchor = require('markdown-it-anchor')
const toc = require('markdown-it-table-of-contents')
const readMeta = require('front-matter')

const slugify = require('./slugify')
const formatDate = require('./util/formatDate')
const { parseHeader } = require('./util/parseHeader')

highlight.registerLanguage('js', javascript)
highlight.registerLanguage('ts', typescript)
highlight.registerLanguage('scss', scss)
highlight.registerLanguage('bash', bash)

const postPath = path.resolve('./').split(path.sep).join('/')
const md = require('markdown-it')({
  html: true,
  highlight: function (str, lang) {
    if (lang && highlight.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code>' +
               highlight.highlight(lang, str, true).value +
               '</code></pre>';
      } catch (__) {}
    }

    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
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
  .use(toc, {
    slugify,
    includeLevel: [2, 3],
    format: parseHeader
  })

// cache render function
// notice: MUST bind `this` value of render function
const render = md.render.bind(md)
const renderInline = md.renderInline.bind(md)

export default function (id) {
  if (process.server) {
    const raw = require('fs').readFileSync(`${postPath}/source/_posts/${id}`, 'utf8')

    // extract meta in markdown file
    const rawObj = readMeta(raw)

    const tags = rawObj.attributes.tags
    let htmlTags = ''
    for (let i = 0; i < tags.length; i++) {
      htmlTags += `<a class="post-tag">${tags[i]}</a>`
    }

    return {
      title: renderInline(rawObj.attributes.title),
      author: renderInline(rawObj.attributes.author),
      date: renderInline(`${formatDate(rawObj.attributes.date)}`),
      tags: htmlTags,
      content: render(rawObj.body)
    }
  }
}
