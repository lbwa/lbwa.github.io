const path = require('path')
const highlight = require('./highlight')
const anchor = require('markdown-it-anchor')
const toc = require('markdown-it-table-of-contents')
const readMeta = require('front-matter') // 该 pkg 打包后有 350kb

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

module.exports = function (raw) {
  // extract meta in markdown file
  const rawObj = readMeta(raw)

  const tags = rawObj.attributes.tags
  let postTags = ''
  for (let i = 0; i < tags.length; i++) {
    const tag = tags[i]
    postTags += `<a class="article-tag" href="/blog/tags/${tag.toLowerCase()}/">${tag}</a>`
  }

  return {
    title: renderInline(rawObj.attributes.title),
    author: renderInline(rawObj.attributes.author),
    date: renderInline(`${formatDate(rawObj.attributes.date)}`),
    tags: postTags,
    content: render(rawObj.body)
  }
}
