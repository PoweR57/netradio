<template>
    <div class="posts">
        <h1>Posts</h1>This file will list all the posts.
        <div v-for="post in posts" :key="post.id">
            <p>
                <span>
                    <b>{{ post.title }}</b>
                </span>
                <br>
                <span>{{ post.description }}</span>
            </p>
        </div>
        <br>
        <div>
            <button id="controls" v-text="msgButton" v-on:click="playerStart()"></button>
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
import PostsService from "@/services/PostsService";
import Config from "@/config/config";

var audioStreamer = null;
var socket = null;
var playerStatus = false; // L'utilisateur souhaite écouter la radio (true) ou pas (false)

export default {
    name: "posts",
    data() {
        return {
            posts: [],
            URL: "http://" + Config.service.music.URL + "/",
            msgButton: "Click for play"
        };
    },
    mounted() {
        this.getPosts();
    },
    created: function() {
        audioStreamer = new ScarletsAudioBufferStreamer(3, 100);
        socket = io(Config.service.music.URL);
        this.startStreamer();
    },
    methods: {
        async getPosts() {
            const response = await PostsService.fetchPosts();
            this.posts = response.data;
        },
        displayPlayer() {
            document.getElementById("update").innerHTML =
                '<audio id="player" src="http://' +
                Config.service.music.URL +
                '" controls autoplay></audio>';
        },
        startStreamer: function() {
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
        playerStart: function() {
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
/* .debug {
    display: none;
} */
</style>
