<template>
  <div class="register">
    <form>
      <div>
        <label>E-mail</label>
        <input type="email" name="email" v-model="email" required>
      </div>
      <div>
        <label>Senha</label>
        <input type="password" name="password" v-model="password" required>
      </div>
      <div>
        <label>Confirmar senha</label>
        <input type="password" name="password_confirmation" v-model="password_confirmation" required>
      </div>
      <div>
        <button type="submit">Registrar</button>
      </div>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'Signup',

    data: () => ({
      email: '',
      password: '',
      'password_confirmation': '',
    }),
  };
</script>
