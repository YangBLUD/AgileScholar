import { createRouter, createWebHashHistory } from "vue-router";
const HomePage = () => import("../views/HomePage/HomePage.vue");
const AdvancedSearch = () => import("../views/HomePage/AdvancedSearch.vue");
const Main = () => import("../components/HelloWorld.vue");
const ArticleDisplay = () => import("../components/ArticleDisplay/ArticleDisplay.vue");
const InstitutionDisplay = () => import("../components/InstitutionDisplay/InstitutionDisplay.vue");
const routes = [
  { path: "/", redirect: "/home" },
  { path: "/main", component: Main },
  { path: "/home", component: HomePage },
  { path: "/advanced", component: AdvancedSearch },
  {
    path: "/main",
    component: Main
  },
  {
    path: "/article/:id",
    name: "article-display",
    component: ArticleDisplay,
    props: true,
  },
  {
    path: "/institution",
    component: InstitutionDisplay
  }
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;
