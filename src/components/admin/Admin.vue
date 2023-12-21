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
import AdminHome from './AdminHome.vue';
import AdminTable from './AdminTable.vue';
import AdminInfo from './AdminInfo.vue';

import store from '../../store';

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