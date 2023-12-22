import { createRouter, createWebHashHistory } from "vue-router";
const HomePage = () => import("../views/HomePage/HomePage.vue");
const AdvancedSearch = () => import("../views/HomePage/AdvancedSearch.vue");
const chatDemo = () => import("../components/Chat/chat.vue");
const routes = [
  { path: "/", redirect: "/home" },
  { path: "/home", component: HomePage },
  { path: "/advanced", component: AdvancedSearch },
  { path: "/chatDemo", component: chatDemo},
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;
