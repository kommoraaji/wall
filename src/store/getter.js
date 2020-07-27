export default {
  //菜单
  getStateMenu(state) {
    return state.menuList
  },
  //角色
  getStateRole(state) {
    return state.roleList
  },
  //管理员
  getStateUser(state) {
    return state.userList
  },
  //商品分类
  getStateCate(state) {
    return state.cateList
  },
  //商品规格
  getStateSpecs(state) {
    return state.specsList
  }
}
