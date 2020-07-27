import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

//解决element-ui导航栏多次点击报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  mode: 'history',
  routes: [{
      path: '/index',
      component: () => import('@/components/pages/index'),
      children: [{
          path: '/menu',
          component: () => import('@/components/views/menu'),
          name: '菜单管理'
        },
        {
          path: '/user',
          component: () => import('@/components/views/user'),
          name: '管理员管理'
        },
        {
          path: '/role',
          component: () => import('@/components/views/role'),
          name: '角色管理'
        },
        {
          path: '/sort',
          component: () => import('@/components/views/sort'),
          name: '商品分类'
        },
        {
          path: '/specs',
          component: () => import('@/components/views/specs'),
          name: '商品规格'
        },
        {
          path: '/goods',
          component: () => import('@/components/views/goods'),
          name: '商品管理'
        },
        {
          path: '/member',
          component: () => import('@/components/views/member'),
          name: '会员管理'
        },
        {
          path: '/banner',
          component: () => import('@/components/views/banner'),
          name: '轮播图管理'
        },
        {
          path: '/seck',
          component: () => import('@/components/views/seck'),
          name: '限时秒杀管理'
        },
        {
          path: '/home',
          component: () => import('@/components/views/home')
        }
      ]
    },
    {
      path: '/login',
      component: () => import('@/components/pages/login')
    },
    {
      path: '*',
      redirect: '/login'
    }
  ]
})
