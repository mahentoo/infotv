<template>
  <v-form id="form-movie-upload" @submit.prevent="upload()">
    <v-layout column>
      <v-flex class="text-xs-center" mt-5>
        <v-btn type="submit" form="form-movie-upload" color="primary">
          Enviar
        </v-btn>
      </v-flex>
    </v-layout>
  </v-form>
</template>

<script>
  const axios = require('axios');

  export default {
    name: 'Upload',

    props: {
      token: {
        type: String,
        required: true,
      },
    },

    data: () => ({
      movie: {},
      errors: null,
    }),

    methods: {
      upload () {
        this.errors = null;

        axios
          .post('http://front-test.diga.net.br/api/movie/upload', this.movie, {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          })
          .then(({ data }) => {
            if (data.error) {
              this.errors = data.response.validation;

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
