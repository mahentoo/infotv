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

    update (state, payload) {
      state.movies.splice(state.movies.indexOf(payload.oldMovie), 1, payload.movie);
    },

    remove (state, movie) {
      state.movies.splice(stat.movies.indexOf(movie), 1);
    },
  },
  actions: {
  },
  modules: {
  }
})
