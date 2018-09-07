importScripts('/_nuxt/workbox.3de3418b.js')

const workboxSW = new self.WorkboxSW({
  "cacheId": "blog",
  "clientsClaim": true,
  "directoryIndex": "/"
})

workboxSW.precache([
  {
    "url": "/_nuxt/app.5a4fa6b8fcf73db97515.js",
    "revision": "1085cb1370fe849b54a173c7f8c88f9a"
  },
  {
    "url": "/_nuxt/app.7d838d8b0da655541c316320c8ad8e6f.css",
    "revision": "7d838d8b0da655541c316320c8ad8e6f"
  },
  {
    "url": "/_nuxt/layouts/blog.6efcc6c813d476fa30a1.js",
    "revision": "6089c7b82c431310783aea7a88a97cbd"
  },
  {
    "url": "/_nuxt/layouts/default.89ffa224d3d7769e4fbb.js",
    "revision": "50ffa6de437d1d77654f79e3df707ce7"
  },
  {
    "url": "/_nuxt/layouts/home.dd55e95df1c2109ebde6.js",
    "revision": "a46115556b9183d4ac9aa361df243cc9"
  },
  {
    "url": "/_nuxt/manifest.e871ed9ec943b3b0a9ad.js",
    "revision": "df9471143da18fabcead711768cc621f"
  },
  {
    "url": "/_nuxt/pages/blog.48d3a2ec874d58a119ed.js",
    "revision": "bd79ab436df663576d9a81e7a4586d30"
  },
  {
    "url": "/_nuxt/pages/blog/projects/index.3ff8e031c3cb4f25eaed.js",
    "revision": "c0aa471c67464ca48cb269fea2f6a93b"
  },
  {
    "url": "/_nuxt/pages/blog/tags/_id/index.edb9dbabb1b9c2ef81f2.js",
    "revision": "92bfcfb4bd375bb186de994fe6925e80"
  },
  {
    "url": "/_nuxt/pages/blog/tags/index.2659d358b69abdfd34bf.js",
    "revision": "8d103c0ff8c5d48ef83c08c04abbdb5c"
  },
  {
    "url": "/_nuxt/pages/blog/writings/_id/index.7e8ea086028ccb843111.js",
    "revision": "23d769956ed85b1e8890b1142f87d323"
  },
  {
    "url": "/_nuxt/pages/blog/writings/index.b016af22016e152b7231.js",
    "revision": "4ea7f1ecfd8d183c267e752a0626905b"
  },
  {
    "url": "/_nuxt/pages/index.1d0ac68e309be0e86168.js",
    "revision": "a0e56451c73a085e5c8829c3a0381a15"
  },
  {
    "url": "/_nuxt/vendor.13de21511613edf061b2.js",
    "revision": "9081ea46fc971e7d88ede65b81f19c56"
  }
])


workboxSW.router.registerRoute(new RegExp('/_nuxt/.*'), workboxSW.strategies.cacheFirst({}), 'GET')

workboxSW.router.registerRoute(new RegExp('/.*'), workboxSW.strategies.networkFirst({}), 'GET')

