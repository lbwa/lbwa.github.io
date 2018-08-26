import axios from 'axios'
import { DEV_BASE } from './routes'

const devMode = process.env.NODE_ENV === 'development'

export function createAxios (baseURL) {
  const baseAxios = axios.create({
    baseURL: devMode ? DEV_BASE : baseURL
  })

  baseAxios.interceptors
    .request.use(req => req, err => console.error(`[req]:`, err.request))

  // response (even error response) schema
  // https://github.com/axios/axios#response-schema
  baseAxios.interceptors
    .response.use(res => res, err => console.error(`[res]:`, err.response.data))

  return baseAxios
}

export function normalize (route) {
  if (devMode) {
    if (route === 'projects/projects') {
      return 'projects'
    }
    return route
  }
  return /\.json$/.test(route) ? route : `${route}.json`
}
