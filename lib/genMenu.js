// generate list of articles
// It must be handle by manual before render blog
// process.cwd(): '/'
// TODO: auto scan files name

const fs = require('fs')
const resolve = require('path').resolve
const readMeta = require('front-matter')
const logger = require('consola')
const formatDate = require('./util/formatDate')

let result = []

function scanner (path) {
  // fs.readdirSync return a string[]
  let files = fs.readdirSync(path)
  files.forEach((file, index) => {
    if (index === files.length - 1) return

    // get each title
    const fileContent = fs.readFileSync(`${path}/${file}`, 'utf8')
    const raw = readMeta(fileContent).attributes
    const title = raw.title
    const author = raw.author
    const date = formatDate(raw.date)
    const tags = raw.tags

    result.unshift({ to: file.replace(/.md$/, ''), title, author, date, tags })
  })

  return JSON.stringify(result)
}

const outputPath = resolve(__dirname, '../source/_posts/menu.json')
const targetPath = resolve(__dirname, '../source/_posts')

fs.writeFile(outputPath, scanner(targetPath), (err) => {
  err
    ? logger.error(err)
    : logger.success(` 👌  generate menu successfully in ${outputPath} ! \n`)
})
