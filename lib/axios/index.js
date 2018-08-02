// we can use axios request ssr server or some other remote data center if it
// necessary by asyncData function in components.
import axios from 'axios'
import * as routes from './base-routes'

// basic axios config

// https://nuxtjs.org/api/configuration-dev
// https://github.com/nuxt/nuxt.js/commit/742ea42f97
const isDev = process.env.NODE_ENV === 'development'

const tag = isDev ? 'development' : 'production'
if (isDev) console.log(`%c${tag} mode`, 'font-weight: bold')

const baseAxios = axios.create({
  baseURL: isDev ? 'http://localhost:8800/' : 'https://docs.set.sh/'
})

// basic request

export const getRecentPosts = function () {
  return baseAxios.get(routes.RECENT_POSTS)
}

export const getMenu = function () {
  return baseAxios.get(routes.MENU)
}

export const getProjects = function () {
  return baseAxios.get(routes.PROJECTS)
}

export const getWriting = function (id) {
  return baseAxios.get(`${routes.WRITINGS}/${id}`)
}
