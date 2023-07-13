export default {
  props: {
    isActive: { type: Boolean, default: false },
  },
  methods: {
    closeDialog() {
      this.$emit("update:isActive", false);
    },
  },
  mounted() {},
};
