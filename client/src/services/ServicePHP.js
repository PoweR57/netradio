/* eslint-disable */
import ApiPHP from '@/services/ApiPHP'
import Config from "@/config/config"

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
    postPlaylist(title, description) {
        var json =`{
            "title":"` + title + `",
            "descr":"` + description + `"
        }`;
        return ApiPHP().post('/playlist', json)
    },
    savePlaylist(playlist, title) {
        var strList = ""
        playlist.forEach(element => {
            if (strList == "") {
                strList = element.id
            } else {
                strList += ',' + element.id
            }
        });
        var json =`{
            "title":"` + title + `",
            "liste_musique":"` + strList + `"
        }`;
        return ApiPHP().post('/playlists', json)
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
    createPoadcast(titre, descr, uuid) {
        var json = `{
            "titre":"` + titre + `",
            "uuid":"` + uuid + `",
            "descr":"` + descr + `"
        }`;
        return ApiPHP().post('/poadcast', json)
    },
    sendPoadcast(file, uuid) {
        $.ajax({
            url: "http://" + Config.service.dataBase.URL + "/poadcast/file/"+uuid,
            filetype: "audio/mp3",
            cache: false,
            processData: false,
            data: file,
            contentType: false,
            type: "post",
            success: function(php_script_response) {
                alert(php_script_response); // display response from the PHP script, if any
            },
            xhr: function() {
                // get the native XmlHttpRequest object
                var xhr = $.ajaxSettings.xhr();
                // set the onprogress event handler
                xhr.upload.onprogress = function(evt) {
                    console.log("progress", (evt.loaded / evt.total) * 100);
                };
                // set the onload event handler
                xhr.upload.onload = function() {
                    console.log("DONE!");
                };
                // return the customized object
                return xhr;
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
    }
}