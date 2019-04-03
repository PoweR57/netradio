<template>
    <div id="app">
        <Header/>
        <router-view id="content"/>
        <Footer/>
    </div>
</template>

<script>
/* eslint-disable */
import Header from "./components/Header";
import Footer from "./components/Footer";
export default {
    name: "App",
    components: {
        Header: Header,
        Footer: Footer
    },
    methods: {
        myFunctionOnLoad: function() {
            console.log("call on load...");
        }
    },

    created: function() {
        this.myFunctionOnLoad();
    }
};
</script>

<style>
#app {
    display: flex;
    flex-direction: column;
    height: calc(100% - 85px);
    margin: 0;
}
#content {
    margin-top: 150px;
    margin-bottom: 100px;
}
</style>
