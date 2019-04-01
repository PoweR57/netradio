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
        <button class="ui button" @click="createPodcast()">Valider</button>
      </div>
    </div>
    <div id="bar">
      <div v-bind:style ="{ width: progress + '%' }" class="prog"></div>
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
    sendPodcast(file, uuid) {
      $.ajax({
        url: "http://" + Config.service.dataBase.URL + "/podcast/file/" + uuid,
        filetype: "audio/mp3",
        cache: false,
        processData: false,
        data: file,
        contentType: false,
        type: "post",
        success: function(php_script_response) {
          alert(php_script_response); // display response from the PHP script, if any
        },
        xhr: function() {
          // get the native XmlHttpRequest object
          var xhr = $.ajaxSettings.xhr();
          // set the onprogress event handler
          xhr.upload.onprogress = function(evt) {
            console.log("progress", (evt.loaded / evt.total) * 100);
            // this.progress = (evt.loaded / evt.total) * 100;
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

.prog{
    float: left;
    padding: 15px;
    background: red;
}
</style>
