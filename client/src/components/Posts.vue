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
        <button v-on:click="startPresenter()">Animateur Start</button>
        <button v-on:click="stopPresenter()">Animateur Stop</button>
        <button v-on:click="startStreamer()">Streamer Start</button>
        <input type="text" id="debug">
        <br>
        <br>
        <div id="update">
            <audio id="player" v-bind:src="URL" controls autoplay></audio>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import PostsService from "@/services/PostsService";
import Config from "@/config/config";

var socket = io(Config.service.music.URL);
var presenterMedia = null;
var audioStreamer = null;

socket.on("update", function() {
    $("#update").html(
        '<audio id="player" src="' +
            Config.service.music.URL +
            '" controls autoplay></audio>'
    );
    console.log("play only one");
});

socket.on("stop", function() {
    console.log("stop");
    var music = document.getElementById("player");
    music.setAttribute("src", ""); //change the source
    music.load(); //change the source
});

export default {
    name: "posts",
    data() {
        return {
            posts: [],
            URL: "http://" + Config.service.music.URL + "/"
        };
    },
    mounted() {
        this.getPosts();
    },
    created: function() {
        presenterMedia = new ScarletsMediaPresenter(
            {
                audio: {
                    channelCount: 1,
                    echoCancellation: false
                }
            },
            100
        );
        audioStreamer = new ScarletsAudioBufferStreamer(3, 100);
    },
    methods: {
        async getPosts() {
            const response = await PostsService.fetchPosts();
            this.posts = response.data;
        },
        startPresenter: function() {
            // Set latency to 100ms (Equal with streamer)

            presenterMedia.onRecordingReady = function(arrayBuffer) {
                console.log("Recording started!");
                console.log("Header size: " + arrayBuffer.byteLength);

                // Every new client streamer must receive this header buffer data
                socket.emit("bufferHeader", {
                    data: arrayBuffer,
                    mimeType: presenterMedia.options.mimeType
                });
            };

            presenterMedia.onBufferProcess = function(streamData) {
                document.querySelector("#debug").value =
                    "Buffer sent: " + streamData[0].byteLength + "bytes";
                socket.emit("stream", streamData);
            };

            presenterMedia.startRecording();
        },
        stopPresenter: function() {
            presenterMedia.stopRecording();
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
                document.querySelector("#debug").value =
                    "Buffer received: " + packet[0].byteLength + "bytes";
                audioStreamer.realtimeBufferPlay(packet);
            });

            // Request buffer header
            socket.emit("requestBufferHeader", "");
        }
    }
};
</script>