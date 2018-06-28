const path = require('path')
const highlight = require('highlight.js')
const javascript = require('highlight.js/lib/languages/javascript')
const typescript = require('highlight.js/lib/languages/typescript')
const scss = require('highlight.js/lib/languages/scss')
const bash = require('highlight.js/lib/languages/bash')
const anchor = require('markdown-it-anchor')
const toc = require('markdown-it-table-of-contents')
const slugify = require('./slugify')
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

export default function (id) {
  if (process.server) {
    let raw = require('fs').readFileSync(`${postPath}/source/_posts/${id}`, 'utf8').toString()
    return md.render(raw)
  }
}
