<template>
  <v-card class="d-inline-block mx-auto">
    <v-card-title>{{ movie.name }}</v-card-title>

    <v-container>
      <v-img height="160" width="200" :src="movie.thumb_path"></v-img>
    </v-container>

    <v-card-actions>
      <v-btn @click="remove()" icon>
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  const axios = require('axios');

  export default {
    name: 'Card',

    props: {
      movie: {
        type: Object,
        required: true,
      },
    },

    methods: {
      remove () {
        const token = localStorage.getItem('token');

        axios
          .delete('http://front-test.diga.net.br/api/movie/5' + this.movie.id, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          })
          .then(({ data }) => {
            if (data.error) {
              this.error = data.response.message;

              return;
            }
          })
          .catch((error) => {
            console.log(error);
          });
      },
    },
  };
</script>
