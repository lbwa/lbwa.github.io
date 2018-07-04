// we can use axios request ssr server or some remote markdown data if it
// necessary by asyncData function in components.
import axios from 'axios'

let options = {}
options.baseURL = 'https://raw.githubusercontent.com/lbwa/lbwa.github.io/vue/source/_posts'

// If local data server exist
// options.baseURL = process.server
//   ? 'https://localhost'
//   : 'https://raw.githubusercontent.com/lbwa/lbwa.github.io/dev/source/_posts'

export default axios.create(options)
