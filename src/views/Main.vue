<template>
  <v-container fluid></v-container>
</template>

<script>
  import { Bus } from '@/main';

  export default {
    name: 'Main',

    created () {
      Bus.$on('currentUserUpdated', () => this.token = localStorage.getItem('user.token'));
    },

    data: () => ({
      token: localStorage.getItem('user.token'),
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
