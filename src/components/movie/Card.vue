<template>
  <v-card class="d-inline-block mr-4 mb-4" width="284px">
    <v-card-title>{{ movie.name }}</v-card-title>

    <v-container @click="playing()">
      <v-img height="160" width="260" :src="movie.thumb_path"></v-img>
    </v-container>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn @click="showEdit()" icon>
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn @click="confirmDelete()" icon>
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import Bus from '@/bus';

export default {
  name: 'Card',

  props: {
    movie: {
      type: Object,
      required: true,
    },
  },

  methods: {
    playing() {
      Bus.$emit('playing', this.movie);
    },

    showEdit() {
      Bus.$emit('showEdit', this.movie);
    },

    confirmDelete() {
      Bus.$emit('confirmDelete', this.movie);
    },
  },
};
</script>
