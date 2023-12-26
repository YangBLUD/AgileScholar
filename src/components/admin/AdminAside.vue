<template>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu"
            :collapse="!store.getters.getCollapse"
            background-color="#242f42"
            text-color="#bfcbd9"
            active-text-color="#20a0ff"
            :router = "true"
        >
            <template v-for="item in items">
                <el-menu-item :index="item.index" >
                    <el-icon>
                        <component :is="item.icon"></component>
                    </el-icon>
                    <template #title>{{ item.title }}</template>
                </el-menu-item>
            </template>
        </el-menu>
    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import store from '../../store';

const items = [
    {
        icon: 'Odometer',
        title: '首页',
        index: '/admin/home',
    },
    {
        icon: 'Edit',
        title: '处理事务',
        index: '/admin/table',
    },
    {
        icon: 'User',
        title: '个人主页',
        index: '/admin/info',
    },
];

</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 90px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
}
</style>