import eventBus from '~/lib/event-bus'
import logger from './utils/logger'

const TAGS_MAP = {}
const POSTS_MAP = {}

function createMap (menu) {
  for (const post of menu) {
    post.tags.forEach(tag => {
      const originTag = tag
      tag = tag.toLowerCase()
      if (!TAGS_MAP[tag]) {
        TAGS_MAP[tag] = originTag
      }

      if (Array.isArray(POSTS_MAP[tag])) {
        POSTS_MAP[tag].push(post)
      } else {
        POSTS_MAP[tag] = []
        POSTS_MAP[tag].push(post)
      }
    })
  }

  return {
    tagsMap: TAGS_MAP,
    postsMap: POSTS_MAP
  }
}

export default function getMap (menu, mapType) {
  const tagsMap = eventBus.$data.tagsMap
  const tagsMapLen = Object.keys(tagsMap).length
  const postsMap = eventBus.$data.postsMap
  const postsMapLen = Object.keys(postsMap).length

  if (tagsMapLen && postsMapLen) return eventBus.$data[mapType]

  logger.info('[Map creator]', 'Generate map !')

  const map = createMap(menu)
  Object.assign(tagsMap, map.tagsMap)
  Object.assign(postsMap, map.postsMap)

  return eventBus.$data[mapType]
}
