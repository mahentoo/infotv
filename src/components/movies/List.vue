<template>
  <v-container fluid></v-container>
</template>

<script>
  export default {
    name: 'List',

    props: {
      token: {
        type: String,
        required: true,
      },
    },
  };
</script>
