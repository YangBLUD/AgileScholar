import { createRouter, createWebHashHistory } from "vue-router";
const HomePage = () => import("../views/HomePage/HomePage.vue");
const AdvancedSearch = () => import("../views/HomePage/AdvancedSearch.vue");
const Main = () => import("../components/HelloWorld.vue");
const routes = [
  { path: "/", redirect: "/home" },
  { path: "/main", component: Main },
  { path: "/home", component: HomePage },
  { path: "/advanced", component: AdvancedSearch },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes:[
    {
      path: '/searchResult',
      component: ()=>import('../components/searchResult/searchResult.vue'),
    },
    { path: "/", redirect: "/home" },
    { path: "/main", component: Main },
    { path: "/home", component: HomePage },
    { path: "/advanced", component: AdvancedSearch },
  ],
});
export default router;
