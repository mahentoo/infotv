<template>
  <v-form id="form-movie-upload" @submit.prevent="upload()">
    <v-layout column>
      <v-flex>
        <v-text-field
          id="name"
          name="name"
          label="Nome"
          type="text"
          v-model="name"
          required
        ></v-text-field>
      </v-flex>
      <v-flex class="text-xs-center" v-if="errors && errors.name">
        <span class="red--text">{{ errors.name[0] }}</span>
      </v-flex>

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
      name: '',
      errors: null,
    }),

    methods: {
      upload () {
        let formData = new FormData();

        formData.append('name', this.name);

        this.errors = null;

        axios
          .post('http://front-test.diga.net.br/api/movie/upload', formData, {
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
