const unescapeHtml = str => {
  debugger
  return String(str)
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, '\'')
    .replace(/&#x3A;/g, ':')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
}

const removeMarkdownToken = str => String(str)
  // []()
  .replace(/\[(.*)\]\(.*\)/, '$1')

  // `{t}` | *{t}* | **{t}** | ***{t}*** | _{t}_
  .replace(/(`|\*{1,3}|_)(.*?[^\\])\1/g, '$2')

  // remove escape char '\'
  .replace(/(\\)(\*|_|`)/g, '$2')

const compose = (...processors) => {
  if (processors.length === 0) return input => input
  if (processors.length === 1) return processors[0]
  return processors.reduce((prev, next) => {
    return (...args) => next(prev(...args))
  })
}

module.exports = {
  removeTailHtml (str) {
    return String(str).replace(/\s*?<.*>\s*$/g, '')
  },

  parseHeader: compose(
    unescapeHtml,
    removeMarkdownToken
  )
}
