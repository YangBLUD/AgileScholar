<template>
  <div class="history-dialog" ref="showDialog">
    <div style="margin-top: 18px">
      <span style="margin-left: 20px; font-weight: 600">Browsing history</span>
      <el-button
        type="primary"
        @click="clearAll()"
        style="margin-right: 10px; float: right"
        >Clear All</el-button
      >
    </div>
    <el-table :data="history_list" max-height="500px">
      <el-table-column width="100px">
        <template #default="{ row, $index }">
          <span v-if="row.type == 0">Article</span>
          <span v-if="row.type == 1">Author</span>
          <span v-if="row.type == 2">Institution</span>
        </template>
      </el-table-column>
      <el-table-column>
        <template #default="{ row, $index }">
          <span v-if="row.type == 0">{{ row.data.title }}</span>
          <span v-if="row.type == 1">{{ row.data.display_name }}</span>
          <span v-if="row.type == 2">{{ row.data.display_name }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { defineEmits } from "vue";
import axios from "axios";
import { ElDialog, ElForm, ElInput, ElButton, ElMessage } from "element-plus";
import { useStore } from "vuex";
const Store = useStore();
const showDialog = ref();
let listener;
let firstTime = true;
onMounted(() => {
  getHistory();
  listener = document.addEventListener("click", (e) => {
    if (showDialog.value) {
      if (firstTime) {
        firstTime = false;
        return;
      }
      let isSelf = showDialog.value.contains(e.target);
      if (!isSelf) {
        emit("refresh");
      }
    }
  });
});
onUnmounted(() => {
  document.removeEventListener("click", listener);
});
const emit = defineEmits(["refresh"]);
function hide() {
  emit("refresh");
}
const history_list = ref([]);
function clearAll() {
  axios({
    url: "http://122.9.5.156:8000/api/v1/home/clear_history",
    method: "post",
    data: JSON.stringify({
      token: Store.getters.getUserinfo.token,
    }),
  })
    .then((res) => {
      if (res.data.errno == 0) {
        ElMessage.success("Clear successfully!");
        history_list.value = [];
      } else {
        ElMessage.error("Clear failed!");
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
function getHistory() {
  let login = Store.getters.getLoginState;
  if (!login) {
    ElMessage.error("Please login first!");
    emit("refresh");
  } else {
    axios({
      url: "http://122.9.5.156:8000/api/v1/home/get_history",
      method: "post",
      data: JSON.stringify({
        token: Store.getters.getUserinfo.token,
      }),
    })
      .then((res) => {
        history_list.value = res.data.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
function handleClose() {
  emit("refresh");
}
</script>
<style scoped lang="scss">
.history-dialog {
  padding: 3px;
  width: 300px;
  background-color: white;
  position: fixed;
  top: 65px;
  right: 120px;
  z-index: 999;
}
:deep(.el-button) {
  background-color: #f0f4ff;
  color: black;
  &:hover {
    background-color: #b7cbff;
  }
}
:deep(.el-table) {
  background-color: #f0f4ff;
  color: black;
  &:hover {
    background-color: #b7cbff;
  }
}
</style>
