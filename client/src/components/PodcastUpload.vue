<template>
    <div>
        <div class="ui form">
            <div class="field">
                <label>Titre</label>
                <input v-model="titre" type="text" name="titre" placeholder="Titre" required>
            </div>
            <div class="field">
                <label>Description</label>
                <input v-model="descr" type="text" name="descr" placeholder="Description" required>
            </div>
            <div class="field">
                <label for="file" class="ui icon button">
                    <i class="file icon"></i>
                    Insérer le fichier
                </label>
                <input ref="myFile" type="file" id="file" style="display:none">
                <button class="ui button" @click="createPodcast()">Valider</button>
            </div>
        </div>
        <audio id="audio_2"></audio>
    </div>
</template>

<script>
/* eslint-disable */
import ServicePHP from "@/services/ServicePHP";

export default {
    name: "podcastupload",
    data() {
        return {
            titre: "",
            descr: ""
        };
    },
    methods: {
        async createPodcast() {
            var getClass = this
            var uuid = "qfsfsdfsdmfk,ms";
            var file_data = document.querySelector("#file").files[0];

            var objectUrl;

            $("#audio_2").on("canplaythrough", async function(e) {
                var seconds = e.currentTarget.duration;
                var temps = Math.round(seconds / 60) + ":" + Math.round(seconds % 60);
                ServicePHP.createPodcast(getClass.titre, getClass.descr, uuid, temps);
                var form_data = new FormData();
                form_data.append("file", file_data);
                const response = await ServicePHP.sendPodcast(form_data, uuid);
            });
            var objectUrl = URL.createObjectURL(file_data);
            $("#audio_2").prop("src", objectUrl);
        }
    },
    computed: {}
};
</script>
<style scoped>
.form {
    width: 30%;
    margin-left: auto;
    margin-right: auto;
}

label {
    font-size: medium;
}

#audio_2 {
    display: none;
}
</style>
