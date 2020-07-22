<template>
  <div class="register">
    <form @submit.prevent="signin()">
      <div>
        <label>E-mail</label>
        <input type="email" name="email" v-model="email">
      </div>
      <div>
        <label>Senha</label>
        <input type="password" name="password" v-model="password">
      </div>
      <div v-if="error">{{ error }}</div>
      <div>
        <button type="submit">Entrar</button>
      </div>
    </form>
  </div>
</template>

<script>
  const axios = require('axios');

  export default {
    name: 'Signin',

    data: () => ({
      email: '',
      error: '',
      password: '',
    }),

    methods: {
      signin () {
        this.error = '';

        axios.post('http://front-test.diga.net.br/api/signin', {
          email: this.email,
          password: this.password,
        })
        .then(({ data }) => {
          if (data.error) {
            this.error = data.response.message;

            return;
          }

          window.localStorage.setItem('token', data.response.token);
          window.localStorage.setItem('user.name', data.response.user.name);
          window.localStorage.setItem('user.email', data.response.user.email);

          this.$router.replace('/');
        })
        .catch((error) => {
          console.log(error);
        });
      },
    },
  };
</script>
