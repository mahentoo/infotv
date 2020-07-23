<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex class="text-center" xs12 mt-5>
        <h1>Cadastrar</h1>
      </v-flex>
      <v-flex xs12 sm6 xl4 offset-sm3 offset-xl4 mt-3>
        <v-form @submit.prevent="signup()">
          <v-layout column>
            <v-flex>
              <v-text-field
                id="name"
                name="name"
                label="Nome"
                type="text"
                v-model="name"
                required
              ></v-text-field>
            </v-flex>
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
            <div>
              <label>Confirmar senha</label>
              <input type="password" name="password_confirmation" v-model="password_confirmation">
            </div>
            <div>
              <button type="submit">Registrar</button>
            </div>
          </v-layout>
        </v-form>
      </v-flex>
    </v-layout>
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
