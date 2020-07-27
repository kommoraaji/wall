import {
  getMenuList,
  getRoleList,
  getUserList,
  getCateList,
  getSpecsList
} from '../uitl/axios'

//获取菜单列表
export default {
  getActionMenu({
    commit
  }) {
    getMenuList({
        istree: 1
      })
      .then(res => {
        if (res.data.code == 200) {
          commit('reqMenuList', res.data.list)
        }
      })
  },
  //获取用户列表
  getActionRole({
    commit
  }) {
    getRoleList()
      .then(res => {
        if (res.data.code == 200) {
          commit('reqRoleList', res.data.list)
        }
      })
  },
  //获取管理员列表
  getActionUser({
    commit
  }, pageInfo) {
    getUserList(pageInfo)
      .then(res => {
        if (res.data.code == 200) {
          commit('reqUserList', res.data.list)
        }
      })
  },
  //获取商品分类列表
  getActionCate({
    commit
  }) {
    getCateList({
        istree: 1
      })
      .then(res => {
        if (res.data.code == 200) {
          commit('reqCateList', res.data.list)
        }
      })
  },
  //获取商品规格列表
  getActionSpecs({
    commit
  }) {
    getSpecsList()
      .then(res => {
        if (res.data.code == 200) {
          commit('reqSpecsList', res.data.list)
        }
      })
  }
}
