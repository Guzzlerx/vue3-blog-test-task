<template>
  <div class="pages">
    <my-button
      @click="changePage"
      v-for="pageNumber in pages"
      :key="pageNumber"
      :class="{ page_active: currentPage === pageNumber }"
      >{{ pageNumber }}</my-button
    >
  </div>
</template>

<script>
export default {
  name: "my-pages",
  props: {
    pages: { type: Number, default: 1 },
    currentPage: { type: Number, default: 1 },
  },
  methods: {
    changePage(e) {
      this.$emit("changePage", Number(e.target.textContent));
    },
  },
};
</script>

<style scoped>
.pages {
  display: flex;
  gap: 5px;
  margin-top: 30px;
  justify-content: center;
}
.page_active {
  font-weight: bold;
  color: teal;
  border: 2px solid teal;
}
</style>