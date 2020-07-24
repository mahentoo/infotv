<template>
  <v-layout row wrap v-if="token">
    <v-flex xs12 mt-3 mx-5>
      <movie-upload></movie-upload>
    </v-flex>

    <v-flex xs12 mt-3 mx-5>
      <movie-list></movie-list>
    </v-flex>

    <v-flex xs12 mt-3 mx-5>
      <v-sheet v-if="playing">
        <movie-watch :movie="movieToPlay"></movie-watch>
      </v-sheet>
    </v-flex>

    <v-dialog v-model="dialogDelete" max-width="300px">
      <v-card>
        <v-card-title>Remover</v-card-title>
        <v-card-text>
          Deseja mesmo remover o vídeo {{ movieToDelete.name }}?
        </v-card-text>
        <v-card-actions>
          <v-btn @click="dialogDelete = false" rounded>Cancelar</v-btn>
          <v-btn color="primary" @click="remove()" rounded>Remover</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  import { Bus } from '@/main';

  const axios = require('axios');

  export default {
    name: 'Main',

    created () {
      Bus.$on('playing', (movie) => this.toPlay(movie));
      Bus.$on('confirmDelete', (movie) => this.confirmDelete(movie));
    },

    data: () => ({
      token: localStorage.getItem('token'),
      showUpload: false,
      playing: false,
      dialogDelete: false,
      movieToPlay: {},
      movieToDelete: {},
    }),

    watch: {
      token: {
        handler: function (token) {
          if (! token) {
            this.$router.push('/signin');
          }
        },
        immediate: true,
      },
    },

    methods: {
      remove () {
        const token = localStorage.getItem('token');

        axios
          .delete('http://front-test.diga.net.br/api/movie/' + this.movieToDelete.id, {
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

            this.dialogDelete = false;

            this.$store.commit('remove', this.movieToDelete);
          })
          .catch((error) => {
            console.log(error);
          });
      },

      toPlay (movie = {}) {
        this.movieToPlay = movie;
        this.playing = true;
      },

      confirmDelete (movie = {}) {
        this.movieToDelete = movie;
        this.dialogDelete = ! this.dialogDelete;
      },
    },
  };
</script>
