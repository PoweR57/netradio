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
        <button v-on:click="asPresenter()">Presenter</button>
        <button v-on:click="asStreamer()">Streamer</button>
        <input type="text" id="debug"><br>
        Presenter must be online before the streamer
    </div>
</template>

<script type="text/javascript" src="@/static/SFMediaStream.min.js"></script>
<script>
/* eslint-disable */
// import ScarletsMediaPresenter from "@/services/SFMediaStream";
import PostsService from "@/services/PostsService";
import io from 'socket.io-client';

export default {
    name: "posts",
    data() {
        return {
            posts: [],
            socket : io('localhost:8081'),
            mySocket: io("/", {transports:['websocket']}),
            debug: document.querySelector('#debug'),
        };
    },
    mounted() {
        this.getPosts();
    },
    methods: {
        async getPosts() {
            const response = await PostsService.fetchPosts();
            this.posts = response.data;
        },
        asPresenter: function() {
			// Set latency to 100ms (Equal with streamer)
			var presenterMedia = new ScarletsMediaPresenter({
			    audio:{
			        channelCount:1,
			        echoCancellation: false
			    }
			}, 100);

			presenterMedia.onRecordingReady = function(arrayBuffer){
			    console.log("Recording started!");
			    console.log("Header size: " + arrayBuffer.byteLength);

			    // Every new client streamer must receive this header buffer data
			    this.mySocket.emit('bufferHeader', {
			        data:arrayBuffer,
			        mimeType:presenterMedia.options.mimeType
			    });
			}

			presenterMedia.onBufferProcess = function(streamData){
				debug.value = "Buffer sent: "+streamData[0].byteLength+"bytes";
			    this.mySocket.emit('stream', streamData);
			}

			presenterMedia.startRecording();
        },
        asStreamer: function() {
			// Set latency to 100ms (Equal with presenter)
			audioStreamer = new ScarletsAudioBufferStreamer(3, 100);
			audioStreamer.playStream();

			// Buffer header must be received first
			this.mySocket.on('bufferHeader', function(packet){
				audioStreamer.mimeType = packet.mimeType;
			    audioStreamer.setBufferHeader(packet.data);
			});

			// Receive buffer and play it
			this.mySocket.on('stream', function(packet){
				debug.value = "Buffer received: "+packet[0].byteLength+"bytes";
			    audioStreamer.realtimeBufferPlay(packet);
			});

			// Request buffer header
			this.mySocket.emit('requestBufferHeader', '');
        }
    },

};
</script>