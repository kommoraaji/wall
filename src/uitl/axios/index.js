//接口集合模块
import http from './axios'

/* ----------------------------------------------------------- */

//菜单添加接口
export function getMenuAdd(data) {
  return http.post('/api/menuadd', data)
}

//菜单列表接口
export function getMenuList(params) {
  return http.get('/api/menulist', {
    params
  })
}

//菜单获取（一条）
export function getMenuInfo(params) {
  return http.get('/api/menuinfo', {
    params
  })
}

//菜单修改
export function getMenuEdit(data) {
  return http.post('/api/menuedit', data)
}

//菜单删除
export function getMenuDelete(data) {
  return http.post('/api/menudelete', data)
}

/* ----------------------------------------------------------- */

//角色添加接口
export function getRoleAdd(data) {
  return http.post('/api/roleadd', data)
}

//角色列表接口
export function getRoleList() {
  return http.get('/api/rolelist')
}

//角色获取（一条）
export function getRoleInfo(params) {
  return http.get('/api/roleinfo', {
    params
  })
}

//角色修改
export function getRoleEdit(data) {
  return http.post('/api/roleedit', data)
}

//角色删除
export function getRoleDelete(data) {
  return http.post('/api/roledelete', data)
}

/* ----------------------------------------------------------- */

//管理员添加
export function getUserAdd(data) {
  return http.post('/api/useradd', data)
}

//管理员总数
export function getUserCount() {
  return http.get('/api/usercount')
}

//管理员列表
export function getUserList(params) {
  return http.get('/api/userlist', {
    params
  })
}

//管理员获取（一条）
export function getUserInfo(params) {
  return http.get('/api/userinfo', {
    params
  })
}

//管理员修改
export function getUserEdit(data) {
  return http.post('/api/useredit', data)
}

//管理员删除
export function getUserDelete(data) {
  return http.post('/api/userdelete', data)
}

//管理员登录
export function getUserLogin(data) {
  return http.post('/api/userlogin', data)
}

/* ----------------------------------------------------------- */

//商品分类添加
export function getCateAdd(data) {
  return http.post('/api/cateadd', data)
}

//商品分类列表
export function getCateList(params) {
  return http.get('/api/catelist', {
    params
  })
}

//商品分类获取（一条）
export function getCateInfo(params) {
  return http.get('/api/cateinfo', {
    params
  })
}

//商品分类修改
export function getCateEdit(data) {
  return http.post('/api/cateedit', data)
}

//商品分类删除
export function getCateDelete(data) {
  return http.post('/api/catedelete', data)
}

/* ----------------------------------------------------------- */

//商品规格添加
export function getSpecsAdd(data) {
  return http.post('/api/specsadd', data)
}

//商品规格总数
export function getSpecsCount() {
  return http.get('/api/specscount')
}

//商品规格列表
export function getSpecsList(params) {
  return http.get('/api/specslist', {
    params
  })
}

//商品规格获取（一条）
export function getSpecsInfo(params) {
  return http.get('/api/specsinfo', {
    params
  })
}

//商品规格修改
export function getSpecsEdit(data) {
  return http.post('/api/specsedit', data)
}

//商品规格删除
export function getSpecsDelete(data) {
  return http.post('/api/specsdelete', data)
}