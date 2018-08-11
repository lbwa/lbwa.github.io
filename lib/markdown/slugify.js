// slugify 指将 url 中所有空格替换为 `-`（默认为 `%20`），并将所有字符串转换为小写。
// 这一系列转换 url 的行为都可称为 slugify。
// slugify 有利于创建良好的 url 外链

// https://github.com/valeriangalliat/markdown-it-anchor/blob/HEAD/index.js#L1
// default:
// const slugify = (s) => encodeURIComponent(String(s).trim().toLowerCase().replace(/\s+/g, '-'))

module.exports = function slugify (str) {
  return str
    // Remove control characters
    .replace(/[\u0000-\u001f]/g, '')
    // Replace special characters
    .replace(/[\s~`!@#$%^&*()\-_+=[\]{}|\\;:"'<>,.?/]+/g, '-')
    // Remove continous separators
    .replace(/\-{2,}/g, '-')
    // Remove prefixing and trailing separtors
    .replace(/^\-+|\-+$/g, '')
    // ensure it doesn't start with a number
    // https://github.com/vuejs/vuepress/issues/121
    .replace(/^(\d)/, '_$1')
    .toLowerCase()
}
