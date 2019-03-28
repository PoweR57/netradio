<template>
    <div id="foot" class="ui inverted vertical footer segment">
        <div class="ui container">
            <div class="ui stackable inverted divided equal height stackable grid">
                <div class="two wide column">
                    <h4 class="ui inverted header">About</h4>
                    <div class="ui inverted link list">
                        <a href="#" class="item">Sitemap</a>
                        <a href="#" class="item">Contact Us</a>
                    </div>
                </div>
                <div class="two wide column">
                    <h4 class="ui inverted header">Services</h4>
                    <div class="ui inverted link list">
                        <a href="#" class="item">Banana Pre-Order</a>
                        <a href="#" class="item">DNA FAQ</a>
                    </div>
                </div>
                <div class="eight wide column">
                    <button
                        v-if="play==true"
                        id="controls"
                        class="bouton17"
                        v-on:click="playerStart()"
                    >
                        <img class="resize" src="../assets/play.png">
                    </button>
                    <button v-else id="controls" class="bouton17" v-on:click="playerStart()">
                        <img class="resize" src="../assets/pause.png">
                    </button>
                </div>
                <div class="four wide column">
                    <h4 class="ui inverted header">Footer Header</h4>
                    <p>Extra space for a call to action inside the footer that could help re-engage users.</p>
                </div>
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
    name: "foo",
    data() {
        return {
            URL: "http://" + Config.service.music.URL + "/",
            msgButton: "Click for play",
            play: false
        };
    },
    created() {
        audioStreamer = new ScarletsAudioBufferStreamer(3, 100);
        socket = io(Config.service.music.URL);
        this.startStreamer();
    },
    methods: {
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
                this.play = true;
            } else {
                this.msgButton = "Click for Pause";
                this.displayPlayer();
                this.play = false;

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
#foot {
    /* Increased specificity for SO snippet priority */
    position: fixed;
    text-align: center;
    width: 100%;
    bottom: 0;
    background-image: url("../bckgrnd.jpg");
    border-top: 2px solid black;
    height: 100px;
    z-index: 101;
}
.pause {
    width: 74px;
    height: 74px;
    border-style: solid;
    border-width: 37px;
    border-color: white;
    border-style: double;
    border-width: 0px 0px 0px 37px;
    background: transparent;
}
</style>
