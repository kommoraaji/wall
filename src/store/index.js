import Vue from 'vue'

import Vuex from 'vuex'

Vue.use(Vuex)

import state from './state'
import getters from './getter'
import mutations from './mutaion'
import actions from './action'


export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
