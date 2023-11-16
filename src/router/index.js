import { createRouter, createWebHashHistory } from "vue-router";
const Main = () => import("../components/HelloWorld.vue");
const routes = [{ path: "/main", component: Main }];
const router = createRouter({
  history: createWebHashHistory(),
  routes:[
    {
      path: '/searchResult',
      component: ()=>import('../components/searchResult/searchResult.vue'),
    },
  ],
});
export default router;
