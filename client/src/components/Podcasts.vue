<template>
  <div id="container">
    <div v-for="(pod,id) in podcast" :key="id" id="card" class="ui card">
      <div class="content">
        <div class="header">{{pod.titre}}</div>
      </div>
      <div class="content">
        <h4 class="ui sub header">Description:</h4>
        <div class="ui small feed">
          <div class="event">
            <div class="content">
              <div class="summary">{{pod.descr}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="extra content">
        <button class="ui button">faire la méthode de dl</button>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import ServicePHP from "@/services/ServicePHP";
export default {
  name: "Podcast",
  data() {
    return {
      podcast: []
    };
  },
  created() {
    this.getPodcast();
  },
  methods: {
    async getPodcast() {
      const response = await ServicePHP.getPoadcast();
      this.podcast = response.data;
      console.log(this.podcast);
    }
  },
  computed: {}
};
</script>
<style scoped>
#container {
  display: flex;
  flex-direction: row;
}
#card {
  margin-top: 1%;
  margin-left: 2%;
}
</style>
