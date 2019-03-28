<template>
  <div id="app">
    <Footer/>
    <Header/>
    <router-view id="content"/>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
export default {
  name: 'App',
  components: {
    Header: Header,
    Footer: Footer
  }
}
</script>

<style>
#app {
  height: 100%;
  margin:0;
}
#content {
  margin-top: 100px;
}
</style>
