<template>
  <v-layout wrap>
    <v-sheet :key="movie.id" v-for="movie in movies">
      <movie-card :movie="movie"></movie-card>
    </v-sheet>
  </v-layout>
</template>

<script>
  const axios = require('axios');

  export default {
    name: 'List',

    created () {
      this.list();
    },

    data: () => ({
      error: '',
    }),

    computed: {
      movies () {
        return this.$store.getters.orderedMovies;
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
