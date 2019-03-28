<template>
  <div id="foot" class="ui inverted vertical footer segment">
    <div class="ui container">
      <div class="ui stackable inverted divided equal height stackable grid">
        <div class="two wide column">
          <h4 class="ui inverted header">About</h4>
          <div class="ui inverted link list">
            <a href="#" class="item">Sitemap</a>
            <a href="#" class="item">Contact Us</a>
          </div>
        </div>
        <div class="two wide column">
          <h4 class="ui inverted header">Services</h4>
          <div class="ui inverted link list">
            <a href="#" class="item">Banana Pre-Order</a>
            <a href="#" class="item">DNA FAQ</a>
          </div>
        </div>
        <div class="eight wide column">
          <button id="listen" v:on-click="drive()" class="play"></button>
        </div>
        <div class="four wide column">
          <h4 class="ui inverted header">Footer Header</h4>
          <p>Extra space for a call to action inside the footer that could help re-engage users.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "foot",
  data() {
    return {};
  },
  methods: {
    drive() {
      $("#listen").addClass("play");
      $("#listen").removeClass("pause");
    }
  }
}
</script>

<style>
#foot {
  /* Increased specificity for SO snippet priority */
  position: fixed;
  text-align: center;
  width: 100%;
  bottom: 0;
  background-image: url("../bckgrnd.jpg");
  border-top: 2px solid black;
  height: 100px;
  z-index: 101;
}
.play {
  box-sizing: border-box;
  width: 74px;
  height: 74px;
  border-style: solid;
  border-width: 37px;
  border-color: #202020;
  border-width: 37px 0px 37px 74px;
  border-color: red blue green yellow;
  border-color: transparent transparent transparent white;
  background: transparent;
}
.pause {
  width: 74px;
  height: 74px;
  border-style: solid;
  border-width: 37px;
  border-color: white;
  border-style: double;
  border-width: 0px 0px 0px 37px;
  background: transparent;
}
</style>
