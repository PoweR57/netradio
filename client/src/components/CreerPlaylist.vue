<template>
    <div class="playlists ui segment">
        <div id="left-component" class="ui segment">
            <div style="display: flex; justify-content: space-around;" slot="header">
                <h2 id="header">Playlist</h2>
            </div>
            <table class="ui striped table">
                <draggable
                    group="people"
                    draggable=".dragMe"
                    tag="tbody"
                    v-model="playlist"
                    @start="isDragging = true"
                    @end="isDragging = false"
                >
                    <tr class="list-group-item dragMe" v-for="(element,idx) in playlist" :key="idx">
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
                        <button class="ui blue button" @click="savePlaylist()">
                            <i class="save icon"></i>
                            Sauvegarder
                        </button>
                    </h2>
                </draggable>
            </table>
        </div>

        <div class="ui styled accordion segment" id="right-component">
            <div style="margin-bottom: 14px; text-align: center;" slot="header">
                <h2 class="text" id="header">Albums</h2>
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
            listOfMusic: [],
            playlist: []
        };
    },
    mounted() {
        this.getAlbums();
    },
    methods: {
        async getAlbums() {
            const response = await ServicePHP.getAlbums();
            this.albums = response.data;
        },
        removeFromArray(id) {
            this.playlist.splice(id, 1);
        },
        addToArray(id) {
            this.playlist.push(this.listOfMusic[id]);
        },
        addToArrayElement(element) {
            this.playlist.push(element);
        },
        savePlaylist() {
            ServicePHP.savePlaylist(this.playlist,"title");
        },
        async downloadMusicByAlbum(id) {
            if (this.id_album !== id) {
                this.id_album = id;
                const response = await ServicePHP.getMusicByAlbum(id + 1);
                this.listOfMusic = response.data;
            }
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