const path = require('path')
const highlight = require('./highlight')
const anchor = require('markdown-it-anchor')
const toc = require('markdown-it-table-of-contents')
const readMeta = require('front-matter')

const slugify = require('./slugify')
const formatDate = require('./util/formatDate')

const postPath = path.resolve('./').split(path.sep).join('/')

const md = require('markdown-it')({
  html: true,
  highlight
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

module.exports = function (id) {
  if (process.server) {
    const raw = require('fs').readFileSync(`${postPath}/source/_posts/${id}.md`, 'utf8')

    // extract meta in markdown file
    const rawObj = readMeta(raw)

    const tags = rawObj.attributes.tags
    let postTags = ''
    for (let i = 0; i < tags.length; i++) {
      postTags += `<a class="article-tag">${tags[i]}</a>`
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
