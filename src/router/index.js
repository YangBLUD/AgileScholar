import { createRouter, createWebHashHistory } from "vue-router";
const HomePage = () => import("../views/HomePage/HomePage.vue");
const AdvancedSearch = () => import("../views/HomePage/AdvancedSearch.vue");
const chatDemo = () => import("../components/Chat/chat.vue");
const ArticleDisplay = () =>
  import("../components/ArticleDisplay/ArticleDisplay.vue");
const InstitutionDisplay = () =>
  import("../components/InstitutionDisplay/InstitutionDisplay.vue");
const routes = [
  { path: "/", redirect: "/home" },
  { path: "/home", component: HomePage },
  { path: "/advanced", component: AdvancedSearch },
  { path: "/chatDemo", component: chatDemo },
  {
    path: "/article/:id",
    name: "article-display",
    component: ArticleDisplay,
    props: true,
  },
  {
    path: "/searchResult",
    component: () => import("../components/searchResult/searchResult.vue"),
  },
  {
    path: "/institution/:id",
    name: "institution-display",
    component: InstitutionDisplay,
    props: true,
  },
  {
    path: "/searchResult",
    component: () => import("../components/searchResult/searchResult.vue"),
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});
export default router;
