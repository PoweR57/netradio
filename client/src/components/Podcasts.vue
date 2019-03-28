<template>
    <div class="controls">
        <div class="ui cards">
            <div id="interface" class="card">
                <div class="content">
                    <div id="interfaceHeader" class="header">Net'Radio Broadcast</div>
                    <div class="description">
                        <div id="status">
                            <div id="air">
                                <div class="rouge"></div>
                                {{this.live}}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="extra content">
                    <div class="ui three buttons">
                        <button class="ui basic green button" v-on:click="startPresenter()">live</button>
                        <button class="ui basic red button" v-on:click="stopPresenter()">stop</button>
                        <button class="ui basic red button" v-on:click="stopMusic()">stop music</button>
                    </div>
                </div>
            </div>
        </div>
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
    data() {
        return {
            isCalling: false,
            live: "off air"
        };
    },
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
        startPresenter(){
            // Set latency to 100ms (Equal with streamer)
            this.isCalling = true;
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
            this.live = "on air";
        },
        stopPresenter(){
            this.isCalling = false;
            presenterMedia.stopRecording();
            this.live = "off air";
        },
        stopMusic(){
            socket.emit("stop");
        },
        startreccord() {
            if (this.isCalling == true) {
                recorder
                    .start()
                    .then(() => {
    
                    })
                    .catch(e => {
                        console.error(e);
                    });
            }
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
<style scoped>
#interface {
    width: 60%;
    margin-left: auto;
    margin-right: auto;
}

#interfaceHeader {
    text-align: center;
}

#air {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    color: black;
    margin-left: 2%;
    vertical-align: center;
}

#status {
    width: 100%;
    text-align: center;
}

.rouge {
    width: 25px;
    height: 25px;
    border-radius: 50px;
    position: relative;
    animation: rouge 2s ease-in-out infinite;
}

@keyframes rouge {
    0% {
        background:white;
    }
    50% {
        background:red ;
    }
    100% {
        background:white ;
    }
}
</style>