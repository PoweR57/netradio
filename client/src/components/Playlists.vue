<template>
  <div class="playlists">
    <div v-if="posts">
      <h1>{{posts.title}}</h1>
      <h1>{{posts.description}}</h1>
    </div>
    <button v-on:click="insert">Click to insert</button>
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
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import ServicePHP from "@/services/ServicePHP";

export default {
  name: "playlists",
  data() {
    return {
      namePlaylist: "",
      posts: null,
      playlists: null,
      musiques: null
    };
  },
  mounted() {
    this.getPosts();
    this.getMusiques();
    this.getPlayLists();
  },
  methods: {
    async getPosts() {
      const response = await ServicePHP.fetchPosts();
      this.posts = response.data;
    },
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
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
