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

        <router-link to="/signin">Signin</router-link> |
        <router-link to="/signup">Signup</router-link> |
        <logout/>
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <v-container class="fill-height" fluid>
        <router-view/>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  // @ is an alias to /src
  import Logout from '@/components/Logout.vue'

  export default {
    name: 'App',
    components: {
      Logout,
    },
  };
</script>
