/* eslint-disable */
import ApiMusic from '@/services/ApiMusic'

export default {
    fetchPosts() {
        return ApiMusic().get('posts')
    }
}