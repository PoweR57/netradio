<template>
  <div>
    <div class="field">
      <label>Login</label>
      <input v-model="login" type="text" name="first-name" placeholder="Login">
    </div>
    <div class="field">
      <label>Mot de passe</label>
      <input type="text" name="last-name" placeholder="Mot de passe">
    </div>
    <div class="field"></div>
    <button class="ui button" @click="getUserByLogin('wasp57800@gmail.com','mdp')">Valider</button>
  </div>
</template>

<script>
/* eslint-disable */
import ServicePHP from "@/services/ServicePHP";

export default {
  data() {
    return {
      login: "",
      mdp: ""
    };
  },
  methods: {
    async getUserByLogin(login, mdp) {
      const response = await ServicePHP.getUserByLogin(login, mdp);
      console.log(response);
    }
  },
  computed: {}
};
</script>
<style scoped>
form {
  width: 30%;
  margin-left: 35%;
}
</style>
