import { createRouter, createWebHistory } from "vue-router";
import MainPage from "@/pages/MainPage";
import PostsPage from "@/pages/PostsPage";
import PostsPageWithStore from "@/pages/PostsPageWithStore";
import PostsPageWithComposition from "@/pages/PostsPageWithComposition";
import AboutPage from "@/pages/AboutPage";
import PostDetailsPage from "@/pages/PostDetailsPage";
import { PATH } from "@/constants/path";

const routes = [
  { path: PATH.ROOT_PAGE, component: MainPage },
  { path: PATH.POSTS_PAGE, component: PostsPage },
  { path: PATH.STORED_POSTS_PAGE, component: PostsPageWithStore },
  { path: PATH.COMPOSITION_POSTS_PAGE, component: PostsPageWithComposition },
  { path: PATH.ABOUT_PAGE, component: AboutPage },
  {
    path: PATH.POST_DETAILS_PAGE,
    component: PostDetailsPage,
    name: "post_details",
  },
];

export const router = createRouter({ routes, history: createWebHistory() });
