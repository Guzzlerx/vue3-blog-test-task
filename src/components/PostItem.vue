<template>
  <article class="post">
    <div>
      <h4 class="post__title"><strong>Название: </strong>{{ post.title }}</h4>
      <p><strong>Описание: </strong>{{ post.body }}</p>
    </div>
    <div class="post__btns">
      <my-button @click="$emit('removePost', post.id)">Удалить</my-button>
    </div>
  </article>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.post {
  padding: 15px;
  border: 2px solid teal;
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.post__title {
  font-weight: 400;
}
</style>