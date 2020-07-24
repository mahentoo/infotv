<template>
  <movie-watch :movie="movie"></movie-watch>
</template>

<script>
  export default {
    name: 'Watch',

    computed: {
      movie () {
        return {
          created:'2020-07-23T22:47:17.000000Z',
          file_path:'http://front-test.diga.net.br/storage/movies/h8vmw2RnujSdHoPNtcqBoCJD54AGEiRsgTrlGCf7mYaxGTBLAO4l.mp4',
          file_size: {
            human:'445.48kB',
            raw:'456174',
          },
          id:6,
          length:'27',
          name:'Small',
          thumb_path:'http://front-test.diga.net.br/storage/thumb/h8vmw2RnujSdHoPNtcqBoCJD54AGEiRsgTrlGCf7mYaxGTBLAO4l.jpg',
        };
      }
    },
  };
</script>
