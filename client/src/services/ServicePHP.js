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
        return ApiPHP().get('/musiques/'+id)
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
    postPlaylist(title,description) {
        var json = 
        `
        {
            "title":"` + title + `",
            "descr":"` + description + `"
        }
        `;
        return ApiPHP().post('/playlist',json)
    },
    savePlaylist(playlist,title) {
        var strList = ""
        playlist.forEach(element => {
            if (strList == "") {
                strList = element.id
            } else {
                strList += ','+element.id
            }
        });
        var json = 
        `
        {
            "title":"` + title + `",
            "liste_musique":"` + strList + `"
        }
        `;
        return ApiPHP().post('/playlists', json)
    },
    getUserByLogin(login,mdp) {
        var json = '{"email":"' + login + '","mdp":"' + mdp + '"}';
        return ApiPHP().post('/login', json)
    },
    createUser(login,nom,prenom,mdp){
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
        return ApiPHP().post('/signup', json)
    }
}