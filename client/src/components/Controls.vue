<template>
  <div class="controls">
    <button v-on:click="playMusic('music1.mp3')">Play Music 1</button>
    <button v-on:click="playMusic('music2.mp3')">Play Music 2</button>
    <button v-on:click="playMusic('music3.mp3')">Play Music 3</button>
    <button v-on:click="playMusic('music4.mp3')">Play Music 4</button>
    <button v-on:click="playMusic('music5.mp3')">Play Music 5</button>
    <button v-on:click="playMusic('music6.mp3')">Play Music 6</button>
    <button v-on:click="playMusic('music7.mp3')">Play Music 7</button>
    <button v-on:click="playMusic('music8.mp3')">Play Music 8</button>
    <br>
    <br>
    <button v-on:click="stopMusic()">Stop</button>
  </div>
</template>

<script>
/* eslint-disable */
var socket = null;

export default {
  name: "controls",
  created: function() {
    socket = io("localhost:8081");
  },
  methods: {
    playMusic: function(name) {
      socket.emit("playMusic", name);
    },
    stopMusic: function() {
      socket.emit("stop");
    }
  }
};
</script>