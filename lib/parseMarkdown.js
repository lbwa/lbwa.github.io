const highlight = require('./highlight')
const anchor = require('markdown-it-anchor')
const toc = require('markdown-it-table-of-contents')

const slugify = require('./slugify')

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
// notice: MUST bind `this` value which is used to be a part of render function
const render = md.render.bind(md)
const renderInline = md.renderInline.bind(md)

function markdownParser (raw) {
  const tags = raw.tags
  let postTags = ''
  for (const tag of tags) {
    postTags += `<a class="article-tag" href="/blog/tags/${tag.toLowerCase()}/">${tag}</a>`
  }

  return {
    title: renderInline(raw.title),
    author: renderInline(raw.author),
    date: renderInline(raw.date),
    tags: postTags,
    content: render(raw.data)
  }
}

export default markdownParser
