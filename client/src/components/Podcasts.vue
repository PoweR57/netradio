<template>
    <div class="controls">
        <button v-on:click="startPresenter()">Animateur Start</button>
        <button v-on:click="stopPresenter()">Animateur Stop</button>
        <input type="text" id="debug">
        <button v-on:click="stopMusic()">Stop</button>
    </div>
</template>

<script>
/* eslint-disable */
import ServicePHP from "@/services/ServicePHP";
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
        stopMusic: function() {
            socket.emit("stop");
        }
    }
};
</script>