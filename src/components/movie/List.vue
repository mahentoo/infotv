<template>
  <v-layout row wrap>
    <div :key="movie.id" v-for="movie in movies">
      {{ movie.name }}<br>
    </div>
  </v-layout>
</template>

<script>
  import { Bus } from '@/main';

  const axios = require('axios');

  export default {
    name: 'List',

    props: {
      token: {
        type: String,
        required: true,
      },
    },

    created () {
      Bus.$on('movieAdded', () => this.list());

      this.list();
    },

    data: () => ({
      error: '',
      movies: [],
    }),

    methods: {
      list () {
        this.error = '';

        axios
          .get('http://front-test.diga.net.br/api/movie', {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          })
          .then(({ data }) => {
            if (data.error) {
              this.error = data.response.message;

              return;
            }

            this.movies = data.response.movie;
          })
          .catch((error) => {
            console.log(error);
          });
      },
    },
  };
</script>
