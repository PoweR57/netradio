/* eslint-disable */
import ApiMusic from '@/services/ApiMusic'

export default {
    getMusicWaiting() {
        return ApiMusic().get('/Waiting')
    },
    getInvites() {
        return ApiMusic().get('/Invite')
    },
    getMusicPlaying() {
        return ApiMusic().get('/Playing')
    },
    postMusicList(list) {
        var json = JSON.stringify(list)
        ApiMusic().post('/list', {list : json} )
    },
}