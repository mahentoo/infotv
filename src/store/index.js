import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    movies: [],
  },

  getters: {
    orderedMovies: (state) => {
      return state.movies.sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();

        let comparison = 0;

        if (nameA > nameB) {
          comparison = 1;
        }

        if (nameA < nameB) {
          comparison = -1;
        }

        if (nameA === nameB) {
          if (a.length > b.length) {
            comparison = 1;
          }

          if (a.length < b.length) {
            comparison = -1;
          }
        }

        return comparison;
      });
    },
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
