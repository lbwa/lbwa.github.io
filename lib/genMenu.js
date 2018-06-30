// generate all article list

const fs = require('fs')
const resolve = require('path').resolve
const readMeta = require('front-matter')
const formatDate = require('./util/formatDate')

let result = []

function scanner (path) {
  // return a string[]
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


    const newPath = file.replace(/^\d{6}-/, '/').replace(/.md$/, '')

    result.push({ to: newPath, title, author, date, tags })
  })

  return JSON.stringify(result)
}

const outputPath = resolve(__dirname, '../source/_posts/menu.json')
const targetPath = resolve(__dirname, '../source/_posts')

fs.writeFile(outputPath, scanner(targetPath), (err) => {
  if (err) console.error(err)
})
