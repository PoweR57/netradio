/* eslint-disable */
import ApiDataBase from '@/services/ApiDataBase'

export default {
    fetchPosts() {
        return ApiDataBase().get('/')
    }
}