<template>
  <v-container fluid></v-container>
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
