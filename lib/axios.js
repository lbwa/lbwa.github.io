// we can use axios request ssr server or some other remote data center if it
// necessary by asyncData function in components.
import axios from 'axios'

let options = {
  baseURL: 'https://docs.set.sh/'
}

export default axios.create(options)
