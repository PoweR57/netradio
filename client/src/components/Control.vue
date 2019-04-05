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
              <div id="audioSave"></div>
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
          <th>Speak or Not</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(man,id) in tableOfUserPresent" :key="id">
          <td data-label="Name">{{man.name}}</td>
          <!-- <td data-label="Name">{{man.listen}}</td> -->
          <td >
            <div class="ui fitted slider checkbox">
              <input v-if="man.listen" type="checkbox" @click="changeVoice(id)" checked>
              <input v-else type="checkbox" @click="changeVoice(id)">
              <label></label>
            </div>
            <i v-if="man.listen" class="microphone icon"></i>
            <i v-else class="microphone slash icon"></i>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
/* eslint-disable */
import ServicePHP from "@/services/ServicePHP";
import ServiceMusic from "@/services/ServiceMusic";
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
      live: "off air",
      broadcast: false,
      tableOfUserPresent: [],
      invite: false
    };
  },
  mounted() {
    var getClass = this;
    socket.on("updateUser", function(table) {
      getClass.change(table);
    });
  },
  created() {
    if(sessionStorage.role === "animateur"){
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
    this.getInvite();
  }},
  methods: {
    change(table) {
      var getClass = this;
      this.tableOfUserPresent = [];
      table.forEach(element => {
        element.listen = false;
        getClass.tableOfUserPresent.push(element);
      });
    },
    async getInvite() {
      const response = await ServiceMusic.getInvites();
      this.tableOfUserPresent = response.data.invites;
    },
    changeVoice(id) {
      this.tableOfUserPresent[id].listen = !this.tableOfUserPresent[id].listen;
      if (this.tableOfUserPresent[id].listen) {
      }
      socket.emit("CutUserVoice", this.tableOfUserPresent[id].user_id);
    },
    startreccord() {
      recorder
        .start()
        .then(() => {})
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
          $("#audioSave").empty();
          document.querySelector("#audioSave").appendChild(player);
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
      this.startreccord();
      this.live = "on air";
      this.broadcast = true;
    },
    stopPresenter() {
      presenterMedia.stopRecording();
      this.stopreccord();
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

#audioSave{
  text-align: center;
  padding-top: 2%;
}
</style>