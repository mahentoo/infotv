<template>
  <v-layout row wrap v-if="token">
    <v-flex class="text-right" xs12 mt-3 mx-5>
      <v-btn @click="showUpload = ! showUpload" dark rounded v-if="showUpload">
        Cancelar
      </v-btn>
      <v-btn color="primary" @click="showUpload = ! showUpload" dark rounded v-else>
        Enviar vídeo
      </v-btn>
    </v-flex>
    <v-flex xs12 sm6 xl4 offset-sm3 offset-xl4 mt-3>
      <movie-upload :token="token" v-show="showUpload"></movie-upload>
    </v-flex>

    <movie-list :token="token"></movie-list>
  </v-layout>
</template>

<script>
  import { Bus } from '@/main';

  export default {
    name: 'Main',

    created () {
      Bus.$on('currentUserUpdated', () => this.token = localStorage.getItem('token'));
    },

    data: () => ({
      token: localStorage.getItem('token'),
      showUpload: false,
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
  };
</script>
