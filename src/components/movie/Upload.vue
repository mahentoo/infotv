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
              <v-flex class="text-xs-center" v-if="message">
                <span class="red--text">{{ message }}</span>
              </v-flex>

              <v-flex>
                <v-text-field
                  id="name"
                  name="name"
                  label="Nome"
                  type="text"
                  v-model="movie.name"
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
                  @change="getInfo"
                  v-model="movie.file"
                  show-size
                ></v-file-input>
              </v-flex>

              <v-flex class="text-xs-center" v-if="errors && errors.movie">
                <span class="red--text">{{ errors.movie[0] }}</span>
              </v-flex>
              <v-flex class="text-xs-center" v-if="errors && errors.thumb">
                <span class="red--text">{{ errors.thumb[0] }}</span>
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
        <v-btn color="primary" @click="save(movie)" :disabled="! movie.length" rounded>
          Enviar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Bus from '@/bus';

const axios = require('axios');

export default {
  name: 'Upload',

  created() {
    Bus.$on('showEdit', (movie) => this.toggleDialog(movie));

    this.video = document.createElement('video');
    this.video.onloadeddata = () => this.play();
    this.video.ontimeupdate = () => this.setInfo();
  },

  data: () => ({
    movie: {
      name: '',
      length: NaN,
    },
    message: '',
    video: null,
    errors: null,
    showDialog: false,
  }),

  methods: {
    save() {
      const token = localStorage.getItem('token');

      const formData = new FormData();

      formData.append('name', this.movie.name);
      formData.append('movie', this.movie.file);
      formData.append('thumb', this.movie.thumb);
      formData.append('length', this.movie.length);

      this.message = '';
      this.errors = null;

      let url = 'http://front-test.diga.net.br/api/movie/upload';
      let mutation = 'add';

      if (this.movie.id) {
        url = `http://front-test.diga.net.br/api/movie/update/${this.movie.id}`;
        mutation = 'update';
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
            this.message = data.response.message;

            return;
          }

          let { movie } = data.response;

          if (this.movie.id) {
            movie = data.response.response.movie;
          }

          this.$store.commit(mutation, {
            movie,
            oldMovie: this.movie,
          });

          this.toggleDialog();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    play() {
      this.video.play();
    },

    getInfo(file = null) {
      if (!file) {
        this.movie.length = NaN;

        return;
      }

      if ('srcObject' in this.video) {
        try {
          this.video.srcObject = file;
        } catch (err) {
          if (err.name !== 'TypeError') {
            throw err;
          }

          this.video.src = URL.createObjectURL(file);
        }

        return;
      }

      this.video.src = URL.createObjectURL(file);
    },

    setInfo() {
      this.setMovieLength();
      this.setMovieThumb();
    },

    setMovieLength() {
      this.movie.length = parseInt(this.video.duration, 10);
    },

    setMovieThumb() {
      this.video.pause();

      const canvas = document.createElement('canvas');

      canvas.width = this.video.videoWidth;
      canvas.height = this.video.videoHeight;

      canvas.getContext('2d').drawImage(this.video, 0, 0, canvas.width, canvas.height);

      this.movie.thumb = this.dataURItoBlob(canvas.toDataURL('image/jpeg'));
    },

    dataURItoBlob(dataURI) {
      let byteString = unescape(dataURI.split(',')[1]);

      if (dataURI.split(',')[0].indexOf('base64') >= 0) {
        byteString = atob(dataURI.split(',')[1]);
      }

      const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

      const ia = new Uint8Array(byteString.length);

      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }

      return new Blob([ia], { type: mimeString });
    },

    toggleDialog(movie = { name: '' }) {
      this.movie = movie;
      this.showDialog = !this.showDialog;
    },
  },
};
</script>
