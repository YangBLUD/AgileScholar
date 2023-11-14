<template>
  <el-container class="layout-container-demo" style="height: 500px">
    <el-aside width="200px">
      <el-scrollbar>
        <el-menu :default-openeds="['team']">
          <el-sub-menu index="team">
            <template #title>
              <el-icon><message /></el-icon>团队交流
            </template>
            <el-menu-item index="public">公共群聊</el-menu-item>
            <el-menu-item-group>
              <template #title>个人私聊</template>
              <template v-for="(item, index) in contactList" :key="index">
                <el-menu-item :index="item">{{item.name}}</el-menu-item>
              </template>
            </el-menu-item-group>
          </el-sub-menu>
          <el-sub-menu index="project">
            <template #title>
              <el-icon><icon-menu /></el-icon>项目管理
            </template>
            <el-menu-item index="add">创建项目</el-menu-item>
            <el-menu-item-group>
              <template #title>已有项目</template>
              <template v-for="(item, index) in projectList" :key="index">
                <el-menu-item :index="item">{{item.name}}</el-menu-item>
              </template>
            </el-menu-item-group>
          </el-sub-menu>
          <el-sub-menu index="member">
            <template #title>
              <el-icon><setting /></el-icon>成员管理
            </template>
            <el-menu-item index="info">成员信息</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <div class="toolbar">
          <el-dropdown>
            <el-icon style="margin-right: 8px; margin-top: 1px"
            ><setting
            /></el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>View</el-dropdown-item>
                <el-dropdown-item>Add</el-dropdown-item>
                <el-dropdown-item>Delete</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <span>Tom</span>
        </div>
      </el-header>

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { Menu as IconMenu, Message, Setting } from '@element-plus/icons-vue'
import {ref} from "vue";
const contactList = ref([])
const projectList = ref([])
// 添加的测试数据
projectList.value.push({
  name: '小学期',
},{
  name: '软工一'
})
contactList.value.push({
  name: '谢秉书',
  messageList: []
}, {
  name: '吴骁',
  messageList: []
},{
  name: '周霄',
  messageList: []
})
const item = {
  date: '2016-05-02',
  name: 'Tom',
  address: 'No. 189, Grove St, Los Angeles',
}
const tableData = ref(Array.from({ length: 20 }).fill(item))
</script>

<style scoped>
.layout-container-demo .el-header {
  position: relative;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
}
.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
}
.layout-container-demo .el-menu {
  border-right: none;
}
.layout-container-demo .el-main {
  padding: 0;
}
.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
</style>