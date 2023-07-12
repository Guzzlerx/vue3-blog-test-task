<template>
  <div>
    <h1>Страница с постами</h1>
    <my-input v-focus v-model="searchQuery" placeholder="Поиск..." />
    <div class="posts__btns">
      <my-button @click="toggleModal">Создать пост</my-button>
      <my-select v-model="selectedSort" :options="sortOptions" />
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
import axios from "axios";
import SyncLoader from "vue-spinner/src/SyncLoader.vue";
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import { sortOptions } from "@/constants/sortOptions";

export default {
  components: { PostForm, PostList, SyncLoader },
  data() {
    return {
      posts: [],
      isModalActive: false,
      isPostsLoading: true,
      selectedSort: "",
      sortOptions: sortOptions,
      searchQuery: "",
      limit: 10,
      page: 1,
      totalPages: 0,
    };
  },
  methods: {
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
    async fetchPosts() {
      try {
        this.isPostsLoading = true;

        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _page: this.page,
              _limit: this.limit,
            },
          }
        );

        this.totalPages = Math.ceil(
          response.headers["x-total-count"] / this.limit
        );
        this.posts = response.data;
      } catch (e) {
        console.error(e);
      } finally {
        this.isPostsLoading = false;
      }
    },
    async loadMorePosts() {
      this.page += 1;

      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _page: this.page,
              _limit: this.limit,
            },
          }
        );

        this.posts = [...this.posts, ...response.data];
      } catch (error) {
        console.error(error);
      }
    },
    changePage(pageNumber) {
      this.page = pageNumber;
    },
  },
  mounted() {
    this.fetchPosts();
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((post1, post2) =>
        post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
      );
    },
    sortedAndSearchedPosts() {
      return this.sortedPosts.filter(
        (post) =>
          post.title?.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          post.body?.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  watch: {},
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