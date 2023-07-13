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
import { usePosts } from "@/hooks/usePosts";
import { useLoadMorePosts } from "@/hooks/useLoadMorePosts";
import { useSortedPosts } from "@/hooks/useSortedPosts";
import { useSortedAndSearchedPosts } from "@/hooks/useSortedAndSearchedPosts";
import SyncLoader from "vue-spinner/src/SyncLoader.vue";
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import { sortOptions } from "@/constants/sortOptions";
import { ref } from "vue";

export default {
  components: { PostForm, PostList, SyncLoader },
  data() {
    return {
      sortOptions: sortOptions,
    };
  },
  setup() {
    const postsLimit = 10;
    const page = ref(1);
    const isModalActive = ref(false);

    const { isLoading, posts, totalPages } = usePosts(postsLimit, page);
    const { selectedSort, sortedPosts } = useSortedPosts(posts);
    const { searchQuery, sortedAndSearchedPosts } =
      useSortedAndSearchedPosts(sortedPosts);

    const loadMorePosts = () => {
      useLoadMorePosts(posts, page, postsLimit);
    };

    const toggleModal = () => {
      isModalActive.value = !isModalActive.value;
    };

    const createPost = (newPost) => {
      posts.value.unshift(newPost);
      toggleModal();
    };

    const removePost = (postId) => {
      posts.value = posts.value.filter((post) => post.id !== postId);
    };

    return {
      isLoading,
      totalPages,
      selectedSort,
      searchQuery,
      sortedPosts,
      sortedAndSearchedPosts,
      isModalActive,
      toggleModal,
      createPost,
      removePost,
      loadMorePosts,
      //   fetching,
    };
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