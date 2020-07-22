import axios from 'axios'

//创建自定义实例
let http = axios.create({
  baseURL: '/api'
})


//暴露http
export default http
