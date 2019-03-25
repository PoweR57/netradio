<template>
  <div id="app">
    <Posts/>
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
import Posts from './components/Posts'
export default {
  name: 'App',
  components: {
    'Posts': Posts
  }
}
</script>

<style>
#app {
  height: 100%;
}
</style>
