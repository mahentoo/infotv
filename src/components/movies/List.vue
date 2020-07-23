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

    methods: {
      list () {
        axios
          .get('http://front-test.diga.net.br/api/movie', {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          })
          .then(({ data }) => {
          })
          .catch((error) => {
            console.log(error);
          });
      },
    },
  };
</script>
