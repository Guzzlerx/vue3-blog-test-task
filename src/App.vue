<template>
  <nav-bar></nav-bar>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";

export default {
  components: { NavBar },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
}

.app {
  padding: 20px;
}
</style>