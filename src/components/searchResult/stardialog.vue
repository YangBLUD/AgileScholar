<template>
    <el-icon @click="centerDialogVisible = true"><StarFilled /></el-icon>
    <el-dialog  
      v-model="centerDialogVisible"
      title="choose a folder"
      class="tan-win"
      align-center
    >
        <!-- <el-table :data="props.folderlist"  @row-click="handleEdit" >
            <el-table-column property="folder_id" label="Folder_id" width="150px" />
            <el-table-column property="folder_name" label="Name" width="200px" />
            <el-table-column property="num" label="Star_num" width="150px"/>
            <el-table-column label="operation" width="200px" algin="center">
                <div class="add">add</div>
            </el-table-column>      
        </el-table> -->
        <div class="folder-list">
          <div class="folder-item" v-for="item in props.folderlist">
            <div class="item-checkbox">
              <el-checkbox v-model="sel_list" label="Option 1" size="large" />
            </div>
            <div class="item-name">
              {{ item.folder_name }}
            </div>
            <div class="item-num">
              {{ item.num }}
            </div>
          </div>
        </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="centerDialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="centerDialogVisible = false">
            Confirm
          </el-button>
        </span>
      </template>
    </el-dialog>
  </template>
<script setup>
  import { Edit ,DocumentAdd,StarFilled,Link} from "@element-plus/icons-vue";
  import { defineProps } from 'vue';
  import { reactive, ref, onMounted, onUnmounted ,onBeforeMount} from "vue";
  import axios from "axios";
  import stardialog from "./stardialog.vue";
  import { useStore } from "vuex";
  const Store = useStore();
  const centerDialogVisible = ref(false)
  const props = defineProps({
      folderlist:Array,
      token:String,
      paper_id:String,    
      type:Number,
  })
  function handleEdit(row) {
  console.log(row);
      centerDialogVisible.value = false;
      return;
      let folder_id = row.folder_id;
      axios({
          url: "http://122.9.5.156:8000/api/v1/home/star",
          method: "post",
          data: JSON.stringify({    
                  token :props.token,
                  paper_id:props.paper_id,
                  type:props.type,
                  folder_id:folder_id,
          }),
          })
          .then((res) => {
                  console.log(res);
          })
          .catch((err) => {
              console.log(err);
          });
	}
//记录有什么元素被选中了
const sel_list = ref([]);

</script>
<style scoped>
  .tan-win{
    width:30%;
    border-radius: 10%;
  }  
  .folder-list{
    display: inline;
    .folder-item{
      display: flex;
      .item-checkbox{
        width: 5%;
        height: 5%;
      }
      .item-name{

      }
      .item-num{

      }
    }
  }
</style>
  