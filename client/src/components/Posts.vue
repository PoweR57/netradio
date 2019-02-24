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
        <button v-on:click="stopStreamer()">Streamer Stop</button>
        <input type="text" id="debug">
        <br><br>
        <button v-on:click="playMusic('music1.mp3')">Play Music 1</button>
        <button v-on:click="playMusic('music2.mp3')">Play Music 2</button>
        <button v-on:click="playMusic('music3.mp3')">Play Music 3</button>
        <button v-on:click="playMusic('music4.mp3')">Play Music 4 </button>
        <button v-on:click="playMusic('music5.mp3')">Play Music 5 </button>
        <button v-on:click="playMusic('music6.mp3')">Play Music 6 </button>
        <button v-on:click="playMusic('music7.mp3')">Play Music 7 </button>
        <button v-on:click="playMusic('music8.mp3')">Play Music 8 </button>
        <br><br>
        <div id="update">
            <!-- <embed src="http://localhost:8081/" loop="false" autostart="true" hidden="false"> -->
            <audio src="http://localhost:8081/" controls autoplay></audio>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import PostsService from "@/services/PostsService";
// var socket = io("/posts", { transports: ["websocket"] });
var socket = null;
var presenterMedia = null;
var audioStreamer = null;

export default {
    name: "posts",
    data() {
        return {
            posts: []
        };
    },
    mounted() {
        this.getPosts();
    },
    created: function() {
        socket = io("localhost:8081");
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
        },
        stopStreamer: function() {
            audioStreamer.pause();
        },
        playMusic: function(name) {
            socket.on("update", function() {
                $("#update").html('<audio src="http://localhost:8081/" controls autoplay></audio>');
            });
            socket.emit("playMusic", name);

        }

    }
};
</script>