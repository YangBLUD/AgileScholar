import {createRouter,createWebHashHistory} from 'vue-router'
const Login=()=>import('../components/HelloWorld.vue')
const Main=()=>import('../components/groupManagement/main.vue')
const routes = [
    { path: '/login', component: Login },
    { path: '/main', component: Main},

]
const router = createRouter({
    history: createWebHashHistory(),
    routes,
})
export default router