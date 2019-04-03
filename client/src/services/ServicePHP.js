/* eslint-disable */
import ApiPHP from '@/services/ApiPHP'

export default {
    getPlayLists() {
        return ApiPHP().get('/playlists')
    },
    deletePlayLists(id) {
        return ApiPHP().delete('/playlists/' + id)
    },
    getMusiques() {
        return ApiPHP().get('/musiques')
    },
    getMusiquesById(id) {
        return ApiPHP().get('/musiques/' + id)
    },
    getMusiquesRandom() {
        return ApiPHP().get('/musiques/random')
    },
    getAlbums() {
        return ApiPHP().get('/albums')
    },
    getMusicByAlbum(id) {
        return ApiPHP().get('/albums/' + id + '/musiques')
    },
    getPlaylists() {
        return ApiPHP().get('/playlists')
    },
    getPlaylistById(id) {
        return ApiPHP().get('/playlists/' + id)
    },
    postPlaylist(title, description) {
        var json = `{
            "title":"` + title + `",
            "descr":"` + description + `"
        }`;
        return ApiPHP().post('/playlist', json)
    },
    savePlaylist(playlist, id) {
        var strList = ""
        playlist.forEach(element => {
            if (element) 
                if (strList == "") {
                    strList = element.id
                } else {
                    strList += ',' + element.id
                }
        });
        var json = `{
            "id":` + id + `,
            "liste":"` + strList + `"
        }`;
        return ApiPHP().put('/playlists', json)
    },
    getUserByLogin(login, mdp) {
        var json = '{"email":"' + login + '","mdp":"' + mdp + '"}';
        return ApiPHP().post('/login', json)
    },
    createUser(login, nom, prenom, mdp) {
        var json =
            `
        {
            "email":"` + login + `",
            "nom":"` + nom + `",
            "prenom":"` + prenom + `",
            "mdp":"` + mdp + `"
        }
        `;
        console.log(json);
        return ApiPHP().post('/signup', json);
    },
    postPlaylist(title, description) {
        var json =
            `
        {
            "title":"` + title + `",
            "descr":"` + description + `"
        }
        `;
        return ApiPHP().post('/playlist', json)
    },
    createPodcast(titre, descr, uuid, temps) {
        var json = `{
            "titre":"` + titre + `",
            "uuid":"` + uuid + `",
            "duree":"` + temps + `",
            "descr":"` + descr + `"
        }`;
        return ApiPHP().post('/podcast', json)
    },
    getPodcast() {
        return ApiPHP().get('/podcasts')
    },
}