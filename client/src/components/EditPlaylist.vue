<template>
    <div class="playlists ui segment">
        <div id="left-component" class="ui segment">
            <div style="display: flex; justify-content: space-around;" slot="header">
                <h2 id="header">Playlist</h2>
                <div style="margin-bottom: 14px; text-align: center;" slot="header">
                    <div class="ui yellow floating labeled icon dropdown button">
                        <i class="filter icon"></i>
                        <span class="text" id="header">Playlists</span>
                        <div class="menu">
                            <div class="header">
                                <i class="tags icon"></i>
                                Select your playlist
                            </div>
                            <div class="divider"></div>
                            <div
                                v-for="(onePlaylist,idx) in listPlaylists"
                                :key="idx"
                                class="item"
                                @click="changeFilter(onePlaylist.id)"
                            >
                                <i class="folder icon"></i>
                                {{onePlaylist.title}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <table class="ui striped table" v-if="idPlaylist">
                <draggable
                    group="people"
                    draggable=".dragMe"
                    tag="tbody"
                    v-model="playlist"
                    @start="isDragging = true"
                    @end="isDragging = false"
                >
                    <tr class="list-group-item dragMe" v-for="(element,idx) in playlist" :key="idx">
                        <td id="padding" v-if="element">
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

                    <h2 id="header" slot="header" v-if="idPlaylist">
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

export default {
    name: "editplaylist",
    components: {
        draggable
    },
    data() {
        return {
            idPlaylist: "",
            albums: null,
            listOfMusic: [],
            playlist: [],
            listPlaylists: []
        };
    },
    mounted() {
        $(document).ready(function() {
            $(".ui.accordion").accordion();
            $(".ui.dropdown").dropdown();
        });
        this.getAlbums();
        this.getPlaylists();
    },
    methods: {
        async getAlbums() {
            const response = await ServicePHP.getAlbums();
            this.albums = response.data;
        },
        async getPlaylists() {
            const response = await ServicePHP.getPlaylists();
            this.listPlaylists = response.data;
        },
        async getPlaylistById(id) {
            const response = await ServicePHP.getPlaylistById(id);
            var listeId = response.data[0].liste_musique;
            var listeIdMusic = listeId.split(",");
            for (let index = 0; index < listeIdMusic.length; index++) {
                const rep = await ServicePHP.getMusiquesById(listeIdMusic[index])
                this.playlist.push(rep.data[0]);
            }
        },
        changeFilter(id) {
            this.playlist = [];
            this.idPlaylist = id;
            this.getPlaylistById(id);
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
        async savePlaylist() {
            await ServicePHP.savePlaylist(this.playlist, this.idPlaylist);
            this.$router.push("panel");
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