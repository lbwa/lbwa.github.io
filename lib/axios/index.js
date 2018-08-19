// we can use axios request ssr server or some other remote data center if it
// necessary by asyncData function in components.
import axios from 'axios'
import * as routes from './base-routes'

// basic axios config

// https://nuxtjs.org/api/configuration-dev
// https://github.com/nuxt/nuxt.js/commit/742ea42f97
const devMode = process.env.NODE_ENV === 'development'

const tag = devMode ? 'development' : 'production'
if (devMode) console.log(`%c${tag} mode`, 'font-weight: bold')

const baseAxios = axios.create({
  baseURL: devMode ? 'http://192.168.2.108:8800/' : 'https://docs.set.sh/'
})

baseAxios.interceptors
  .request.use(req => req, err => console.error(`[req]:`, err.request))

// response (even error response) schema
// https://github.com/axios/axios#response-schema
baseAxios.interceptors
  .response.use(res => res, err => console.error(`[res]:`, err.response.data))

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

/**
 * request writing data
 * @param {String} id id of writing
 * @return {Promise<responseObject>}
 */
export const getWriting = function (id) {
  return baseAxios.get(`${routes.WRITINGS}/${id}`)
}
