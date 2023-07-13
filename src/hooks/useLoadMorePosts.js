import axios from "axios";

export const useLoadMorePosts = async (posts, page, limit) => {
  if (posts.value.length > 1) {
    page.value += 1;

    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts",
        {
          params: {
            _page: page.value,
            _limit: limit,
          },
        }
      );

      posts.value = [...posts.value, ...response.data];
    } catch (error) {
      console.error(error);
    }
  }
};
