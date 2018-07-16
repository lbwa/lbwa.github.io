// we can use axios request ssr server or some other remote data center if it
// necessary by asyncData function in components.
import axios from 'axios'

// https://nuxtjs.org/api/configuration-dev
// https://github.com/nuxt/nuxt.js/commit/742ea42f97
const isServer = process.env.NODE_ENV === 'development'

let options = {
  baseURL: isServer ? 'http://localhost:8800' : 'https://docs.set.sh/'
}

const tag = isServer ? 'development' : 'production'

console.log(`We are in: ${tag} mode`)

export default axios.create(options)
