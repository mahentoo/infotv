<template>
  <v-dialog v-model="showDialog" max-width="600px">
    <template v-slot:activator="{ on }">
      <v-btn color="primary" v-on="on" dark rounded>
        Enviar vídeo
      </v-btn>
    </template>

    <v-card>
      <v-card-title>
        <span v-if="movie.id">
          Editar <span class="font-weight-bold">{{ movie.name }}</span>
        </span>
        <span v-else>Novo vídeo</span>
      </v-card-title>

      <v-card-text>
        <v-row>
          <v-col>
            <v-layout column>
              <v-flex>
                <v-text-field
                id="name"
                name="name"
                label="Nome"
                type="text"
                v-model="movie.name"
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
                v-model="movie.file"
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
                v-model="movie.thumb"
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
                v-model="movie.length"
                required
                ></v-text-field>
              </v-flex>
              <v-flex class="text-xs-center" v-if="errors && errors.length">
                <span class="red--text">{{ errors.length[0] }}</span>
              </v-flex>
            </v-layout>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions class="px-6 pb-6">
        <v-spacer></v-spacer>
        <v-btn @click="toggleDialog()" rounded>Cancelar</v-btn>
        <v-btn color="primary" @click="save(movie)" rounded>Enviar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import { Bus } from '@/main';

  const axios = require('axios');

  export default {
    name: 'Upload',

    created () {
      Bus.$on('showEdit', (movie) => this.toggleDialog(movie));
    },

    data: () => ({
      movie: {
        name: '',
      },
      errors: null,
      showDialog: false,
    }),

    methods: {
      save () {
        const token = localStorage.getItem('token');

        let formData = new FormData();

        formData.append('name', this.movie.name);
        formData.append('movie', this.movie.file);
        formData.append('thumb', this.movie.thumb);
        formData.append('length', this.movie.length);

        this.errors = null;

        let url = 'http://front-test.diga.net.br/api/movie/upload';
        let event = 'movieAdded';

        if (this.movie.id) {
          url = 'http://front-test.diga.net.br/api/movie/update/' + this.movie.id;
          event = 'movieUpdated';
        }

        axios
          .post(url, formData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(({ data }) => {
            if (data.error) {
              this.errors = data.response.validation;

              return;
            }

            this.toggleDialog();

            Bus.$emit(event, data.response.movie, this.movie);
          })
          .catch((error) => {
            console.log(error);
          });
      },

      toggleDialog (movie = { name: '' }) {
        this.movie = movie;
        this.showDialog = ! this.showDialog;
      },
    },
  };
</script>
