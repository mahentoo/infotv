import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    movies: [],
  },

  mutations: {
    setMovies (state, movies) {
      state.movies = movies;
    },

    add (state, payload) {
      state.movies.push(payload.movie);
    },

    update (state, payload) {
      state.movies.splice(state.movies.indexOf(payload.oldMovie), 1, payload.movie);
    },

    remove (state, movie) {
      state.movies.splice(state.movies.indexOf(movie), 1);
    },
  },

  actions: {
  },
  modules: {
  }
})
