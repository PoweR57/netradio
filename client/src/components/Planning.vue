<template>
  <div>
    <div class="ui grid">
      <div class="four wide column"></div>
      <div class="eight wide column">
        <div id="calendar"></div>
      </div>
      <div class="four wide column">
        <div class="ui input">
          <input type="text" v-model="titre" placeholder="Search...">
        </div>
        <button class="ui button" v-on:click="pushEvent()">push</button>
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
      titre: ""
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
          backgroundColor: "red",
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
          localStorage.idAnim = 5;
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
          backgroundColor: "red",
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
    async pushEvent() {
      sessionStorage.role = "animateur"
      /*
      var res = await ServicePHP.createEvent(
        this.titre,
        localStorage.start,
        localStorage.end,
        localStorage.idAnim
      );*/
    }
  },
  mounted() {
    if(sessionStorage === "administrateur"){
    this.createCalendarAdmin();
    }else{
      this.createCalendar();
    }
  }
};
</script>
<style scoped>
#calendar {
  max-width: 900px;
}
</style>
