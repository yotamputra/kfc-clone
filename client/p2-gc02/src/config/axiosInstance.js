import axios from 'axios'

const instance = axios.create({
  // baseURL: "http://localhost:3000",
  baseURL: 'https://yotamputra.site',
})

export default instance