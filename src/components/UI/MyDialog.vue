<template>
  <div class="dialog" v-if="isActive === true" @click="closeDialog">
    <div class="dialog__content" @click.stop>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import toggleMixin from "@/mixins/toggleMixin";
export default {
  name: "my-dialog",
  mixins: [toggleMixin],
};
</script>

<style scoped>
.dialog {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgb(0, 0, 0, 0.5);
  display: flex;
}

.dialog__content {
  background-color: white;
  margin: auto;
  padding: 25px;
  border-radius: 12px;
  min-height: 50px;
  min-width: 300px;
  position: relative;
}
</style>