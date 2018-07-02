const prism = require('prismjs')
// const loadLanguages = require('prismjs/components/index')
const escapeHtml = require('escape-html')
const logger = require('./util/logger')

// loadLanguages(['markup', 'css', 'javascript'])

function wrap (code, lang) {
  if (lang === 'text') {
    code = escapeHtml(code)
  }
  // https://cn.vuejs.org/v2/api/#v-pre
  return `<pre class="language-${lang}"><code>${code}</code></pre>`
}

module.exports = (str, lang) => {
  if (!lang) {
    return wrap(str, 'text')
  }

  const rawLang = lang.toLowerCase()
  if (lang === 'vue' || lang === 'html') lang = 'markup'
  if (lang === 'md') lang = 'markdown'
  if (lang === 'ts') lang = 'typescript'
  if (!prism.languages[lang]) {
    try {
      loadLanguages([lang])
    } catch (err) {
      logger.err(`${lang} is not supported.`)
    }
  }

  if (prism.languages[lang]) {
    const code = prism.highlight(str, prism.languages[lang, lang])
    return wrap(code, rawLang)
  }

  return wrap(str, 'text')
}
