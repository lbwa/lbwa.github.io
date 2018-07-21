export const headMixin = {
  computed: {
    // github page redirect: https://set.sh/11 -> http://set.sh/11/ -> https://set.sh/11/
    // Make sure href of language tag point current page rather than redirect
    // page, otherwise it will throw error by SEO console (self-referencing)
    languagePath () {
      const path = this.$route.path
      const hasSlash = /\/$/.test(path)

      return hasSlash ? path : `${path}/`
    }
  },

  head () {
    return {
      title: `${this.title} | Bowen Blog`,
      link: [
        { rel: 'alternate', href: `https://set.sh${this.languagePath}`, hreflang: 'zh'}
      ]
    }
  }
}
