<template>
    <div id="app">

        <Navigation title="Vue Deux" searchbar="true"/>

        <div class="container-fluid">

            <div class="row flex-row flex-nowrap card-holder">

                <ListCard/>
                <ListCard/>
                <ListCard/>
                <ListCard/>
                <ListCard/>
                <ListCard/>
                <ListCard/>
                <ListCard/>
                <ListCard/>
                <ListCard/>
                <ListCard/>
                <ListCard/>
                <ListCard/>
                <ListCard/>
                <ListCard/>
                <ListCard/>
                <ListCard/>
                <ListCard/>
                <ListCard/>
                <ListCard/>
            </div>

        </div>

        <Navigation add="true"/>

        <div class="container-fluid">

            <div class="row flex-row flex-nowrap card-holder">
                <div class="card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">Monday</h5>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Hate the day</li>
                        <li class="list-group-item">Nap</li>
                        <li class="list-group-item">Bake Lasagna</li>
                        <li class="list-group-item">Eat lasagna before Jon gets home!</li>
                    </ul>
                </div>
            </div>

        </div>

        <FooterBar/>

    </div>
</template>

<script>

    import Navigation from "@/components/Navigation";
    import FooterBar from "@/FooterBar";
    import ListCard from "@/ListCard";

    export default {
        name: 'App',
        components: {ListCard, FooterBar, Navigation}
    }
</script>

