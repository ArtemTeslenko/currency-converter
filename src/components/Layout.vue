<script setup>
import Header from "./Header.vue";
</script>

<template>
  <div class="mainContainer">
    <Header />
    <slot />
  </div>
</template>

<style scoped>
.mainContainer {
  /* outline: 1px solid pink; */
  width: 480px;
  min-height: 100vh;
  margin: 0 auto;
}
</style>
