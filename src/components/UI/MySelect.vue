<template>
  <select class="select" :value="modelValue" @change="changeOption">
    <option disabled value="">Выберите метод сортировки</option>
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.title }}
    </option>
  </select>
</template>

<script>
export default {
  name: "my-select",
  props: {
    modelValue: { type: String },
    options: { type: Array, default: () => [] },
  },
  methods: {
    changeOption(e) {
      this.$emit("update:modelValue", e.target.value);
    },
  },
};
</script>

<style scoped>
.select {
  padding: 10px 0;
}
</style>