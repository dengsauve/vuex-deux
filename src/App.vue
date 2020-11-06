<template>
    <div id="app">

        <Navigation title="Vue Deux" searchbar="true"/>

        <div class="container-fluid">

            <div class="row flex-row flex-nowrap card-holder">

                <ListCard v-for="day in days" :name="day.name" :today="day.isToday" :key="day.id"/>

            </div>

        </div>

        <Navigation add="true"/>

        <div class="container-fluid">

            <div class="row flex-row flex-nowrap card-holder">
                <div class="card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">Custom List</h5>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Custom item #1</li>
                        <li class="list-group-item">Custom item #2</li>
                        <li class="list-group-item">Custom item #3</li>
                        <li class="list-group-item">Custom item #4</li>
                    </ul>
                </div>
            </div>

        </div>

        <FooterBar/>

    </div>
</template>

<script>

    import Navigation from "./components/Navigation";
    import FooterBar from "./FooterBar";
    import ListCard from "./ListCard";

    export default {
        name: 'App',
        components: {ListCard, FooterBar, Navigation},
        data: function () {
            return {
                days: []
            }
        },
        mounted() {
            // need to get the first initial 7 days?
            const today = new Date();
            for (let i = today.getDay(); i < today.getDay() + 8; i++) {
                console.log(i);
                const day = i % 7;
                this.days.push({
                    id: i,
                    name: this.$store.state.days[day],
                    isToday: i === today.getDay(),
                })
            }
        }
    }
</script>

