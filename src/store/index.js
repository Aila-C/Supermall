import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

const store =  new Vuex.Store({
  state: {
    cartList:[]
  },
  mutations,
  //异步操作放在actions里面，判断逻辑的东西放到actions里面
  actions,
  getters,
  modules: {
  },

})

export default store
