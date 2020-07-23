<template>
  <v-card class="d-inline-block mx-auto">
    <v-card-title>{{ movie.name }}</v-card-title>
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
