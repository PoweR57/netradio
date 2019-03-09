/* eslint-disable */
import ApiPHP from '@/services/ApiPHP'

export default {
    fetchPosts() {
        return ApiPHP().get('/')
    },
    getPlayLists() {
        return ApiPHP().get('/playlists')
    },
    postPlayLists(title) {
        var json = '{"title":"'+title+'"}';
        return ApiPHP().post('/playlists',json)
    },
    deletePlayLists(id) {
        return ApiPHP().delete('/playlists/'+id)
    },
    getMusiques() {
        return ApiPHP().get('/musiques')
    },
}