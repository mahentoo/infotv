<template>
  <button type="button" @click.prevent="clear()">Sair</button>
</template>

<script>
  export default {
    name: 'Signin',

    methods: {
      clear () {
        window.localStorage.clear();

        this.$router.replace('/login');
      },
    },
  };
</script>
