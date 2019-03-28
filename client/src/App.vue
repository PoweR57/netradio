<template>
    <div id="app">
        <Header/>
        <router-view id="content"/>
        <Footer/>
    </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
export default {
    name: "App",
    components: {
        Header: Header,
        Footer: Footer
    }
};
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  height: calc(100% - 85px);;
  margin: 0;
}
#content {
    margin-top: 100px;
}
</style>
