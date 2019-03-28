<template>
    <div class="controls">
        <div class="ui cards">
            <div id="interface" class="card">
                <div class="content">
                    <div id="interfaceHeader" class="header">Net'Radio Broadcast</div>
                    <div class="description">
                        <div id="status">
                            <div v-if="broadcast" id="air">
                                <div class="rouge"></div>
                                {{this.live}}
                            </div>
                            <div v-else id="air">
                                <div class="blanc"></div>
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
        <table class="ui celled table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td data-label="Name">James</td>
                    <td class="collapsing">
                        <div class="ui fitted slider checkbox">
                            <input type="checkbox">
                            <label></label>
                        </div>
                        <i class="microphone icon"></i>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
/* eslint-disable */
import ServicePHP from "@/services/ServicePHP";
import Config from "@/config/config";

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
            live: "off air",
            broadcast: false,
            tableOfUserPresent: []
        };
    },
    mounted() {
        socket.on("updateUser", function(table) {
            this.tableOfUserPresent = table;
        });
    },
    created() {
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
        startreccord() {
            if (this.isCalling == true) {
                recorder
                    .start()
                    .then(() => {})
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
                    $("#audio").empty();
                    document.querySelector("#audio").appendChild(player);
                })
                .catch(e => {
                    alert("We could not retrieve your message");
                    console.log(e);
                });
        },

        startPresenter() {
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
            this.live = "on air";
            this.broadcast = true;
        },
        stopPresenter() {
            presenterMedia.stopRecording();
            this.live = "off air";
            this.broadcast = false;
        },
        stopMusic() {
            socket.emit("stop");
        }
    }
};
</script>
<style scoped>
#interface {
    margin-top: 5%;
    margin-bottom: 8%;
    width: 50%;
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
.rouge {
    width: 25px;
    height: 25px;
    border-radius: 50px;
    position: relative;
    animation: rouge 2s ease-in-out infinite;
    margin-right: 2%;
}

.blanc {
    width: 25px;
    height: 25px;
    border-radius: 50px;
    position: relative;
    margin-right: 2%;
    background-color: whitesmoke;
}
.controls{
    width:30% ;
    margin: auto;
    padding-top: 2%
}
@keyframes rouge {
    0% {
        background: white;
    }
    50% {
        background: red;
    }
    100% {
        background: white;
    }
}
</style>