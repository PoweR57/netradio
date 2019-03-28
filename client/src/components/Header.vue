
<template>
  <div class="ui large top fixed hidden menu">
    <div class="ui container">
      <a class="item" id="acc" v-on:click="goTo('acceuil')">Acceuil</a>
      <a class="item" id="pla" v-on:click="goTo('planning')">Planning</a>
      <a class="item" id="pod" v-on:click="goTo('podcasts')">Podcasts</a>
      <a class="item" id="pan" v-on:click="goTo('panel')">Panel</a>
      <div class="middle">
        <button v-if ="play==true" id="controls" class="bouton17" v-on:click="playerStart()">
          <img class="resize" src="../assets/play.png">
        </button>
        <button v-else id="controls" class="bouton17" v-on:click="playerStart()">
          <img class="resize" src="../assets/pause.png">
        </button>
      </div>
      <div class="right menu">
        <div class="item">
          <a class="ui button">Log in</a>
        </div>
        <div class="item">
          <a class="ui primary button">Sign Up</a>
        </div>
      </div>
    </div>
    <div class="debug">
      <input type="text" id="debug">
      <div id="update">
        <!-- Conteneur du player audio -->
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import ServiceMusic from "@/services/ServiceMusic";
import Config from "@/config/config";

var audioStreamer = null;
var socket = null;
var playerStatus = false; // L'utilisateur souhaite écouter la radio (true) ou pas (false)

export default {
  name: "posts",
  data() {
    return {
      URL: "http://" + Config.service.music.URL + "/",
      msgButton: "Click for play",
      play: false
    };
  },
  created: function() {
    audioStreamer = new ScarletsAudioBufferStreamer(3, 100);
    socket = io(Config.service.music.URL);
    this.startStreamer();
  },
  methods: {
    goTo(page) {
      switch (page) {
        case "acceuil":
          $("#acc").addClass("active");
          $("#pla").removeClass("active");
          $("#pod").removeClass("active");
          $("#pan").removeClass("active");
          this.$router.push(page);
          break;
        case "planning":
          $("#acc").removeClass("active");
          $("#pla").addClass("active");
          $("#pod").removeClass("active");
          $("#pan").removeClass("active");
          this.$router.push(page);
          break;
        case "podcasts":
          $("#acc").removeClass("active");
          $("#pla").removeClass("active");
          $("#pod").addClass("active");
          $("#pan").removeClass("active");
          this.$router.push(page);
          break;
        case "panel":
          $("#acc").removeClass("active");
          $("#pla").removeClass("active");
          $("#pod").removeClass("active");
          $("#pan").addClass("active");
          this.$router.push(page);
        break;
      }
    },
    displayPlayer() {
      document.getElementById("update").innerHTML =
        '<audio id="player" src="http://' +
        Config.service.music.URL +
        '" controls autoplay></audio>';
    },
    startStreamer() {
      audioStreamer.playStream();

      // Buffer header must be received first
      socket.on("bufferHeader", function(packet) {
        audioStreamer.mimeType = packet.mimeType;
        audioStreamer.setBufferHeader(packet.data);
      });

      // Receive buffer and play it
      socket.on("stream", function(packet) {
        if (playerStatus == true) {
          document.querySelector("#debug").value =
            "Buffer received: " + packet[0].byteLength + "bytes";
          audioStreamer.realtimeBufferPlay(packet);
        }
      });
      // Request buffer header
      socket.emit("requestBufferHeader", "");
    },
    playerStart() {
      if (playerStatus) {
        this.msgButton = "Click for Play";
        $("#update").empty();
        document.querySelector("#debug").value = "";
        this.play=true;
      } else {
        this.msgButton = "Click for Pause";
        this.displayPlayer();
        this.play=false;

        var audio = document.getElementById("player");
        if (audio.currentTime == 0) {
          audio.play();
          
        }

        socket.on("update", function() {
          if (playerStatus == true) {
            var audio = document.getElementById("player");
            audio.src = "http://" + Config.service.music.URL;
            audio.play();
          }
        });

        socket.on("stop", function() {
          if (playerStatus == true) {
            var audio = document.getElementById("player");
            audio.setAttribute("src", " "); //change the source
            audio.load(); //change the source
          }
        });
      }
      playerStatus = !playerStatus;
    }
  }
};
</script>

<style>
/* Console log de la musique */
.debug {
  display: none;
}
.middle {
  margin-left: 20%;
  margin-top: auto;
  margin-bottom: auto;
}
.bouton17 {
  width: 40px;
  height: 40px;
  background: #fafafa;
  box-shadow: 2px 2px 8px #aaa;
  font: bold 13px Arial;
  border-radius: 50%;
  color: #555;
  padding: 0px;
}
.resize {
  width: 25px;
  height: 25px;
  margin: auto;
  margin-left: 3px;
}
</style>
