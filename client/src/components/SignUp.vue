<template>
  <div>
    <div class="ui form">
      <div class="field">
        <label>Login</label>
        <input v-model="login" type="text" name="email" placeholder="Login">
      </div>
      <div class="field">
        <label>Nom</label>
        <input v-model="nom" type="text" name="nom" placeholder="Nom">
      </div>
      <div class="field">
        <label>Prénom</label>
        <input v-model="prenom" type="text" name="prenom" placeholder="Prenom">
      </div>
      <div class="field">
        <label>Mot de passe</label>
        <input v-model="mdp" type="text" name="mdp" placeholder="Mot de passe">
      </div>
      <div class="field"></div>
      <button class="ui button" @click="createUser()">Valider</button>
    </div>
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
      mdp: "",
      nom:"",
      prenom: ""
    };
  },
  methods: {
   async createUser(){
      const response = await ServicePHP.createUser(this.login,this.nom,this.prenom,this.mdp);
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
