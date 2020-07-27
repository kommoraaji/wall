import axios from 'axios'

//创建自定义实例
let http = axios.create({
  baseURL: '/api'
})

//请求拦截
http.interceptors.request.use((config) => {
  let userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
  config.headers.authorization = userInfo ? userInfo.token : {}
  // console.log(config)
  return config
})

//响应拦截
http.interceptors.response.use((res) => {
  return res
})

//暴露http
export default http
