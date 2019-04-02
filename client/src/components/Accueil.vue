<template>
  <div>
    <div class="pusher">
      <div class="ui vertical stripe segment">
        <div class="ui middle aligned stackable grid container">
          <div class="row">
            <div class="seven wide column">
              <img class="welImage" src="../assets/micro.jpg">
            </div>
            <div class="seven wide right floated column">
              <h3 class="ui header">Bienvenue dans la Net'Radio !</h3>
              <p>Le seule radio qui ne demande pas de studio ! Ecoutez des émissions délirantes et les musiques branchées du moments uniquement grâce a votre connexion internet</p>
              <h3 class="ui header">Participez depuis chez vous !</h3>
              <p>Avec notre application web dernier cri, participez à vos émissions préférés directement depuis votre ordinateur</p>
            </div>
          </div>
          <div class="row">
            <div class="center aligned column">
              <h1 class="border">Clique en bas de la page sur le bouton Play !</h1>
            </div>
          </div>
        </div>
      </div>
      <div class="ui vertical stripe segment" style="margin-top: 3%">
        <div class="ui text container">
          <h3 class="ui header">Nous recrutons !</h3>
          <p>Notre radio est toute neuve ! Nous recrutons donc des animateurs/chroniqueurs pour passer votre émission lors de notre radio. Si vous êtes interessé, n'hésitez surtout pas à nous contacter !</p>
          <a class="ui large button">Contacter</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "accueil",
  methods: {},
  computed: {}
};
</script>
<style scoped>
.welImage {
  border-radius: 15px;
  width: 100%
}
.border {
  margin: 3% auto;
  width: 80%;
  border: solid black 1px;
  padding: 3%;
  border-radius: 15px;
}
</style>
