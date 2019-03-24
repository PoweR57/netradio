<template>
  <div class="playlists ui segment">
    <div id="left-component" class="ui segment">
      <h2 id="header" slot="header">Drag and drop some musics</h2>
      <table class="ui striped table">
        <draggable
          group="people"
          draggable=".dragMe"
          tag="tbody"
          v-model="listOfMusicWhoWaitForPlaying"
          @start="isDragging = true"
          @end="isDragging = false"
        >
          <tr
            class="list-group-item dragMe"
            v-for="(element,idx) in listOfMusicWhoWaitForPlaying"
            :key="idx"
          >
            <td id="padding">
              <div class="ui buttons">
                <button class="ui negative button" @click="removeFromArray(idx)">
                  <i class="close icon"></i>
                </button>
                <div class="or" data-text="⏱"></div>
                <button class="ui orange button">{{element.duree}}</button>
                <div class="or" data-text="🎵"></div>
                <button class="ui yellow button">{{element.titre}}</button>
              </div>
            </td>
          </tr>

          <h2 id="header" slot="header">...</h2>
        </draggable>
      </table>
    </div>

    <div class="ui styled accordion" id="right-component">
      <div v-for="(album,idl) in albums" :key="idl">
        <div class="title" @click="downloadMusicByAlbum(idl)">
          <i class="dropdown icon"></i>
          {{album.titre}}
        </div>
        <div class="content">
          <table class="ui striped table">
            <thead>
              <tr>
                <th>Name</th>
              </tr>
            </thead>
            <draggable
              class="dragArea list-group"
              :list="listOfMusic"
              tag="tbody"
              :group="{ name: 'people', pull: 'clone', put: false }"
            >
              <tr class="list-group-item" v-for="(element,idx) in listOfMusic" :key="idx">
                <td>
                  <div class="ui buttons">
                  <button class="ui negative icon button" @click="addToArray(idx)">
                    <i class="arrow left icon"></i>
                    </button>
                    <div class="or" data-text="⏱"></div>
                    <button class="ui orange button">{{element.duree}}</button>
                    <div class="or" data-text="🎵"></div>
                    <button class="ui yellow button">{{element.titre}}</button>
                  </div>
                </td>
              </tr>
            </draggable>
          </table>
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
      albums: null,
      id_album: null,
      listOfMusic: [],
      listOfMusicWhoWaitForPlaying: []
    };
  },
  mounted() {
    this.getAlbums();
  },
  methods: {
    async getAlbums() {
      const response = await ServicePHP.getAlbums();
      this.albums = response.data;
    },
    async downloadMusicByAlbum(id) {
      if (this.id_album !== id) {
        this.id_album = id;
        const response = await ServicePHP.getMusicByAlbum(id + 1);
        this.listOfMusic = response.data;
      }
    },
    removeFromArray(id) {
      this.listOfMusicWhoWaitForPlaying.splice(id, 1);
    },
    addToArray(id) {
      this.listOfMusicWhoWaitForPlaying.push(this.listOfMusic[id]);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
table {
  min-height: 100px;
}

tbody {
  height: 100%;
}

.buttons {
  overflow: hidden;
}

#header {
  padding: 5px;
}

#padding {
  padding: 5px;
}

.list-group-item {
  cursor: move;
}

.playlists {
  margin-left: 10%;
  margin-right: 10%;
  display: flex;
  justify-content: space-around;
  height: 100%;
}

#left-component {
  width: 40%;
  height: 100%;
  overflow: auto;
}

#right-component {
  width: 55%;
  height: 100%;
  overflow: auto;
}
</style>
