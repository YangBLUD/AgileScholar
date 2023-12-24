import { createRouter, createWebHashHistory } from "vue-router";
import store from "../store";
const Admin = () => import("../components/admin/Admin.vue");
const AdminHome = () => import("../components/admin/AdminHome.vue");
const AdminTable = () => import("../components/admin/AdminTable.vue");
const AdminInfo = () => import("../components/admin/AdminInfo.vue");
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
  {
    path: "/admin",
    redirect: "/admin/home",
  },
  {
    path: "/admin",
    meta: {
      keepAlive: true,
    },
    component: Admin,

    beforeEnter: (to, from, next) => {
      if (store.getters.getIsAdmin) {
        next();
      } else {
        alert("请先登录管理员账号");
      }
    },
    children: [
      {
        path: "home",
        name: "AdminHome",
        meta: {
          name: "AdminHome",
          keepAlive: true,
        },
        component: AdminHome,
      },
      {
        path: "table",
        name: "AdminTable",
        meta: {
          name: "AdminTable",
          keepAlive: true,
        },
        component: AdminTable,
      },
      {
        path: "info",
        name: "AdminInfo",
        meta: {
          name: "AdminInfo",
          keepAlive: true,
        },
        component: AdminInfo,
      },
    ],
  },
  {
    path: "/scholar/:id",
    name: "scholar",
    component: () => import("../components/Scholar/Scholar.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});

export default router;
