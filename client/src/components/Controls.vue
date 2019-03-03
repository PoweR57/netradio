<template>
    <div class="controls">
        <button v-on:click="startPresenter()">Animateur Start</button>
        <button v-on:click="stopPresenter()">Animateur Stop</button>
        <input type="text" id="debug">
        <br>
        <br>
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
import Config from "@/config/config";

var socket = null;
var presenterMedia = null;

export default {
    name: "controls",
    created: function() {
        socket = io(Config.service.music.URL);
        presenterMedia = new ScarletsMediaPresenter(
            {
                audio: {
                    channelCount: 1,
                    echoCancellation: false
                }
            },
            100
        );
    },
    methods: {
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
        playMusic: function(name) {
            socket.emit("playMusic", name);
        },
        stopMusic: function() {
            socket.emit("stop");
        }
    }
};
</script>