<template>
    <AdminHeader></AdminHeader>
    <AdminAside></AdminAside>
    <div :class="[store.getters.getCollapse ? 'content-box' : 'content-collapse']">
        <div class="content">
            <router-view v-slot="{ Component }">
                <keep-alive :include="['AdminHome', 'AdminTable', 'AdminInfo']">
                    <component :is="Component"></component>
                </keep-alive>
            </router-view>
        </div>
    </div>
</template>

<script setup>
import AdminHeader from './AdminHeader.vue'
import AdminAside from './AdminAside.vue'

import axios from 'axios';
import { onBeforeMount } from 'vue'

import store from '../../store';
import { useStore } from 'vuex';

const Store = useStore();
onBeforeMount(() => {
    // axios({
    //     url: 'http://122.9.5.156:8000/api/v1/home/user/login',
    //     method: 'post',
    //     data: JSON.stringify({
    //         "token" : "eyJ0eXAiOiJqd3QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJhZG1pbjEiLCJ0eXBlIjoiYWRtaW4iLCJleHAiOjE3MDIzMTUxOTQuNDY2OTU1N30.02rT2FBiOQdP32Awbfw1xRDmxOYwU6DuQahOAUMNa4Q",
    //         "username" : "admin1",
    //         "password" : "123456"
    //     })
    // }).then(res =>{
    //     console.log(res.data)
    //     console.log("管理员登录成功！")
    // }).catch(err => {
    //     console.log(err)
    // })
    console.log("begin get the data")
    axios({
        url: 'http://122.9.5.156:8000/api/v1/admin/get_affairs',
        method: 'post',
        data: JSON.stringify({
            "token": store.getters.getUserinfo.token
        })
    }).then(res => {
        console.log(res.data)
        store.commit('initAffairList', res.data.data)
        //console.log(store.getters.getAppealList)
        //console.log(store.getters.getAffairList)
    }).catch(err => {
        console.log(err)
    })

}
)
</script>

<style scoped>
.content-collapse {
    left: 65px;
    position: absolute;
    right: 0;
    top: 90px;
    bottom: 0;
    padding-bottom: 30px;
    -webkit-transition: left .3s ease-in-out;
    transition: left .3s ease-in-out;
    background: #f0f0f0;
    box-sizing: border-box;
}

.content-box {
    position: absolute;
    left: 250px;
    right: 0;
    top: 90px;
    bottom: 0;
    padding-bottom: 30px;
    -webkit-transition: left .3s ease-in-out;
    transition: left .3s ease-in-out;
    background: #f0f0f0;
    box-sizing: border-box;
}

.content {
    width: auto;
    height: 100%;
    padding: 10px;
    overflow-y: scroll;
    box-sizing: border-box;
}
</style>