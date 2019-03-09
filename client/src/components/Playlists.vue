<template>
    <div v-if="posts">
        <h1>{{posts.title}}</h1>
        <h1>{{posts.description}}</h1>
    </div>
</template>

<script>
/* eslint-disable */
import ServicePHP from "@/services/ServicePHP";

export default {
    name: "playlists",
    data() {
        return { posts: null };
    },
    mounted() {
        this.getPosts();
    },
    methods: {
        async getPosts() {
            const response = await ServicePHP.fetchPosts();
            this.posts = response.data;
        },
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
