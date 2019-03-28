<template>
  <div>
      <div id="calendar"></div>
  </div>
</template>

<script>
/* eslint-disable */
import "@fullcalendar/core/main.css";
import "@fullcalendar/timegrid/main.css";
import { Calendar } from "@fullcalendar/core";
import timeGridPlugin from "@fullcalendar/timegrid";
import 'fullcalendar';
import $ from 'jquery';

export default {
  data() {
    return {};
  },
  methods: {
    refresh() {

    }
  },
  mounted() {
        var calendar = new Calendar(document.getElementById("calendar"), {
          plugins: [timeGridPlugin],
          timeZone: "UTC",
          defaultView: "timeGridWeek",
          resourceLabelText: "Jours",
          aspectRatio: 1.635,
          allDaySlot: false,
          slotDuration: "01:00:00",
          slotLabelInterval: "02:00:00",
          eventTimeFormat: {
            hour: "numeric",
            minute: "2-digit",
            meridiem: false
          },
          events: "https://fullcalendar.io/demo-events.json"
        });
       calendar.render();
  }
};
</script>
<style scoped>
#calendar {
  max-width: 900px;
  margin: 40px auto;
}
</style>
