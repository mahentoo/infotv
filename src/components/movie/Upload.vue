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

      <v-flex>
        <v-file-input
          id="movie"
          name="movie"
          label="Arquivo"
          accept="video/mp4"
          prepend-icon=""
          v-model="movie"
          show-size
        ></v-file-input>
      </v-flex>
      <v-flex class="text-xs-center" v-if="errors && errors.movie">
        <span class="red--text">{{ errors.movie[0] }}</span>
      </v-flex>

      <v-flex>
        <v-file-input
          id="thumb"
          name="thumb"
          label="Imagem thumbnail"
          accept=".jpg"
          prepend-icon=""
          v-model="thumb"
          show-size
        ></v-file-input>
      </v-flex>
      <v-flex class="text-xs-center" v-if="errors && errors.thumb">
        <span class="red--text">{{ errors.thumb[0] }}</span>
      </v-flex>

      <v-flex>
        <v-text-field
          id="length"
          name="length"
          label="Duração"
          type="number"
          v-model="length"
          required
        ></v-text-field>
      </v-flex>
      <v-flex class="text-xs-center" v-if="errors && errors.length">
        <span class="red--text">{{ errors.length[0] }}</span>
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
  import { Bus } from '@/main';

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
      length: '',
      movie: undefined,
      thumb: undefined,
      errors: null,
    }),

    methods: {
      upload () {
        let formData = new FormData();

        formData.append('name', this.name);
        formData.append('movie', this.movie);
        formData.append('thumb', this.thumb);
        formData.append('length', this.length);

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

            this.$emit('added');

            Bus.$emit('movieAdded');
          })
          .catch((error) => {
            console.log(error);
          });
      },
    },
  };
</script>
