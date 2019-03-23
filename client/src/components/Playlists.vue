<template>
  <div class="playlists">
    <!-- <button v-on:click="insert">Click to insert</button>
    <input type="text" v-model="namePlaylist" v-on:keyup.enter="insert">
    <div v-if="playlists">
      <div v-for="playlist in playlists" :key="playlist.id">
        <li>
          <button v-on:click="supprimer(playlist.id)">Supp Playlist</button>
          {{playlist.id}} {{playlist.title}} {{playlist.liste_musique}}
        </li>
      </div>
    </div>
    <br>
    <div v-if="musiques">
      <div v-for="musique in musiques" :key="musique.id">
        <li>{{musique.id}} {{musique.titre}} {{musique.album}} {{musique.genre}} {{musique.artist}} {{musique.annee}} {{musique.duree}}</li>
      </div>
    </div>-->
    <div id="left-and-right-component">
      <draggable
        class="list-group"
        group="people"
        draggable=".dragMe"
        v-model="listOfMusicWhoWaitForPlaying"
        @start="isDragging = true"
        @end="isDragging = false"
      >
        <div
          class="list-group-item dragMe"
          v-for="(element,idx) in listOfMusicWhoWaitForPlaying"
          :key="idx"
          @click="removeAt(idx)"
        >{{ element.name }}
        </div>
        <div slot="header">Drag and drop some musics</div>
      </draggable>
    </div>

    <div class="ui styled accordion" id="left-and-right-component">
      <div v-for="(listOfmusic,idl) in listOfPlayerList" :key="idl">
        <div class="title">
          <i class="dropdown icon"></i>
          Draggable {{idl}}
        </div>
        <div class="content">
          <draggable
            class="dragArea list-group"
            :list="listOfmusic"
            :group="{ name: 'people', pull: 'clone', put: false }"
          >
            <div class="list-group-item" v-for="(element,idx) in listOfmusic" :key="idx">{{ element.name }}</div>
          </draggable>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import ServicePHP from "@/services/ServicePHP";
import draggable from "vuedraggable";

$(document).ready(function() {
  $(".ui.accordion").accordion();
});

export default {
  name: "playlists",
  components: {
    draggable
  },
  data() {
    return {
      namePlaylist: "",
      playlists: null,
      musiques: null,
      listOfPlayerList: [
        [
          { name: "dog 1" },
          { name: "dog 2" },
          { name: "dog 3" },
          { name: "dog 4" }
        ],
        [
          { name: "poule 1" },
          { name: "poule 2" },
          { name: "poule 3" },
          { name: "poule 4" }
        ],
        [
          { name: "chat 1" },
          { name: "chat 2" },
          { name: "chat 3" },
          { name: "chat 4" }
        ]
      ],
      listOfMusicWhoWaitForPlaying: [
        { name: "poule 1" },
        { name: "poule 2" },
        { name: "poule 3" },
        { name: "poule 4" }
      ]
    };
  },
  mounted() {
    this.getMusiques();
    this.getPlayLists();
  },
  methods: {
    async getMusiques() {
      const response = await ServicePHP.getMusiques();
      this.musiques = response.data;
    },
    async getPlayLists() {
      const response = await ServicePHP.getPlayLists();
      this.playlists = response.data;
    },
    async insert() {
      await ServicePHP.postPlayLists(this.namePlaylist);
      this.namePlaylist = "";
      this.getPlayLists();
    },
    async supprimer(id) {
      await ServicePHP.deletePlayLists(id);
      this.getPlayLists();
    },
    removeAt(idx) {
      this.listOfMusicWhoWaitForPlaying.splice(idx, 1);
    }
  },
  computed: {
    dragOptions() {
      return {
        animation: 0,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      };
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.list-group {
  min-height: 100px;
  background-color: lightblue;
  border: solid black 2px;
}

.list-group-item {
  cursor: move;
}

.playlists {
  margin-left: 10%;
  margin-right: 10%;
  display: flex;
  justify-content: space-around;
}

#left-and-right-component {
  width: 35%;
}
</style>
