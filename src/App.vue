<template>
  <div id="app">

    <Navigation title="Vuex Deux" searchbar="true"/>

    <div class="container-fluid">
      <div class="row flex-row flex-nowrap card-holder">
        <ListCard v-for="(day, index) in calendar"
                  :day="day"
                  :key="day.id"
                  :showdate="true"
                  :locked="index===0"
                  :custom="false"/>
      </div>
    </div>

    <Navigation add="true"/>

    <div class="container-fluid">

      <div class="row flex-row flex-nowrap card-holder">
        <ListCard v-for="list in lists"
                  :day='list'
                  :key="list.id"
                  :showdate="false"
                  :locked="false"
                  :custom="true"/>
      </div>

    </div>

    <FooterBar/>

  </div>
</template>

<script>

import Navigation from "./components/Navigation";
import FooterBar from "./components/FooterBar";
import ListCard from "./ListCard";
import {mapState} from 'vuex';

export default {
  name: 'App',
  components: {ListCard, FooterBar, Navigation},
  computed: {
    ...mapState([
      'tasks',
      'lists',
      'calendar',
    ]),
  },
  data: function () {
    return {}
  },
  mounted() {
    this.$store.dispatch('loadTasks');
    this.$store.dispatch('loadLists');

    this.taskRollover();

    this.createCalendar();
  },
  methods: {
    createCalendar: function () {
      const today = new Date();
      let counter = 0;

      const startDay = today.getDay() - 1;
      for (let i = startDay; i < today.getDay() + 8; i++) {
        const day = i < 0 ? 6 : i % 7; // Handle yesterday when Sunday

        let date = new Date();
        date.setDate(today.getDate() - 1 + counter);
        const dateString = date.getFullYear() +
            '-' + date.getMonth() +
            '-' + date.getDate();

        this.calendar.push({
          id: dateString,
          name: this.$store.state.days[day],
          isToday: i === today.getDay(),
          // tasks: this.tasks.filter(t => t.date === dateString),
        });

        counter++;
      }
    },
    /**
     * Iterate through all of the tasks that aren't complete
     *  If there are any old ones, set the date to today's date string
     *  Make sure to update the task
     */
    taskRollover: function () {
      const date = new Date();
      const dateString = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
      const dateTimeString = dateString + ' 00:00';
      this.$store.state.tasks.filter(t => t.completed === false).forEach(task => {
        if (new Date(task.date + ' 00:00') < new Date(dateTimeString)) {
          task.date = dateString;
          this.$store.dispatch('updateTask', task);
        }
      });
    },
  }
}
</script>

