//接口集合模块
import http from './axios'


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
