export const headMixin = {
  head () {
    return {
      title: `${this.title} | Bowen Blog`,
      link: [
        { rel: 'alternate', href: `https://set.sh${this.$route.path}`, hreflang: 'zh'}
      ]
    }
  }
}
