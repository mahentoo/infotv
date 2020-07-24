<template>
  <v-card class="d-inline-block mr-4 mb-4">
    <v-card-title>{{ movie.name }}</v-card-title>

    <v-container>
      <v-img height="160" width="200" :src="movie.thumb_path"></v-img>
    </v-container>

    <v-card-actions>
      <v-btn @click="confirmDelete()" icon>
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  import { Bus } from '@/main';

  export default {
    name: 'Card',

    props: {
      movie: {
        type: Object,
        required: true,
      },
    },

    methods: {
      confirmDelete () {
        Bus.$emit('confirmDelete', this.movie);
      },
    },
  };
</script>
