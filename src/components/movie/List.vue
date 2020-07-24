<template>
  <v-sheet>
    <v-layout wrap>
      <v-card :key="movie.id" v-for="movie in movies">
        <movie-card :movie="movie"></movie-card>
      </v-card>
    </v-layout>
  </v-sheet>
</template>

<script>
  import { Bus } from '@/main';

  const axios = require('axios');

  export default {
    name: 'List',

    created () {
      Bus.$on('movieAdded', (movie) => this.movies.push(movie));
      Bus.$on('movieUpdated', (movie, oldMovie) => this.movies.splice(this.movies.indexOf(oldMovie), 1, movie));
      Bus.$on('movieRemoved', (movie) => this.movies.splice(this.movies.indexOf(movie), 1));

      this.list();
    },

    data: () => ({
      error: '',
    }),

    computed: {
      movies () {
        return this.$store.state.movies;
      }
    },

    methods: {
      list () {
        const token = localStorage.getItem('token');

        this.error = '';

        axios
          .get('http://front-test.diga.net.br/api/movie', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(({ data }) => {
            if (data.error) {
              this.error = data.response.message;

              return;
            }

            this.$store.commit('setMovies', data.response.movie);
          })
          .catch((error) => {
            console.log(error);
          });
      },
    },
  };
</script>
