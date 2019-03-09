/* eslint-disable */
import ApiPHP from '@/services/ApiPHP'

export default {
    fetchPosts() {
        return ApiPHP().get('/')
    }
}