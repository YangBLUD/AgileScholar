import { createRouter, createWebHashHistory } from "vue-router";
const Main = () => import("../components/HelloWorld.vue");
const routes = [{ path: "/main", component: Main }];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;
