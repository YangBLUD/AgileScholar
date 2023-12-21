import { createRouter, createWebHashHistory } from "vue-router";
const Main = () => import("../components/HelloWorld.vue");
const Scholar = () => import("../components/Scholar/scholar.vue");

const router = createRouter({
  history: createWebHashHistory(),
  routes:[
    {
      path: '/searchResult',
      component: ()=>import('../components/searchResult/searchResult.vue'),
    },
    {
      path: '/topnav',
      component: ()=>import('../components/TopNav.vue'),
    },
    { path: "/scholar", component: Scholar },
    { path: "/main", component: Main },
  ],
});

export default router;
