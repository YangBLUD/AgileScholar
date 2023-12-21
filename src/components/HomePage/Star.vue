<template>
  <div class="star-dialog" ref="showFavorite">
    <div style="margin: 20px 0">
      <span style="margin-left: 20px; font-weight: 600">Favorites</span>
      <el-button
        @click="createDialogShow"
        style="margin-right: 10px; float: right"
        >Create new folder</el-button
      >
    </div>
    <el-tree :data="favorites_list" :props="treeProps" ref="tree">
      <template v-slot="{ node, data: nodeData }">
        <div class="custom-tree-node">
          <span class="icon" v-if="nodeData.type == 0"
            ><el-icon><Document /></el-icon
          ></span>
          <span class="icon" v-if="nodeData.type == 1"
            ><el-icon><User /></el-icon
          ></span>
          <span class="icon" v-if="nodeData.type == 2"
            ><el-icon><House /></el-icon
          ></span>
          <span class="icon" v-if="nodeData.list != undefined"
            ><el-icon><Folder /></el-icon
          ></span>
          <span style="width: 220px; overflow: hidden">{{
            nodeData.name || nodeData.data.display_name || nodeData.data.title
          }}</span>
          <span>
            <el-button @click="remove(node, nodeData)">Delete</el-button>
          </span>
        </div>
      </template>
    </el-tree>
    <el-dialog
      v-model="showCreateDialog"
      @close="createDialogClose"
      :lock-scroll="false"
    >
      <template #header>
        <span class="dialog-footer" style="font-weight: 600">
          Create New Folder
        </span>
      </template>
      <el-form>
        <el-form-item label="New Folder Name" label-width="160px">
          <el-input v-model="newFolderName" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="createDialogClose">Cancel</el-button>
          <el-button @click="append">Create</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, onUnmounted } from "vue";
import { House, User, Document, Folder } from "@element-plus/icons-vue";
import axios from "axios";
import { useStore } from "vuex";
import type Node from "element-plus/es/components/tree/src/model/node";
import { ElDialog, ElForm, ElInput, ElButton, ElMessage } from "element-plus";
import { defineEmits } from "vue";
import { fa } from "element-plus/es/locale";
const Store = useStore();
const emit = defineEmits(["refresh"]);
const showFavorite = ref();
let listener;
let firstTime = true;
const newFolderName = ref("");
const showCreateDialog = ref(false);
const tree = ref();
onMounted(() => {
  //getFavorites();
  listener = document.addEventListener("click", (e) => {
    if (showFavorite.value) {
      if (firstTime) {
        firstTime = false;
        return;
      }
      let isSelf = showFavorite.value.contains(e.target);
      if (!isSelf) {
        emit("refresh");
      }
    }
  });
});
onUnmounted(() => {
  document.removeEventListener("click", listener);
});
function getFavorites() {
  let login = Store.getters.getLoginState;
  if (!login) {
    ElMessage.error("Please login first!");
    emit("refresh");
  } else {
    axios({
      url: "http://122.9.5.156:8000/api/v1/home/get_stars",
      method: "post",
      data: JSON.stringify({
        token: Store.getters.getUserinfo.token,
      }),
    })
      .then((res) => {
        favorites_list.value = res.data.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
const treeProps = {
  label: "name",
  children: "list", // 指定子节点的属性名
};
let favorites_list = ref([
  {
    name: "test",
    list: [
      {
        star_id: 2,
        type: 2,
        time: "2023-12-08 15:56:42",
        folder_id: 1,
        folder_name: "谢秉书没牛牛1",
        data: {
          display_name:
            "Omega Piezo Technologies (United States) asdasd asdadsa asdas",
          id: "4210092899",
          image_url: null,
          ror: "https://ror.org/00jch3e54",
          summary_stats: {
            cited_by_count: 856,
            "2yr_i10_index": 0,
            h_index: 16,
            i10_index: 22,
            oa_percent: 8.97,
            "2yr_mean_citedness": 0.5,
            works_count: 78,
            "2yr_works_count": 2,
            "2yr_h_index": 0,
            "2yr_cited_by_count": 40,
          },
        },
      },
      {
        star_id: 1,
        type: 1,
        time: "2023-12-08 15:56:12",
        folder_id: 1,
        folder_name: "谢秉书没牛牛1",
        data: {
          display_name: "R.S. Cheng",
          id: "5049524680",
          most_cited_work:
            "Multiuser OFDM with adaptive subcarrier, bit, and power allocation (1999)",
          cited_by_count: 9116,
          summary_stats: {
            cited_by_count: 9116,
            "2yr_i10_index": 0,
            h_index: 40,
            i10_index: 105,
            oa_percent: 12.15,
            "2yr_mean_citedness": 3.0,
            works_count: 321,
            "2yr_works_count": 3,
            "2yr_h_index": 1,
            "2yr_cited_by_count": 359,
          },
          orcid: "https://orcid.org/0000-0001-6677-8737",
        },
      },
    ],
    folder_id: 1,
    num: 2,
  },
]);
function handleClose() {
  emit("refresh");
}
function createDialogShow() {
  showCreateDialog.value = true;
}
function createDialogClose() {
  showCreateDialog.value = false;
  newFolderName.value = "";
}
function append() {
  if (newFolderName.value == "") {
    ElMessage.error("Please enter the name of new folder!");
    return;
  }
  showCreateDialog.value = false;
  //新建收藏夹
  axios({
    url: "http://122.9.5.156:8000/api/v1/home/create_folder",
    method: "post",
    data: JSON.stringify({
      token: Store.getters.getUserinfo.token,
      folder_name: newFolderName.value,
    }),
  })
    .then((res) => {
      if (res.data.errno == 0) {
        ElMessage.success("Create successfully");
        let n = res.data.data.folder_name;
        let i = res.data.data.folder_id;
        favorites_list.value.push({
          name: newFolderName.value,
          folder_id: i,
          num: 0,
          list: [],
        });
      } else {
        ElMessage.error("Create failed!");
      }
    })
    .catch((err) => {
      console.log(err);
      ElMessage.error("Create failed!");
    });
}
function remove(node: Node, data) {
  if (data.star_id) {
    //删除收藏
    // const parent = node.parent;
    // const children = parent.data.list || parent.data;
    // const index = children.findIndex((d) => d.id === node.data.id);
    // // 删除
    // children.splice(index, 1);
    // const index = favorites_list.findIndex(
    //   (d) => d.folder_id === data.folder_id
    // );
    // const newItem = favorites_list[index];
    // const index2 = favorites_list[index].list.findIndex((s) => {
    //   return s.star_id === data.star_id;
    // });
    // const newArray = favorites_list[index].list.splice(index2, 1);
    // newItem.list = newArray;
    // console.log(newItem);
    // favorites_list.splice(index, 1);
    axios({
      url: "http://122.9.5.156:8000/api/v1/home/home/unstar",
      method: "post",
      data: JSON.stringify({
        token: Store.getters.getUserinfo.token,
        star_id: data.star_id,
      }),
    })
      .then((res) => {
        if (res.data.errno == 0) {
          //暂时用的刷新机制，因为正常删除删不掉只能同步了
          axios({
            url: "http://122.9.5.156:8000/api/v1/home/get_stars",
            method: "post",
            data: JSON.stringify({
              token: Store.getters.getUserinfo.token,
            }),
          })
            .then((res) => {
              favorites_list.value = res.data.data;
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          ElMessage.error("Delete failed!");
        }
      })
      .catch((err) => {
        console.log(err);
        ElMessage.error("Delete failed!");
      });
  } else {
    //删除收藏夹
    const index = favorites_list.value.findIndex(
      (d) => d.folder_id === data.folder_id
    );
    favorites_list.value.splice(index, 1);
    axios({
      url: "http://122.9.5.156:8000/api/v1/home/delete_folder",
      method: "post",
      data: JSON.stringify({
        token: Store.getters.getUserinfo.token,
        folder_id: data.folder_id,
      }),
    })
      .then((res) => {
        if (res.data.errno == 0) {
        } else {
          ElMessage.error("Delete failed!");
        }
      })
      .catch((err) => {
        console.log(err);
        ElMessage.error("Delete failed!");
      });
  }
}
</script>
<style scoped lang="scss">
.star-dialog {
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  box-shadow: black 0px 0px 3px 0px;
  width: 400px;
  max-height: 500px;
  background-color: white;
  position: fixed;
  top: 65px;
  right: 80px;
  overflow-y: auto;
  z-index: 999;
}
.icon {
  width: 10px;
  margin-left: 5px;
  padding-top: 5px;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
:deep(.el-tree-node__content) {
  height: 50px !important;
  background-color: transparent;
  &:hover {
    background: #cccccc;
  }
}
:deep(.el-tree) {
  background-color: transparent !important;
}
:deep(.el-button) {
  background-color: #f0f4ff;
  color: black;
}
</style>
