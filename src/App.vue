<template>
  <div id="app">

    <Navigation title="Vue Deux" searchbar="true"/>

    <div class="container-fluid">

      <div class="row">
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

      <Navigation add="true"/>

      <div class="row">
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

export default {
  name: 'App',
  components: {FooterBar, Navigation}
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

</style>
