<template>
  <v-container fluid></v-container>
</template>

<script>
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
      this.list();
    },

    data: () => ({
      error: '',
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
          })
          .catch((error) => {
            console.log(error);
          });
      },
    },
  };
</script>
