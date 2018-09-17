import Vue from 'vue'
import Vuex from 'vuex'
import UserModule from './UserModule.js'
import HouseModule from './HouseModule.js'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  modules: {
    UserModule,
    HouseModule
  }
})
