<template>
  <div class="navbar">
    <h3 class="navbar__title" @click="$router.push(PATH.ROOT_PAGE)">
      Блог с постами
    </h3>
    <div class="navbar__btns">
      <my-button @click="$router.push(PATH.POSTS_PAGE)">Блог</my-button>
      <my-button @click="$router.push(PATH.ABOUT_PAGE)">О сайте</my-button>
    </div>
  </div>
</template>

<script>
import { PATH } from "@/constants/path";

export default {
  data() {
    return {
      PATH,
    };
  },
};
</script>

<style scoped>
.navbar {
  height: 50px;
  background: lightgray;
  box-shadow: 2px 2px 4px gray;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}
.navbar__title {
  cursor: pointer;
}

.navbar__btns {
  display: flex;
  gap: 10px;
}
</style>