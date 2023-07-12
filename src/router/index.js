import { createRouter, createWebHistory } from "vue-router";
import MainPage from "@/pages/MainPage";
import PostsPage from "@/pages/PostsPage";
import AboutPage from "@/pages/AboutPage";
import PostDetailsPage from "@/pages/PostDetailsPage";
import { PATH } from "@/constants/path";

const routes = [
  { path: PATH.ROOT_PAGE, component: MainPage },
  { path: PATH.POSTS_PAGE, component: PostsPage },
  { path: PATH.ABOUT_PAGE, component: AboutPage },
  {
    path: PATH.POST_DETAILS_PAGE,
    component: PostDetailsPage,
    name: "post_details",
    props: true,
  },
];

export const router = createRouter({ routes, history: createWebHistory() });
