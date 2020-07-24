<template>
  <v-card>
    <video-player class="video-player-box" ref="videoPlayer" :options="playerOptions"></video-player>
  </v-card>
</template>

<script>
  import 'video.js/dist/video-js.css';

  import { videoPlayer } from 'vue-video-player';

  export default {
    name: 'Watch',

    components: {
      videoPlayer,
    },

    props: {
      movie: {
        type: Object,
        required: true,
      },
    },

    computed: {
      playerOptions () {
        return {
          language: 'en',
          playbackRates: [0.7, 1.0, 1.5, 2.0],
          sources: [{
            type: 'video/mp4',
            src: this.movie.file_path,
          }],
          poster: this.movie.thumb_path,
        };
      },
    },
  };
</script>
