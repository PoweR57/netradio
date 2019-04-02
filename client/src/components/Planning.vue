<template>
  <div>
    <div id="calendar"></div>
  </div>
</template>

<script>
/* eslint-disable */
import ServicePHP from "@/services/ServicePHP";
import "@fullcalendar/core/main.css";
import "@fullcalendar/timegrid/main.css";
import { Calendar } from "@fullcalendar/core";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from '@fullcalendar/interaction';
import "fullcalendar";
import $ from "jquery";
import { getContentRect } from "fullcalendar";

export default {
  data() {
    return {
      eventsList: []
    };
  },
  methods: {
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
        plugins: [interactionPlugin,timeGridPlugin],
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
          this.addEvent(info)
      }
      });
      calendar.render();
      console.log(this.eventsList);
    },
  },
  mounted() {
    this.createCalendar();
  }
};
</script>
<style scoped>
#calendar {
  max-width: 900px;
  margin: 40px auto;
}
</style>
