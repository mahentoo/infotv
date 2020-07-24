<template>
  <movie-watch :movie="movie"></movie-watch>
</template>

<script>
  export default {
    name: 'Watch',

    computed: {
      movie () {
        return this.$store.state.movies.find((movie) => movie.id == this.$route.params.id);
      }
    },
  };
</script>
