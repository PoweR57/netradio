<template>
    <div class="controls">
        <button v-on:click="startPresenter()">Animateur Start</button>
        <button v-on:click="stopPresenter()">Animateur Stop</button>
        <input type="text" id="debug">
        <br>
        <button v-on:click="startreccord()">Reccord Start</button>
        <button v-on:click="stopreccord()">Reccord Stop</button>
        <br>
        <button v-on:click="stopMusic()">Stop Music In Radio</button>
        <div id="audio"></div>
    </div>
</template>

<script>
/* eslint-disable */
import ServicePHP from "@/services/ServicePHP";
import Config from "@/config/config";

var fs = require("fs");
const MicRecorder = require("mic-recorder-to-mp3");
const recorder = new MicRecorder({
    bitRate: 128
});

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
        },
        startreccord() {
            recorder
                .start()
                .then(() => {

                })
                .catch(e => {
                    console.error(e);
                });
        },
        stopreccord() {
            recorder
                .stop()
                .getMp3()
                .then(([buffer, blob]) => {
                    const file = new File(buffer, "myFile.mp3", {
                        type: blob.type,
                        lastModified: Date.now()
                    });
                    const player = new Audio(URL.createObjectURL(file));
                    player.controls = true;
                    $('#audio').empty();
                    document.querySelector("#audio").appendChild(player);
                })
                .catch(e => {
                    alert("We could not retrieve your message");
                    console.log(e);
                });
        }
    }
};
</script>