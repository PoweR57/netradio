<template>
  <div class="controls">
    <div class="ui cards">
      <div id="interface" class="card">
        <div class="content">
          <div id="interfaceHeader" class="header">Net'Radio Broadcast</div>
          <div class="description">
            <div id="status" class="ui input focus">
                <div class="noir">
                  <div class="rouge"></div>
                </div>
              <!-- <input id="air" type="text" v-model="live" disabled="disabled"> -->
              <div id="air">{{this.live}}</div>
            </div>
          </div>
        </div>
        <div class="extra content">
          <div class="ui three buttons">
            <button v-on:click="startPresenter()" class="ui basic green button">live</button>
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

var socket = null;
var presenterMedia = null;

export default {
  name: "controls",
  data() {
    return {
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
      this.live = "on air";
    },
    stopPresenter: function() {
      presenterMedia.stopRecording();
      this.live = "off air";
    },
    stopMusic: function() {
      socket.emit("stop");
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
  font-size: 20px;
  color: black;
  margin-left: 2%;
}
#status {
  width: 100%;
}


.noir,
.rouge {
  width: 25px;
  height: 25px;
  border-radius: 50px;
}
.noir {
  background-color: none;
  margin-left: auto;
  margin-right: auto;
  
}
.rouge {
  position: relative;
  animation: rouge 2s infinite;
}
@keyframes rouge {
  from {
    z-index: -1;
    background-color: white;
  }
  50% {
    z-index: 1;
    background-color: red;
  }
  to {
    z-index: -1;
    background-color: white;
  }
}
</style>