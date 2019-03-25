<template>
    <div class="playlists ui segment">
        <div id="left-component" class="ui segment">
            <div style="display: flex; justify-content: space-around;" slot="header">
                <h2 id="header">Musiques en attente d'être jouées</h2>
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
                                <div class="or" data-text="🎵"></div>
                                <button class="ui yellow button">{{element.titre}}</button>
                            </div>
                        </td>
                    </tr>

                    <h2 id="header" slot="header">
                        <div class="ui buttons" v-if="MusicRuning">
                            <button class="ui positive button">
                                <i class="play icon"></i>
                            </button>
                            <div class="or" data-text="⏱"></div>
                            <button class="ui orange button">{{MusicRuning.duree}}</button>
                            <div class="or" data-text="🎵"></div>
                            <button class="ui yellow button">{{MusicRuning.titre}}</button>
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
                    </div>
                </div>
            </div>
            <div v-for="(album,idl) in albums" :key="idl">
                <div class="title" @click="downloadMusicByAlbum(idl)">
                    <i class="dropdown icon"></i>
                    {{album.titre}}
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
                    </div>
                </div>
            </div>
            <div v-for="(album,idl) in albums" :key="idl">
                <div class="title" @click="downloadMusicByAlbum(idl)">
                    <i class="dropdown icon"></i>
                    {{album.titre}}
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
    </div>
</template>

<script>
/* eslint-disable */
import ServicePHP from "@/services/ServicePHP";
import ServiceMusic from "@/services/ServiceMusic";
import draggable from "vuedraggable";
import Config from "@/config/config";

var socket = null;

$(document).ready(function() {
    $(".ui.accordion").accordion();
    $(".ui.dropdown").dropdown();
});

export default {
    name: "playlists",
    components: {
        draggable
    },
    data() {
        return {
            filter: "album",
            albums: null,
            playlists: null,
            id_album: null,
            MusicRuning: null,
            listOfMusic: [],
            listOfMusicWhoWaitForPlaying: []
        };
    },
    created() {
        socket = io(Config.service.music.URL);
    },
    mounted() {
        this.getAlbums();
        var getClass = this;
        socket.on("update", function() {
            console.log("update");
            getClass.getMusicWaiting();
            getClass.getMusicPlaying();
        });
        this.getMusicWaiting();
        this.getMusicPlaying();
    },
    methods: {
        async getAlbums() {
            const response = await ServicePHP.getAlbums();
            this.albums = response.data;
        },
        async downloadMusicByAlbum(id) {
            if (this.id_album !== id) {
                this.id_album = id;
                const response = await ServicePHP.getMusicByAlbum(id + 1);
                this.listOfMusic = response.data;
            }
        },
        async getMusicWaiting() {
            const response = await ServiceMusic.getMusicWaiting();
            this.listOfMusicWhoWaitForPlaying = response.data.waiting;
        },
        async getMusicPlaying() {
            const response = await ServiceMusic.getMusicPlaying();
            this.MusicRuning = response.data.isPlaying;
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
        changeFilter(e) {
            console.log(e)
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