/* eslint-disable */
import ApiMusic from '@/services/ApiMusic'

export default {
    getMusicWaiting() {
        return ApiMusic().get('/Waiting')
    },
    postMusicList(list) {
        var json = JSON.stringify(list)
        ApiMusic().post('/list', {list : json} )
    },
}