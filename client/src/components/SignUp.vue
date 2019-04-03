<template>
    <div>
        <form class="ui form" v-on:submit.prevent="createUser()">
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
            <button class="ui button">Valider</button>
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
            mdp: "",
            nom: "",
            prenom: ""
        };
    },
    methods: {
        async createUser() {
            const response = await ServicePHP.createUser(
                this.login,
                this.nom,
                this.prenom,
                this.mdp
            );
            if (response.data == "") {
                this.$router.push("login");
            } else {
                alert('Cet email existe déjà')
            }
        }
    },
    computed: {}
};
</script>
<style scoped>
form {
    width: 30%;
    margin: auto;
    padding-top: 2%;
}

label {
    font-size: medium;
}
</style>
