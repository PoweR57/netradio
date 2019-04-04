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
                <div v-if="endUpload" id="bar">
                    <div v-bind:style="{ width: progress + '%' }" class="prog"></div>
                </div>
                <audio id="audio_2"></audio>
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import ServicePHP from "@/services/ServicePHP";
import Config from "@/config/config";

export default {
    name: "podcastupload",
    data() {
        return {
            titre: "",
            descr: "",
            upload: false,
            progress: 0,
            endUpload: false
        };
    },
    methods: {
        async createPodcast() {
            var getClass = this;
            var uuid = this.guid();
            var file_data = document.querySelector("#file").files[0];

            var objectUrl;

            $("#audio_2").on("canplaythrough", async function(e) {
                var seconds = e.currentTarget.duration;
                var seconde = Math.round(seconds % 60)
                if (seconde < 10) {
                    seconde = "0"+seconde
                }
                var temps = Math.round(seconds / 60) + ":" + seconde;
                ServicePHP.createPodcast(getClass.titre,getClass.descr,uuid,temps);
                var form_data = new FormData();
                form_data.append("file", file_data);
                const response = await getClass.sendPodcast(form_data, uuid);
            });
            var objectUrl = URL.createObjectURL(file_data);
            $("#audio_2").prop("src", objectUrl);
        },
        guid() {
            return (
                this.s4() +
                this.s4() +
                "-" +
                this.s4() +
                "-" +
                this.s4() +
                "-" +
                this.s4() +
                "-" +
                this.s4() +
                this.s4() +
                this.s4()
            );
        },
        s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        },
        async sendPodcast(file, uuid) {
            let that = this;
            $.ajax({
                url:
                    "http://" +
                    Config.service.dataBase.URL +
                    "/podcast/file/" +
                    uuid,
                filetype: "audio/mp3",
                cache: false,
                processData: false,
                data: file,
                contentType: false,
                type: "post",
                success: function(php_script_response) {
                    alert("Upload effectuée avec succès"+ php_script_response); // display response from the PHP script, if any
                },
                xhr: function() {
                    // get the native XmlHttpRequest object
                    var xhr = $.ajaxSettings.xhr();
                    // set the onprogress event handler
                    xhr.upload.onprogress = function(evt) {
                        that.endUpload = true;
                        that.progress = (evt.loaded / evt.total) * 100;
                        if (that.progress === 100) {
                            that.endUpload = false;
                            that.progress = 0;
                        }
                    };
                    return xhr;
                }
            });
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

#bar {
    width: 100%;
    background: #dfdfdf;
    overflow: hidden;
}

.prog {
    float: left;
    padding: 15px;
    background: red;
}

#audio_2 {
    display: none;
}
</style>
