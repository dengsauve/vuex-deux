<template>
  <footer class="footer">
    <div class="container">
      <span class="text-muted">
        Made with ❤ by <a href="https://github.com/dengsauve" target="_blank">Dennis Sauvé</a>
      </span>
    </div>
  </footer>
</template>
<script>
export default {
  name: 'FooterBar'
}
</script>
<style>

.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 40px; /* Set the fixed height of the footer here */
  line-height: 40px; /* Vertically center the text there */
  background-color: #f5f5f5;
  text-align: center;
}
</style>