<template>
  <v-app>
    <v-navigation-drawer permanent expand-on-hover app>
      <v-list v-if="currentUser.email">
        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="title">{{ currentUser.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ currentUser.email }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

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

    data: () => ({
      currentUser: {
        name: localStorage.getItem('user.name'),
        email: localStorage.getItem('user.email'),
      },
    }),

    methods: {
      logout () {
        window.localStorage.clear();

        this.$router.push('/signin');
      },
    },
  };
</script>
