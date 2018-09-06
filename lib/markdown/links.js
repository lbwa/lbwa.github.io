// markdown-it plugin for:
// 1. adding target="_blank" to external links
// 2. ensure internal links handled by vue-router

export default function (md, externalAttrs) {
  let hasOpenRouterLink = false
  let hasOpenExternalLink = false

  md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
    const token = tokens[idx]
    const hrefIndex = token.attrIndex('href')
    if (hrefIndex >= 0) {
      const link = token.attrs[hrefIndex]
      const href = link[1]
      // `link` schema: ['href', 'https://example.com/something']
      const isSourceLink = /^https?:\/\/set.sh/i.test(href)
        || /^\.?\//.test(href)
      const isExternal = /^https?:/.test(href) && !isSourceLink

      if (isExternal) {
        Object.entries(externalAttrs).forEach(([key, val]) => {
          token.attrSet(key, val)
        })
        if (/_blank/i.test(externalAttrs['target'])) {
          hasOpenExternalLink = true
        }
      } else if (isSourceLink) {
        hasOpenRouterLink = true
        tokens[idx] = toRouterLink(token, link)
      }
    }
    return self.renderToken(tokens, idx, options)
  }

  function toRouterLink (token, link) {
    link[1] = link[1].replace(/^https?:\/\/set\.sh/i, '')

    return Object.assign({}, token, {
      tag: 'a'
    })
  }

  md.renderer.rules.link_close = (tokens, idx, options, env, self) => {
    const token = tokens[idx]
    if (hasOpenRouterLink) {
      token.tag = 'a'
      hasOpenRouterLink = false
    }
    if (hasOpenExternalLink) {
      hasOpenExternalLink = false
      // add OutBoundLink to the beforeend of this link if it opens in _blank.
      return '<OutboundLink/>' + self.renderToken(tokens, idx, options)
    }
    return self.renderToken(tokens, idx, options)
  }
}

// inspired by vuepress
