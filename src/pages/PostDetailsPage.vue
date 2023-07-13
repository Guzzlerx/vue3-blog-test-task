<template>
  <div class="post">
    <h2>Инфо о посте номер - {{ this.$route.params.id }}</h2>
    <div v-if="post.title">
      <h3 class="post__title">
        <strong>Заголовок:</strong> {{ this.post.title }}
      </h3>
      <p><strong>Описание:</strong> {{ this.post.body }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      post: {
        title: "",
        body: "",
        id: 0,
      },
    };
  },
  methods: {
    getPost() {
      const { title, body } = this.$store.state.post.posts.find(
        (post) => post.id === parseInt(this.$route.params.id)
      );

      this.post.title = title;
      this.post.body = body;
    },
  },
  mounted() {
    if (this.$store.state.post.posts.length) {
      this.getPost();
    }
  },
};
</script>

<style scoped>
.post {
  display: flex;
  flex-direction: column;
  gap: 15px;
  border: 2px solid teal;
  padding: 20px;
}

.post__title {
  font-weight: 400;
}
</style>