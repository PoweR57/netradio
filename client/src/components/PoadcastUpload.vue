<template>
    <div>
        <form class="ui form">
            <div class="field">
                <label>Titre</label>
                <input v-model="titre" type="text" name="titre" placeholder="Titre" required>
            </div>
            <div class="field">
                <label>Description</label>
                <input v-model="descr" type="text" name="descr" placeholder="Description" required>
            </div>
            <div class="field">
                <div>
                    <label for="file" class="ui icon button">
                        <i class="file icon"></i>
                        Insérer le fichier
                    </label>
                    <input ref="myFile" type="file" id="file" style="display:none">
                </div>
            </div>
            <button class="ui button" @click="createPoadcast()">Valider</button>
        </form>
    </div>
</template>

<script>
/* eslint-disable */
import ServicePHP from "@/services/ServicePHP";

export default {
    name: "poadcastupload",
    data() {
        return {
            titre: "",
            descr: ""
        };
    },
    methods: {
        async createPoadcast() {
            // await ServicePHP.createPoadcast(this.titre, this.descr);

            var file_data = document.querySelector("#file").files[0];
            var form_data = new FormData();
            form_data.append("file", file_data);
            const response = await ServicePHP.sendPoadcast(form_data);
        }
    },
    computed: {}
};
</script>
<style scoped>
form {
    width: 30%;
    margin-left: auto;
    margin-right: auto;
}

label {
    font-size: medium;
}
</style>
