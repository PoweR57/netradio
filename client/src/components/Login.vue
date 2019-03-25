<template>
  <div>
    <form class="ui form">
      <div class="field">
        <label>Login</label>
        <input v-model="login" type="text" name="email" placeholder="Login">
      </div>
      <div class="field">
        <label>Mot de passe</label>
        <input v-model="mdp" type="text" name="mdp" placeholder="Mot de passe">
      </div>
      <div class="field"></div>
      <button class="ui button" @click="getUserByLogin()">Valider</button>
    </form>
  </div>
</template>

<script>
/* eslint-disable */
import ServicePHP from "@/services/ServicePHP";

export default {
  name: "Login",
  data() {
    return {
      login: "",
      mdp: ""
    };
  },
  methods: {
   async getUserByLogin(){
      const response = await ServicePHP.getUserByLogin(this.login,this.mdp)
      console.log(response);
    }
  },
  computed: {}
};
</script>
<style scoped>
  form{
    width:30% ;
    margin-left: 35%;
    margin-top: 5%;

  }

  label{
    font-size: medium;
  }
</style>
