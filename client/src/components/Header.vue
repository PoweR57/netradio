<template>
  <div class="ui large top fixed hidden menu">
    <div class="ui container">
      <a class="active item">Home</a>
      <a class="item">Work</a>
      <a class="item">Company</a>
      <a class="item">Careers</a>
      <div class="middle">
        <button class="bouton17" v-on:click="play()">
          <img class="resize" src="../19314.png">
        </button>
      </div>
      <div class="right menu">
        <div class="item">
          <a class="ui button">Log in</a>
        </div>
        <div class="item">
          <a class="ui primary button">Sign Up</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "Header",
  data() {
    return {
      onPlay: false
    };
  },
  methods: {
    play() {
      if (this.onPlay == false) {
        this.onPlay = true;
        console.log(this.onPlay);
      } else {
        this.onPlay = false;
        console.log(this.onPlay);
      }
    }
  },
  computed: {}
};
</script>
<style scoped>
.middle {
  margin-left: 20%;
  margin-top: auto;
  margin-bottom: auto;
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
</style>
