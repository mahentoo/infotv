<template>
  <v-app>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/signin">Signin</router-link> |
      <router-link to="/signup">Signup</router-link> |
      <logout/>
    </div>

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
