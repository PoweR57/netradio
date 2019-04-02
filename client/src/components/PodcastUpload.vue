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
            var uuid = "qfsfsdfsdmfk,ms";
            await ServicePHP.createPodcast(this.titre, this.descr, uuid);
            var file_data = document.querySelector("#file").files[0];
            var form_data = new FormData();
            form_data.append("file", file_data);
            const response = this.sendPodcast(form_data, uuid);
        },
        methods: {
            async createPodcast() {
                var getClass = this;
                var uuid = this.guid();
                var file_data = document.querySelector("#file").files[0];

                var objectUrl;

                $("#audio_2").on("canplaythrough", async function(e) {
                    var seconds = e.currentTarget.duration;
                    var temps =
                        Math.round(seconds / 60) +
                        ":" +
                        Math.round(seconds % 60);
                    ServicePHP.createPodcast(
                        getClass.titre,
                        getClass.descr,
                        uuid,
                        temps
                    );
                    var form_data = new FormData();
                    form_data.append("file", file_data);
                    const response = await ServicePHP.sendPodcast(
                        form_data,
                        uuid
                    );
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
            sendPodcast(file, uuid) {
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
                        alert(php_script_response); // display response from the PHP script, if any
                        console.log("test");
                    },
                    xhr: function() {
                        // get the native XmlHttpRequest object
                        var xhr = $.ajaxSettings.xhr();
                        // set the onprogress event handler
                        xhr.upload.onprogress = function(evt) {
                            that.endUpload = true;
                            console.log(
                                "progress",
                                (evt.loaded / evt.total) * 100
                            );
                            that.progress = (evt.loaded / evt.total) * 100;
                            if (that.progress === 100) {
                                that.endUpload = false;
                                that.progress = 0;
                            }
                        };
                        // set the onload event handler
                        xhr.upload.onload = function() {
                            console.log("DONE!");
                        };
                        // return the customized object
                        return xhr;
                    }
                });
            }
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
