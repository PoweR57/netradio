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
    getAnims() {
        return ApiPHP().get('/animateurs')
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
    createEvent(title, start, end, id, couleur) {
        var json =
            `
        {
            "title":"` + title + `",
            "start":"` + start + `",
            "end":"` + end + `",
            "id_animateur":"` + id + `",
            "couleur":"` + couleur + `"
            
        }
        `;
        return ApiPHP().post('/plannings', json)
    },
    createPodcast(titre, descr, uuid) {
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
    getPlannings() {
        return ApiPHP().get('/plannings')
    }
}