<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex class="text-center" xs12 mt-5>
        <h1>Entrar</h1>
      </v-flex>
      <v-flex xs12 sm6 xl4 offset-sm3 offset-xl4 mt-3>
        <v-form id="form-signin" @submit.prevent="signin()">
          <v-layout column>
            <v-flex>
              <v-text-field
                id="email"
                name="email"
                label="E-mail"
                type="email"
                v-model="email"
                required
              ></v-text-field>
            </v-flex>

            <v-flex>
              <v-text-field
                id="password"
                name="password"
                label="Senha"
                type="password"
                v-model="password"
                required
              ></v-text-field>
            </v-flex>
            <v-flex class="text-xs-center" v-if="error">
              <span class="red--text">{{ error }}</span>
            </v-flex>

            <v-flex class="text-xs-center" mt-5>
              <v-btn type="submit" form="form-signin" color="primary">
                Entrar
              </v-btn>
            </v-flex>
          </v-layout>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
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
