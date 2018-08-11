const highlight = require('./highlight')
const anchor = require('markdown-it-anchor')
const convertRouterLink = require('./links').default
const toc = require('markdown-it-table-of-contents')

const slugify = require('./slugify')

const md = require('markdown-it')({
  html: true,
  highlight
})
  .use(convertRouterLink, Object.assign({
    target: '_blank',
    rel: 'noopener noreferrer'
  } /* , markdown.externalLinks */))
  .use(anchor, {
    slugify,
    permalink: true,
    permalinkBefore: true,
    permalinkSymbol: '#'
  })

  // TODO: generate catalog of article after confirming toc layout
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
  // Ensure generate SPA routes not MPA routes, vue-route must handle link event
  // Vuejs only compile <router-link> links to SPA routes in `<template>`
  return {
    title: renderInline(raw.title),
    author: renderInline(raw.author),
    date: renderInline(raw.date),
    tags: raw.tags,
    content: render(raw.data)
  }
}

export default markdownParser
