import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    online: false,

    regex:{
      text: /^[-'a-zA-Z0-9À-ÖØ-öø-ÿœ\s#!^$()?+*.:,|_]+$/,
      email: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
      password: /^(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
    }
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
