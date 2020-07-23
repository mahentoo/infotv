<template>
  <v-app>
    <v-navigation-drawer permanent expand-on-hover app>
      <v-list nav dense>
        <v-list-item to="/" link>
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>

        <v-list-item to="/signup" link>
          <v-list-item-icon>
            <v-icon>mdi-face</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Cadastrar</v-list-item-title>
        </v-list-item>

        <v-list-item to="/signin" link>
          <v-list-item-icon>
            <v-icon>mdi-lock-open</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Entrar</v-list-item-title>
        </v-list-item>

        <v-list-item @click="logout()" link>
          <v-list-item-icon>
            <v-icon>mdi-power</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Sair</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container class="fill-height" fluid>
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  export default {
    name: 'App',

    methods: {
      logout () {
        window.localStorage.clear();

        this.$router.push('/signin');
      },
    },
  };
</script>
