import { createRouter, createWebHashHistory } from "vue-router";
import store from "../store";

const Admin = () => import("../components/admin/Admin.vue");
const AdminHome =() => import("../components/admin/AdminHome.vue");
const AdminTable =() => import("../components/admin/AdminTable.vue");
const AdminInfo =() => import("../components/admin/AdminInfo.vue");

const routes = [
  {
    path: "/admin",
    redirect: "/admin/home",
  },
  { path: "/admin",
    meta:{
      keepAlive: true, 
    },
    component: Admin,
    
    beforeEnter: (to, from, next) =>{
      if (store.getters.getIsAdmin){
        next();
      }
      else {
        alert("请先登录管理员账号");
      }
    },
    children : [
      {
        path: "home",
        name: "AdminHome",
        meta:{
          name: "AdminHome",
          keepAlive: true, 
        },
        component: AdminHome,
      },
      {
        path: "table",
        name: "AdminTable",
        meta:{
          name: "AdminTable",
          keepAlive: true, 
        },
        component: AdminTable,
      },
      {
        path: "info",
        name: "AdminInfo",
        meta:{
          name: "AdminInfo",
          keepAlive: true, 
        },
        component: AdminInfo,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;
