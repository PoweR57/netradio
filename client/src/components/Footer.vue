<template>
  <div id="foot" class="ui inverted vertical footer segment">
    <div class="ui container">
      <div class="ui stackable inverted divided equal height stackable grid">
        <div id="middleFlex" class="wide column">
          <div class="circle">
            <button id="listen" v-on:click="drive()" class="playButton"></button>
          </div>
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
    name: "appFooter",
    data() {
        return {
            play: false,
            URL: "http://" + Config.service.music.URL + "/",
            msgButton: "Click for play"
        };
    },
    created() {
        audioStreamer = new ScarletsAudioBufferStreamer(3, 100);
        socket = io(Config.service.music.URL);
        this.startStreamer();
    },
    methods: {
        drive() {
            if (!this.play) {
                $("#listen").addClass("pause");
                this.playerStart();
                this.play = true;
            } else {
                $("#listen").removeClass("pause");
                this.playerStart();
                this.play = false;
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
            } else {
                this.msgButton = "Click for Pause";
                this.displayPlayer();

                var audio = document.getElementById("player");
                if (audio.currentTime == 0) {
                    audio.play();
                }

                socket.on("update", function() {
                    console.log("update");
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
#foot {
    /* Increased specificity for SO snippet priority */
    position: fixed;
    text-align: center;
    width: 100%;
    bottom: 0;
    background-image: url("../assets/bckgrnd.jpg");
    border-top: 2px solid black;
    height: 100px;
    z-index: 101;
}
#middleFlex {
    display: flex;
    justify-content: center;
    align-items: center;
}
.playButton:focus {
    outline: none;
}
.circle {
    border: 4px solid white;
    border-radius: 70px;
    padding: 3px;
    width: 60px;
    height: 60px;
}
.playButton {
    margin-left: 11px;
    margin-top: 4px;
    box-sizing: border-box;
    height: 37px;
    width: 37px;
    border-color: transparent transparent transparent white;
    transition: 100ms all ease;
    will-change: border-width;
    cursor: pointer;
    border-style: solid;
    border-width: 18px 0 18px 30px;
    background: transparent;
}
.pause {
    border-style: double;
    border-width: 0px 0 0px 24px;
}
.debug {
    display: none;
}
</style>
