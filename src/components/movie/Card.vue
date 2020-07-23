<template>
  <v-card class="d-inline-block mx-auto">
    <v-card-title>{{ movie.name }}</v-card-title>

    <v-container>
      <v-img height="160" width="200" :src="movie.thumb_path"></v-img>
    </v-container>
  </v-card>
</template>

<script>
  export default {
    name: 'Card',

    props: {
      movie: {
        type: Object,
        required: true,
      },
    },
  };
</script>
