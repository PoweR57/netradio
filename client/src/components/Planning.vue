<template>
  <div>
    <div class="ui grid">
      <div class="four wide column"></div>
      <div class="eight wide column">
        <div id="calendar"></div>
      </div>
      <div class="four wide column">
        <div v-if="role === 'administrateur'">
          <div class="ui relaxed divided list">
            <div class="item" v-for="element in animList" :key="element.id">
              <i class="large user middle aligned icon"></i>
              <div class="content">
                <p class="header" style="margin: 5px 30px">
                  {{ element.nom }} - {{ element.prenom }}
                  <input
                    type="radio"
                    v-bind:value="element.id"
                    v-model="selectedAnim"
                    style="margin-left: 30px; margin-top: 7px;"
                  >
                </p>
              </div>
            </div>
          </div>
          <div class="ui relaxed divided list">
            <div class="item">
              <i class="large tint middle aligned icon" style="color: red"></i>
              <div class="content">
                <p class="header" style="margin: 5px 30px">
                  Rouge
                  <input
                    type="radio"
                    value="red"
                    v-model="selectedColor"
                    style="margin-left: 30px; margin-top: 7px;"
                  >
                </p>
              </div>
            </div>
            <div class="item">
              <i class="large tint middle aligned icon" style="color: green"></i>
              <div class="content">
                <p class="header" style="margin: 5px 30px">
                  Vert
                  <input
                    type="radio"
                    value="green"
                    v-model="selectedColor"
                    style="margin-left: 30px; margin-top: 7px;"
                  >
                </p>
              </div>
            </div>
            <div class="item">  
              <i class="large tint middle aligned icon" style="color: blue"></i>
              <div class="content">
                <p class="header" style="margin: 5px 30px">
                  Bleu
                  <input
                    type="radio"
                    value="blue"
                    v-model="selectedColor"
                    style="margin-left: 30px; margin-top: 7px;"
                  >
                </p>
              </div>
            </div>
          </div>
          <div class="ui input" id="interact">
            <input type="text" v-model="titre" placeholder="Titre de l'event">
          </div>
          <button class="ui button" v-on:click="pushEvent()">Ajouter l'event</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import ServicePHP from "@/services/ServicePHP";
import "@fullcalendar/core/main.css";
import "@fullcalendar/timegrid/main.css";
import { Calendar } from "@fullcalendar/core";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "fullcalendar";
import $ from "jquery";
import { getContentRect } from "fullcalendar";

export default {
  data() {
    return {
      eventsList: [],
      titre: "",
      role: "",
      animList: [],
      selectedAnim: "",
      selectedColor: ""
    };
  },
  methods: {
    async createCalendarAdmin() {
      var res = await ServicePHP.getPlannings();
      for (var i = 0; i < res.data.length; i++) {
        var event = {
          title: res.data[i].descr,
          start: res.data[i].date_debut,
          end: res.data[i].date_fin,
          backgroundColor: res.data[i].couleur,
          id: res.data[i].id
        };
        this.eventsList.push(event);
      }
      var calendar = new Calendar(document.getElementById("calendar"), {
        plugins: [interactionPlugin, timeGridPlugin],
        timeZone: "UTC",
        defaultView: "timeGridWeek",
        resourceLabelText: "Jours",
        aspectRatio: 1.635,
        allDaySlot: false,
        slotDuration: "01:00:00",
        slotLabelInterval: "02:00:00",
        selectable: true,
        eventTimeFormat: {
          hour: "numeric",
          minute: "2-digit",
          meridiem: false
        },
        events: this.eventsList,
        select: function(info) {
          localStorage.start = info.startStr;
          localStorage.end = info.endStr;
        },
        eventClick: function(info) {
          alert("Event: " + info.event.title);
        }
      });
      calendar.render();
    },
    async createCalendar() {
      var res = await ServicePHP.getPlannings();
      for (var i = 0; i < res.data.length; i++) {
        var event = {
          title: res.data[i].descr,
          start: res.data[i].date_debut,
          end: res.data[i].date_fin,
          backgroundColor: res.data[i].couleur,
          id: res.data[i].id
        };
        this.eventsList.push(event);
      }
      var calendar = new Calendar(document.getElementById("calendar"), {
        plugins: [interactionPlugin, timeGridPlugin],
        timeZone: "UTC",
        defaultView: "timeGridWeek",
        resourceLabelText: "Jours",
        aspectRatio: 1.635,
        allDaySlot: false,
        slotDuration: "01:00:00",
        slotLabelInterval: "02:00:00",
        selectable: true,
        eventTimeFormat: {
          hour: "numeric",
          minute: "2-digit",
          meridiem: false
        },
        events: this.eventsList,
        eventClick: function(info) {
          alert("Event: " + info.event.title);
        }
      });
      calendar.render();
    },
    async getAnim() {
      var res = await ServicePHP.getAnims();
      this.animList = res.data;
    },
    async pushEvent() {
      if (
        this.titre == "" ||
        this.selected == "" ||
        localStorage.start == "" ||
        localStorage.end == ""
      ) {
        alert(
          "Verifiez de bien avoir renseigné tous les champs (date comprise)"
        );
      } else {
        var res = await ServicePHP.createEvent(
          this.titre,
          localStorage.start,
          localStorage.end,
          this.selectedAnim,
          this.selectedColor
        );
        document.location.reload(true)
      }
    }
  },
  created() {
    localStorage.start = "";
    localStorage.end = "";
    this.role = sessionStorage.role;
  },
  mounted() {
    if (this.role == "administrateur") {
      this.createCalendarAdmin();
    } else {
      this.createCalendar();
    }
    this.getAnim();
  }
};
</script>
<style scoped>
#calendar {
  max-width: 900px;
}
.list {
  height: 200px;
  overflow: auto;
}
</style>
