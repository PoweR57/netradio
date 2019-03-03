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

var socket = io(Config.service.music.URL);
var audioStreamer = null;
var playerStatus = false; // L'utilisateur souhaite écouter la radio (true) ou pas (false)

socket.on("update", function() {
    console.log("update");
    if (playerStatus == true) {
        $("#update").html(
            '<audio id="player" src="http://' +
                Config.service.music.URL +
                '" controls autoplay></audio>'
        );
    }
});
socket.on("stop", function() {
    console.log("stop");
    if (playerStatus == true) {
        var audio = document.getElementById("player");
        audio.setAttribute("src", " "); //change the source
        audio.load(); //change the source
    }
});

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
        this.startStreamer();
    },
    methods: {
        async getPosts() {
            const response = await PostsService.fetchPosts();
            this.posts = response.data;
        },
        startStreamer: function() {
            audioStreamer.playStream();

            // Buffer header must be received first
            socket.on("bufferHeader", function(packet) {
                if (packet.mimeType == null) {
                    console.log(packet);
                    console.log("zzzzzzzzzzzzzzzzzzzzzz", packet.mimeType);
                }
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
                $("#update").html(
                    '<audio id="player" src="http://' +
                        Config.service.music.URL +
                        '" controls autoplay></audio>'
                );
                var audio = document.getElementById("player");
                audio.play();
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
