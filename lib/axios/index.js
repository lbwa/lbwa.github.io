// we can use axios request ssr server or some other remote data center if it
// necessary by asyncData function in components.
import { createAxios, normalize } from './utils'
import * as routes from './routes'

// https://nuxtjs.org/api/configuration-dev
// https://github.com/nuxt/nuxt.js/commit/742ea42f97
const devMode = process.env.NODE_ENV === 'development'
if (devMode) console.log(`%c Under development mode`, 'font-weight: bold')

const assetsAxios = createAxios(routes.PROD_ASSETS)
const docsAxios = createAxios(routes.PROD_DOCS)

// basic request

export const getRecentPosts = function () {
  return docsAxios.get(routes.RECENT_POSTS)
}

export const getMenu = function () {
  return assetsAxios.get(normalize(routes.MENU))
}

export const getProjects = function () {
  return assetsAxios.get(normalize(routes.PROJECTS))
}

/**
 * request writing data
 * @param {String} id id of writing
 * @return {Promise<responseObject>}
 */
export const getWriting = function (id) {
  return assetsAxios.get(normalize(`${routes.WRITINGS}/${id}`))
}
