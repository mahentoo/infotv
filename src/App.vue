<template>
  <v-app>
    <v-navigation-drawer permanent expand-on-hover app>
      <v-list v-if="currentUser">
        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="title">{{ currentUser.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ currentUser.email }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list nav dense>
        <v-list-item to="/main" link>
          <v-list-item-icon>
            <v-icon>mdi-video</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Vídeos</v-list-item-title>
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

    <v-app-bar dark app>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">
          InfoTV - Front-end Developer Test
        </router-link>
      </v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container class="fill-height" fluid>
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Bus from '@/bus';

export default {
  name: 'App',

  created() {
    Bus.$on('currentUserUpdated', () => this.reloadCurrentUser());
  },

  data: () => ({
    currentUser: JSON.parse(localStorage.getItem('user')),
  }),

  methods: {
    reloadCurrentUser() {
      this.currentUser = JSON.parse(localStorage.getItem('user'));
    },

    logout() {
      localStorage.clear();

      Bus.$emit('currentUserUpdated');
    },
  },
};
</script>
