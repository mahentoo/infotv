<template>
  <div class="register">
    <form @click.prevent="signup()">
      <div>
        <label>Nome</label>
        <input type="text" name="name" v-model="name">
      </div>
      <div>
        <label>E-mail</label>
        <input type="email" name="email" v-model="email">
      </div>
      <div>
        <label>Senha</label>
        <input type="password" name="password" v-model="password">
      </div>
      <div>
        <label>Confirmar senha</label>
        <input type="password" name="password_confirmation" v-model="password_confirmation">
      </div>
      <div>
        <button type="submit">Registrar</button>
      </div>
    </form>
  </div>
</template>

<script>
  const axios = require('axios');

  export default {
    name: 'Signup',

    data: () => ({
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    }),

    methods: {
      signup () {
        axios.post('http://front-test.diga.net.br/api/signup', {
          name: this.name,
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation,
        })
        .then((response) => {
          console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
      },
    },
  };
</script>
