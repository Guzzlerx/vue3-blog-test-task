<template>
  <div>
    <h1>Страница с постами</h1>
    <my-input
      v-focus
      :model-value="searchQuery"
      @update:model-value="setSearchQuery"
      placeholder="Поиск..."
    />
    <div class="posts__btns">
      <my-button @click="toggleModal">Создать пост</my-button>
      <my-select
        :model-value="selectedSort"
        @update:model-value="setSelectedSort"
        :options="sortOptions"
      />
    </div>
    <my-dialog v-model:isActive="isModalActive">
      <post-form @createPost="createPost" />
    </my-dialog>
    <post-list
      v-if="!isPostsLoading"
      @removePost="removePost"
      :posts="sortedAndSearchedPosts"
    />
    <sync-loader class="posts__loader" v-else :loading="isPostsLoading" />
    <div
      v-intersection="loadMorePosts"
      class="posts__pagination-observer"
    ></div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
import SyncLoader from "vue-spinner/src/SyncLoader.vue";
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import MyButton from "@/components/UI/MyButton.vue";

export default {
  components: {
    PostForm,
    PostList,
    SyncLoader,
    MyButton,
  },
  data() {
    return {
      isModalActive: false,
    };
  },
  methods: {
    ...mapMutations({
      setPage: "post/setPage",
      setSearchQuery: "post/setSearchQuery",
      setSelectedSort: "post/setSelectedSort",
    }),
    ...mapActions({
      loadMorePosts: "post/loadMorePosts",
      fetchPosts: "post/fetchPosts",
    }),
    createPost(newPost) {
      this.posts.unshift(newPost);
      this.toggleModal();
    },
    removePost(postId) {
      this.posts = this.posts.filter((post) => post.id !== postId);
    },
    toggleModal() {
      this.isModalActive = !this.isModalActive;
    },
    changePage(pageNumber) {
      this.page = pageNumber;
    },
  },
  computed: {
    ...mapState({
      posts: (state) => state.post.posts,
      isPostsLoading: (state) => state.post.isPostsLoading,
      selectedSort: (state) => state.post.selectedSort,
      sortOptions: (state) => state.post.sortOptions,
      searchQuery: (state) => state.post.searchQuery,
      limit: (state) => state.post.limit,
      page: (state) => state.post.page,
      totalPages: (state) => state.post.totalPages,
    }),
    ...mapGetters({
      sortedPosts: "post/sortedPosts",
      sortedAndSearchedPosts: "post/sortedAndSearchedPosts",
    }),
  },
  mounted() {
    this.fetchPosts();
  },
};
</script>
  
<style scoped>
.posts__btns {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0;
}
.posts__loader {
  margin: 15px 0;
}

.posts__pagination-observer {
  height: 30px;
  visibility: hidden;
}
</style>