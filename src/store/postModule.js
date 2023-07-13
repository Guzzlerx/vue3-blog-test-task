import { sortOptions } from "@/constants/sortOptions";
import axios from "axios";

export const postModule = {
  state: () => ({
    posts: [],
    isPostsLoading: true,
    selectedSort: "",
    sortOptions: sortOptions,
    searchQuery: "",
    limit: 10,
    page: 1,
    totalPages: 0,
  }),
  getters: {
    sortedPosts(state) {
      return [...state.posts].sort((post1, post2) =>
        post1[state.selectedSort]?.localeCompare(post2[state.selectedSort])
      );
    },
    sortedAndSearchedPosts(state, getters) {
      return getters.sortedPosts.filter(
        (post) =>
          post.title?.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
          post.body?.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
    },
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts;
    },
    setIsLoading(state, loading) {
      state.isPostsLoading = loading;
    },
    setSelectedSort(state, sort) {
      state.selectedSort = sort;
    },
    setSearchQuery(state, search) {
      state.searchQuery = search;
    },
    setPage(state, page) {
      state.page = page;
    },
    setTotalPages(state, pages) {
      state.totalPages = pages;
    },
  },
  actions: {
    async fetchPosts({ state, commit }) {
      try {
        commit("setIsLoading", true);

        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _page: state.page,
              _limit: state.limit,
            },
          }
        );

        commit(
          "setTotalPages",
          Math.ceil(response.headers["x-total-count"] / state.limit)
        );
        commit("setPosts", response.data);
      } catch (e) {
        console.error(e);
      } finally {
        commit("setIsLoading", false);
      }
    },
    async loadMorePosts({ state, commit }) {
      if (state.posts.length > 1) {
        commit("setPage", state.page + 1);

        try {
          const response = await axios.get(
            "https://jsonplaceholder.typicode.com/posts",
            {
              params: {
                _page: state.page,
                _limit: state.limit,
              },
            }
          );

          commit("setPosts", [...state.posts, ...response.data]);
        } catch (error) {
          console.error(error);
        }
      }
    },
  },
  namespaced: true,
};
