<template>
  <v-container fluid>
    <form @submit.prevent="signup()">
      <div>
        <label>Nome</label>
        <input type="text" name="name" v-model="name">
        <span v-if="errors && errors.name">{{ errors.name[0] }}</span>
      </div>
      <div>
        <label>E-mail</label>
        <input type="email" name="email" v-model="email">
        <span v-if="errors && errors.email">{{ errors.email[0] }}</span>
      </div>
      <div>
        <label>Senha</label>
        <input type="password" name="password" v-model="password">
        <span v-if="errors && errors.password">{{ errors.password[0] }}</span>
      </div>
      <div>
        <label>Confirmar senha</label>
        <input type="password" name="password_confirmation" v-model="password_confirmation">
      </div>
      <div>
        <button type="submit">Registrar</button>
      </div>
    </form>
  </v-container>
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
      errors: null,
    }),

    methods: {
      signup () {
        this.errors = null;

        axios.post('http://front-test.diga.net.br/api/signup', {
          name: this.name,
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation,
        })
        .then(({ data }) => {
          if (data.error) {
            this.errors = data.response.validation;

            return;
          }
        })
        .catch((error) => {
          console.log(error);
        });
      },
    },
  };
</script>
