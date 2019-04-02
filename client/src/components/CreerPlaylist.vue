<template>
    <div class="ui segment content">
        <h2 id="header">Créer une playlist</h2>

        <div class="ui form">
            <div class="field">
                <label>Nom de la playlist</label>
                <input required type="text" v-model="name" name="first-name" placeholder="Nom de la playlist">
            </div>
            <div class="field">
                <label>Description</label>
                <textarea v-model="description" placeholder="Description"></textarea>
            </div>
            <br>
            <button class="ui button" @click="createPlaylist()">Créer la playlist</button>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import ServicePHP from "@/services/ServicePHP";

export default {
    name: "creerplaylist",
    data() {
        return {
            name: "",
            description: ""
        };
    },
    mounted() {

    },
    methods: {
        async createPlaylist() {
            await ServicePHP.postPlaylist(this.name,this.description);
            this.$router.push("editplaylist");
        },
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content {
    margin-left: 10%;
    margin-right: 10%;
    height: 100%;
}

#header {
    text-align: center;
    padding: 5px;
    margin: 0;
}
.form {
    width: 60%;
    margin-left: auto;
    margin-right: auto;
}
</style>