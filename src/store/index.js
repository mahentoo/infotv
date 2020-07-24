import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    movies: [],
  },

  mutations: {
    add (state, movie) {
      state.movies.push(movie);
    },
  },
  actions: {
  },
  modules: {
  }
})
