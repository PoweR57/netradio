<template>
  <div id="app">
    <Header/>
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
import Header from './components/Header'
export default {
  name: 'App',
  components: {
    'Header': Header
  }
}
</script>

<style>
#app {
    height: 100%;
    margin: 60px;
}
</style>
