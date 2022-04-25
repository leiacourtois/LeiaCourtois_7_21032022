import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    online: false,

    regex:{
      text: /^[-'a-zA-Z0-9À-ÖØ-öø-ÿœ\s#!^$()?+*.:,|]+$/,
      email: /^[a-z0-9.-]+@[a-z0-9.-]{2,}.[a-z]{2,4}$/,
      password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/
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
