import {
  getMenuList,
  getRoleList
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
  getActionRole({
    commit
  }) {
    getRoleList()
      .then(res => {
        if (res.data.code == 200) {
          commit('reqRoleList', res.data.list)
        }
      })
  }
}
