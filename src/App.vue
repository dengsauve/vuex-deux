<template>
    <div id="app">

        <Navigation title="Vuex Deux" searchbar="true"/>

        <div class="container-fluid">
            <div class="row flex-row flex-nowrap card-holder">
                <ListCard v-for="day in days"
                          :day="day"
                          :key="day.id"
                          :showdate="true"
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
                          :custom="true"/>
            </div>

        </div>

        <FooterBar/>

    </div>
</template>

<script>

    import Navigation from "./components/Navigation";
    import ListCard from "./ListCard";
    import {mapState} from 'vuex';

    export default {
        name: 'App',
        components: {ListCard, FooterBar, Navigation},
        computed: {
            ...mapState([
                'tasks',
                'lists'
            ]),
        },
        data: function () {
            return {
                days: []
            }
        },
        mounted() {
            this.createDaysList();
        },
        methods: {
            createDaysList: function () {
                const today = new Date();
                let counter = 0;

                const startDay = today.getDay() - 1;
                for (let i = startDay; i < today.getDay() + 8; i++) {
                    const day = i % 7;

                    let date = new Date();
                    date.setDate(today.getDate() - 1 + counter);
                    let dateString = date.getFullYear() +
                        '-' + date.getMonth() +
                        '-' + date.getDate();

                    this.days.push({
                        id: dateString,
                        name: this.$store.state.days[day],
                        isToday: i === today.getDay(),
                        tasks: this.tasks.filter(t => t.date === dateString),
                    });

                    counter++;
                }
            }
        }
import FooterBar from "./components/FooterBar";
    }
</script>

