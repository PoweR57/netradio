
<template>
  <div id="top" class="ui large fixed top hidden menu">
    <div class="ui container">
      <a class="item" id="acc" v-on:click="goTo('accueil')">Accueil</a>
      <a class="item" id="pla" v-on:click="goTo('planning')">Planning</a>
      <a class="item" id="ctl" v-on:click="goTo('control')">Control</a>
      <a class="item" id="pan" v-on:click="goTo('panel')">Panel</a>
      <a class="item" id="inv" v-on:click="goTo('invite')">Invite</a>
      <div class="middle">
        <img class="logo" src="../logo.png">
      </div>
      <div class="right menu">
        <div class="item">
          <a
            class="ui secondary button"
            style="border: solid 1px white"
            v-on:click="$router.push('login')"
          >Log in</a>
        </div>
        <div class="item">
          <a
            class="ui button"
            style="border: solid 1px black;background:white;color:black;"
            v-on:click="$router.push('signup')"
          >Sign Up</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */

export default {
  name: "appHeader",
  mounted() {
    $("#acc").removeClass("active");
    $("#pla").removeClass("active");
    $("#ctl").removeClass("active");
    $("#pan").removeClass("active");
    $("#inv").removeClass("active");
    switch ($(location)[0].hash) {
      case "#/":
        $("#acc").addClass("active");
        break;
      case "#/accueil":
        $("#acc").addClass("active");
        break;
      case "#/planning":
        $("#pla").addClass("active");
        break;
      case "#/control":
        $("#ctl").addClass("active");
        break;
      case "#/panel":
        $("#pan").addClass("active");
        break;
      case "#/invite":
        $("#inv").addClass("active");
        break;
    }
  },
  methods: {
    goTo(page) {
      $("#pla").removeClass("active");
      $("#ctl").removeClass("active");
      $("#pan").removeClass("active");
      $("#acc").removeClass("active");
      $("#inv").removeClass("active");
      switch (page) {
        case "accueil":
          $("#acc").addClass("active");
          this.$router.push(page);
          break;
        case "planning":
          $("#pla").addClass("active");
          this.$router.push(page);
          break;
        case "control":
          $("#ctl").addClass("active");
          this.$router.push(page);
          break;
        case "panel":
          $("#pan").addClass("active");
          this.$router.push(page);
          break;
        case "invite":
          $("#inv").addClass("active");
          this.$router.push(page);
          break;
        default:
          this.$router.push(page);
          break;
      }
    }
  }
};
</script>

<style>
/* Console log de la musique */
.middle {
  margin: auto;
}
.active {
  text-shadow: 0 0 10px white;
}

.bouton17 {
  width: 40px;
  height: 40px;
  background: #fafafa;
  box-shadow: 2px 2px 8px #aaa;
  font: bold 13px Arial;
  border-radius: 50%;
  color: #555;
  padding: 0px;
}
.resize {
  width: 25px;
  height: 25px;
  margin: auto;
  margin-left: 3px;
}
#top {
  background-image: url("../bckgrnd.jpg");
  border-bottom: 2px solid black;
  height: 100px;
}
#top a {
  color: rgba(255, 255, 255, 0.9);
  font-size: 120%;
}
</style>
