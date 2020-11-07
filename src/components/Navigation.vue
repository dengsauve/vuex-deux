<template>
  <nav class="navbar navbar-light bg-light">
    <a class="navbar-brand">{{title}}</a>
    <form class="form-inline" v-if="searchbar">
      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>
    <button class="btn btn-outline-secondary" v-if="add">+ Add List</button>
  </nav>
</template>
<script>
export default {
  name: 'Navigation',
  props: [
      'title',
      'searchbar',
      'add',
  ]
}
</script>
