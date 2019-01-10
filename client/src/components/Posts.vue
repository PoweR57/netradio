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
        <button onclick="asPresenter()">Presenter</button>
        <button onclick="asStreamer()">Streamer</button>
        <input type="text" id="debug">
        <br>
        <p>Presenter must be online before the streamer</p>
    </div>
</template>

<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.2.0/socket.io.js"></script>
<script type="text/javascript" src="/dist/SFMediaStream.min.js"></script>
<script>
/* eslint-disable */
import PostsService from "@/services/PostsService";
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
    methods: {
        async getPosts() {
            const response = await PostsService.fetchPosts();
            this.posts = response.data;
        }
    }
};
var mySocket = io("/", { transports: ["websocket"] });

var debug = document.querySelector("#debug");
function asPresenter() {
    // Set latency to 100ms (Equal with streamer)
    var presenterMedia = new ScarletsMediaPresenter(
        {
            audio: {
                channelCount: 1,
                echoCancellation: false
            }
        },
        100
    );

    presenterMedia.onRecordingReady = function(arrayBuffer) {
        console.log("Recording started!");
        console.log("Header size: " + arrayBuffer.byteLength);

        // Every new client streamer must receive this header buffer data
        mySocket.emit("bufferHeader", {
            data: arrayBuffer,
            mimeType: presenterMedia.options.mimeType
        });
    };

    presenterMedia.onBufferProcess = function(streamData) {
        debug.value = "Buffer sent: " + streamData[0].byteLength + "bytes";
        mySocket.emit("stream", streamData);
    };

    presenterMedia.startRecording();
}

var audioStreamer = false;
function asStreamer() {
    // Set latency to 100ms (Equal with presenter)
    audioStreamer = new ScarletsAudioBufferStreamer(3, 100);
    audioStreamer.playStream();

    // Buffer header must be received first
    mySocket.on("bufferHeader", function(packet) {
        audioStreamer.mimeType = packet.mimeType;
        audioStreamer.setBufferHeader(packet.data);
    });

    // Receive buffer and play it
    mySocket.on("stream", function(packet) {
        debug.value = "Buffer received: " + packet[0].byteLength + "bytes";
        audioStreamer.realtimeBufferPlay(packet);
    });

    // Request buffer header
    mySocket.emit("requestBufferHeader", "");
}
</script>