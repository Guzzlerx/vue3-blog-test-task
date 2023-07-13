import axios from "axios";
import { onMounted, ref } from "vue";

export const usePosts = (limit, page) => {
  const posts = ref([]);
  const isLoading = ref(true);
  const totalPages = ref(0);

  const fetching = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts",
        {
          params: {
            _page: page,
            _limit: limit,
          },
        }
      );

      posts.value = response.data;
      totalPages.value = Math.ceil(response.headers["x-total-count"] / limit);
    } catch (error) {
      console.error(error);
    } finally {
      isLoading.value = false;
    }
  };

  onMounted(fetching);

  return {
    isLoading,
    posts,
    totalPages,
  };
};
