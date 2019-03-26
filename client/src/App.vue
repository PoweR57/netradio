<template>
  <div id="app">
    <Header/>
    <router-view id="content"/>
  </div>
</template>

<script>
import Header from './components/Header'
export default {
  name: 'App',
  components: {
    Header: Header
  }
}
</script>

<style>
#app {
  height: 100%;
}
#content {
  margin-top: 60px;
}
</style>
