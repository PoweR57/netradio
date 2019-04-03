<template>
  <div>
    <div id="sign" class="ui form">
      <div class="field">
        <label>Email</label>
        <input v-model="login" type="email" name="email" placeholder="Email" required>
      </div>
      <div class="field">
        <label>Nom</label>
        <input v-model="nom" type="text" name="nom" placeholder="Nom" required>
      </div>
      <div class="field">
        <label>Prénom</label>
        <input v-model="prenom" type="text" name="prenom" placeholder="Prenom" required>
      </div>
      <div class="field">
        <label>Mot de passe</label>
        <input v-model="mdp" type="password" name="mdp" placeholder="Mot de passe" required>
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
      nom: "",
      prenom: ""
    };
  },
  methods: {
    async createUser() {
      if (
        this.login != "" &&
        this.nom != "" &&
        this.mdp != "" &&
        this.prenom != ""
      ) {
        if (this.ValidateEmail(this.login)) {
          const response = await ServicePHP.createUser(
            this.login,
            this.nom,
            this.prenom,
            this.mdp
          );
          this.$router.push("login");
        }
      }
    },
    ValidateEmail(mail) {
      if (/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(mail)) {
        return true;
      }
      alert("You have entered an invalid email address!");
      return false;
    }
  },
  computed: {}
};
</script>
<style scoped>
#sign {
  width: 30%;
  margin: auto;
  padding-top: 2%;
}

label {
  font-size: medium;
}
</style>
