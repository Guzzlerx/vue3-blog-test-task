<template>
  <form @submit.prevent>
    <h3>Создание поста</h3>
    <my-input v-model="post.title" type="text" placeholder="Описание" />
    <my-input v-model="post.body" type="text" placeholder="Название" />
    <my-button class="btn" @click="createPost"> Создать </my-button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      post: {
        title: "",
        body: "",
      },
    };
  },
  methods: {
    createPost() {
      if (this.post.title && this.post.body) {
        this.post.id = Date.now();
        this.$emit("createPost", this.post);

        this.post = {
          title: "",
          body: "",
        };
      }
    },
  },
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}

.btn {
  align-self: flex-end;
  margin-top: 15px;
}
</style>