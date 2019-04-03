<template>
    <div class="playlists ui segment">
        <div id="left-component" class="ui segment">
            <div style="display: flex; justify-content: space-around;" slot="header">
                <h2 id="header">Musiques en attente d'être jouées</h2>
                <input id = "temps" class="ui orange button" v-model="timeSTr" disabled="disabled" />
                <button class="ui yellow button" @click="RandomInArray()">
                    <i class="random icon"></i>
                </button>
            </div>
            <table class="ui striped table">
                <draggable
                    group="people"
                    draggable=".dragMe"
                    tag="tbody"
                    v-model="listOfMusicWhoWaitForPlaying"
                    @start="isDragging = true"
                    @end="isDragging = false"
                    @change="sendNewList()"
                >
                    <tr
                        class="list-group-item dragMe"
                        v-for="(element,idx) in listOfMusicWhoWaitForPlaying"
                        :key="idx"
                    >
                        <td id="padding">
                            <div class="ui buttons">
                                <button class="ui negative button" @click="removeFromArray(idx)">
                                    <i class="close icon"></i>
                                </button>
                                <div class="or" data-text="⏱"></div>
                                <button class="ui orange button">{{element.duree}}</button>
                                <div v-if="element.artist != null" class="or" data-text="🎵"></div>
                                <div v-else class="or" data-text="🎤"></div>
                                <button
                                    v-if="element.artist != null"
                                    class="ui yellow button"
                                >{{element.titre}}</button>
                                <button v-else class="ui blue button">{{element.titre}}</button>
                            </div>
                        </td>
                    </tr>
                    
                    <h2 id="header" slot="header">
                        <div class="ui buttons" v-if="MusicRuning && MusicRuning.length != 0">
                            <button class="ui positive button">
                                <i class="play icon"></i>
                            </button>
                            <div class="or" data-text="⏱"></div>
                            <button class="ui orange button">{{MusicRuning.duree}}</button>
                            <div v-if="MusicRuning.artist != null" class="or" data-text="🎵"></div>
                            <div v-else class="or" data-text="🎤"></div>
                            <button
                                v-if="MusicRuning.artist != null"
                                class="ui yellow button"
                            >{{MusicRuning.titre}}</button>
                            <button v-else class="ui blue button">{{MusicRuning.titre}}</button>
                            
                        </div>
                        <div v-else>...</div>
                    </h2>
                </draggable>
            </table>
        </div>
        <div class="ui styled accordion segment" id="right-component" v-if="filter == 'album'">
            <div style="margin-bottom: 14px; text-align: center;" slot="header">
                <div class="ui yellow floating labeled icon dropdown button">
                    <i class="filter icon"></i>
                    <span class="text" id="header">Albums</span>
                    <div class="menu">
                        <div class="header">
                            <i class="tags icon"></i>
                            Select your tag
                        </div>
                        <div class="divider"></div>
                        <div class="item" @click="changeFilter('album')">
                            <i class="user outline icon"></i>
                            Albums
                        </div>
                        <div class="item" @click="changeFilter('playlist')">
                            <i class="folder icon"></i>
                            Playlist
                        </div>
                        <div class="item" @click="changeFilter('podcast')">
                            <i class="microphone icon"></i>
                            Podcast
                        </div>
                    </div>
                </div>
            </div>
            <div v-for="(album,idl) in albums" :key="idl">
                <div class="title" @click="downloadMusicByAlbum(idl)" :href="'#'+album.titre">
                    <i class="dropdown icon"></i>
                    {{album.titre}}
                </div>
                <div class="content" :id="album.titre">
                    <table class="ui striped table">
                        <thead>
                            <tr>
                                <th>Name</th>
                            </tr>
                        </thead>
                        <draggable
                            class="dragArea list-group"
                            :list="listOfMusic"
                            tag="tbody"
                            :group="{ name: 'people', pull: 'clone', put: false }"
                        >
                            <tr
                                class="list-group-item"
                                v-for="(element,idx) in listOfMusic"
                                :key="idx"
                            >
                                <td>
                                    <div class="ui buttons">
                                        <button
                                            class="ui negative icon button"
                                            @click="addToArray(idx)"
                                        >
                                            <i class="arrow left icon"></i>
                                        </button>
                                        <div class="or" data-text="⏱"></div>
                                        <button class="ui orange button">{{element.duree}}</button>
                                        <div class="or" data-text="🎵"></div>
                                        <button class="ui yellow button">{{element.titre}}</button>
                                    </div>
                                </td>
                            </tr>
                        </draggable>
                    </table>
                </div>
            </div>
        </div>
        <div
            class="ui styled accordion segment"
            id="right-component"
            v-else-if="filter == 'podcast'"
        >
            <div style="margin-bottom: 14px; text-align: center;" slot="header">
                <div class="ui yellow floating labeled icon dropdown button">
                    <i class="filter icon"></i>
                    <span class="text" id="header">Albums</span>
                    <div class="menu">
                        <div class="header">
                            <i class="tags icon"></i>
                            Select your tag
                        </div>
                        <div class="divider"></div>
                        <div class="item" @click="changeFilter('album')">
                            <i class="user outline icon"></i>
                            Albums
                        </div>
                        <div class="item" @click="changeFilter('playlist')">
                            <i class="folder icon"></i>
                            Playlist
                        </div>
                        <div class="item" @click="changeFilter('podcast')">
                            <i class="microphone icon"></i>
                            Podcast
                        </div>
                    </div>
                </div>
            </div>
            <table class="ui striped table">
                <draggable
                    class="dragArea list-group"
                    tag="tbody"
                    v-model="podcasts"
                    @start="isDragging = true"
                    @end="isDragging = false"
                    :group="{ name: 'people', pull: 'clone', put: false }"
                >
                    <tr class="list-group-item" v-for="(element,idx) in podcasts" :key="idx">
                        <td id="padding">
                            <div class="ui buttons">
                                <button
                                    class="ui negative button"
                                    @click="addToArrayElement(element)"
                                >
                                    <i class="arrow left icon"></i>
                                </button>
                                <div class="or" data-text="⏱"></div>
                                <button class="ui orange button">{{element.duree}}</button>
                                <div class="or" data-text="🎤"></div>
                                <button class="ui blue button">{{element.titre}}</button>
                            </div>
                        </td>
                    </tr>
                </draggable>
            </table>
        </div>
        <div class="ui styled accordion segment" id="right-component" v-else>
            <div style="margin-bottom: 14px; text-align: center;" slot="header">
                <div class="ui yellow floating labeled icon dropdown button">
                    <i class="filter icon"></i>
                    <span class="text" id="header">Albums</span>
                    <div class="menu">
                        <div class="header">
                            <i class="tags icon"></i>
                            Select your tag
                        </div>
                        <div class="divider"></div>
                        <div class="item" @click="changeFilter('album')">
                            <i class="user outline icon"></i>
                            Albums
                        </div>
                        <div class="item" @click="changeFilter('playlist')">
                            <i class="folder icon"></i>
                            Playlist
                        </div>
                        <div class="item" @click="changeFilter('podcast')">
                            <i class="microphone icon"></i>
                            Podcast
                        </div>
                    </div>
                </div>
                <button class="ui right button primary" @click="goTo('creerplaylist')">Creer une playlist</button>
            </div>
            <div v-for="(playlist,idl) in playlists" :key="idl">
                <div class="title">
                    <i class="dropdown icon"></i>
                    {{playlist.title}}
                </div>
                <div class="content">
                    <table class="ui striped table">
                        <thead>
                            <tr>
                                <th>Name</th>
                            </tr>
                        </thead>
                        <draggable
                            class="dragArea list-group"
                            v-if="playlist.liste_musique[0] != undefined"
                            :list="playlist.liste_musique"
                            tag="tbody"
                            :group="{ name: 'people', pull: 'clone', put: false }"
                        >
                            <tr
                                class="list-group-item"
                                v-for="(element,idx) in playlist.liste_musique"
                                :key="idx"
                            >
                                <td>
                                    <div class="ui buttons">
                                        <button
                                            class="ui negative icon button"
                                            @click="addToArrayElement(element)"
                                        >
                                            <i class="arrow left icon"></i>
                                        </button>
                                        <div class="or" data-text="⏱"></div>
                                        <button class="ui orange button">{{element.duree}}</button>
                                        <div class="or" data-text="🎵"></div>
                                        <button class="ui yellow button">{{element.titre}}</button>
                                    </div>
                                </td>
                            </tr>
                        </draggable>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import ServicePHP from "@/services/ServicePHP";
import ServiceMusic from "@/services/ServiceMusic";
import draggable from "vuedraggable";
import Config from "@/config/config";

var socket = null;

export default {
    name: "playlists",
    components: {
        draggable
    },
    data: function() {
        return {
            filter: "album",
            albums: null,
            playlists: null,
            podcasts: null,
            id_album: null,
            MusicRuning: null,
            listOfMusic: [],
            listOfMusicWhoWaitForPlaying: [],
            duree: 0,
            timeSTr: "",
            couperEnCour: ''

        };
    },
    created() {
        if(sessionStorage.role === "animateur"){
        this.getAlbums();
        this.getPodcasts();
        this.getMusicWaiting();
        this.getMusicPlaying();
        this.getPlaylist();
        socket = io(Config.service.music.URL);
        }
    },
    mounted() {
        $(document).ready(function() {
            $(".ui.accordion").accordion();
            $(".ui.dropdown").dropdown();
        });
        var getClass = this;
        socket.on("update", function() {
            console.log("update");
            getClass.duree=0;
            getClass.getMusicWaiting();
            getClass.getMusicPlaying();
        });
    },
    methods: {
        goTo(page) {
            this.$router.push(page);
        },
        async getAlbums() {
            const response = await ServicePHP.getAlbums();
            this.albums = response.data;
        },
        async getPodcasts() {
            const response = await ServicePHP.getPodcast();
            this.podcasts = response.data;
        },
        async downloadMusicByAlbum(id) {
            if (this.id_album !== id) {
                this.id_album = id;
                const response = await ServicePHP.getMusicByAlbum(id + 1);
                this.listOfMusic = response.data;
            } else {
                this.listOfMusic = [];
            }
        },
        async getMusicWaiting() {
            const response = await ServiceMusic.getMusicWaiting();
            this.listOfMusicWhoWaitForPlaying = response.data.waiting;
            for (let i =0 ; i<= this.listOfMusicWhoWaitForPlaying.length ; i++){
                this.couperEnCour = this.listOfMusicWhoWaitForPlaying[i].duree.split(":");
                var tmp = parseInt(this.couperEnCour[0])*60+ parseInt(this.couperEnCour[1]);
                this.duree = this.duree + tmp
                var secondes = Math.round(this.duree%60)
                var minutes = Math.round(this.duree/60)
                var minutesConvert = Math.round(minutes%60)
                
                var heures = Math.floor(minutes/60)
                if (secondes < 10) {
                    secondes  = "0"+secondes
                }
                if (minutesConvert < 10) {
                    minutesConvert  = "0"+minutesConvert
                }
                this.timeSTr = heures+"H "+ minutesConvert + "M " + secondes + "S"
            }
        },
        async getMusicPlaying() {
            const response = await ServiceMusic.getMusicPlaying();
            this.MusicRuning = response.data.isPlaying;
            // this.couper = this.MusicRuning.duree.split(':');
            // let tmp = this.couper[0]+"."+this.couper[1];
            // this.duree= parseFloat(this.duree) + parseFloat(tmp);
            
        },
        async getPlaylist() {
            const response = await ServicePHP.getPlaylists();
            var list = response.data;

            var array = null;
            for (let index = 0; index < list.length; index++) {
                var idList = list[index].liste_musique.split(",");
                list[index].liste_musique = [];
                for (let index2 = 0; index2 < idList.length; index2++) {
                    var music = await ServicePHP.getMusiquesById(
                        idList[index2]
                    );
                    list[index].liste_musique.push(music.data[0]);
                }
            }
            this.playlists = list;
        },
        removeFromArray(id) {
            this.listOfMusicWhoWaitForPlaying.splice(id, 1);
            this.sendNewList();
        },
        addToArray(id) {
            this.listOfMusicWhoWaitForPlaying.push(this.listOfMusic[id]);
            this.sendNewList();
        },
        addToArrayElement(element) {
            this.listOfMusicWhoWaitForPlaying.push(element);
            this.sendNewList();
        },
        async RandomInArray() {
            const response = await ServicePHP.getMusiquesRandom();
            response.data.forEach(element => {
                this.listOfMusicWhoWaitForPlaying.push(element);
            });
            this.sendNewList();
        },
        sendNewList() {
            ServiceMusic.postMusicList(this.listOfMusicWhoWaitForPlaying);
        },
        changeFilter(filter) {
            this.filter = filter;
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

table {
    min-height: 100px;
    overflow: auto;
}

tbody {
    height: 100%;
}

.buttons {
    overflow: hidden;
}

#header {
    padding: 5px;
    margin: 0;
}

#padding {
    padding: 5px;
}

.list-group-item {
    cursor: move;
}

.playlists {
    margin-left: 10%;
    margin-right: 10%;
    display: flex;
    justify-content: space-around;
    height: 100%;
}

#left-component {
    width: 40%;
    height: 100%;
    overflow: auto;
}

#right-component {
    width: 55%;
    height: 100%;
    overflow: auto;
    margin: 0;
}
</style>