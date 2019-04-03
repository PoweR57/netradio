
<template>
  <div id="top" class="ui large fixed top hidden menu">
    <div class="ui container">
      <a class="item" id="acc" v-on:click="goTo('accueil')">Accueil</a>
      <a class="item" id="pla" v-on:click="goTo('planning')">Planning</a>
      <a class="item" id="ctl" v-if="this.role==='animateur'" v-on:click="goTo('control')">Control</a>
      <a class="item" id="pan" v-if="this.role==='animateur'" v-on:click="goTo('panel')">Panel</a>
      <div class="middle">
        <img class="logo" src="../assets/logo.png">
      </div>
      <div class="right menu" v-if="co == false">
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
      <div class="right menu" v-if="co == true">
        <div class="item">
          <a
            class="ui secondary button"
            style="border: solid 1px white"
            v-on:click="deconnect()"
          >Log out</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */

export default {
  name: "appHeader",
  data() {
    return {
      role: "",
      co: false
    };
  },
  created() {
    this.role = sessionStorage.role;
    if (sessionStorage.connect === "true") {
      this.co = true;
    }
  },
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
    deconnect() {
      sessionStorage.removeItem('role');
      sessionStorage.removeItem('connect');
      document.location.href = "/accueil";
    },
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
  background-image: url("../assets/bckgrnd.jpg");
  border-bottom: 2px solid black;
  height: 100px;
  background-image: url("../assets/bckgrnd.jpg");
  border-bottom: 2px solid black;
  height: 100px;
}
#top a {
  color: rgba(255, 255, 255, 0.9);
  font-size: 120%;
}
</style>
