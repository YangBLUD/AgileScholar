import { createRouter, createWebHashHistory } from "vue-router";
const Main = () => import("../components/HelloWorld.vue");
const Scholar = () => import("../components/Scholar/scholar.vue");
const routes = [
    { path: "/main", component: Main },
  { path: "/scholar", component: Scholar },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
