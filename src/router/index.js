import {createRouter,createWebHashHistory} from 'vue-router'
const Login=()=>import('../components/HelloWorld.vue')
const routes = [
    { path: '/login', component: Login },
]
const router = createRouter({
    history: createWebHashHistory(),
    routes,
})
export default router
