<template>
    <el-icon @click="centerDialogVisible = true"><StarFilled /></el-icon>
    <el-dialog  
      v-model="centerDialogVisible"
      title="choose a folder"
      width="50%"
      align-center
    >
        <el-table :data="props.folderlist"  @row-click="handleEdit" >
            <el-table-column property="folder_id" label="Folder_id" width="150px" />
            <el-table-column property="folder_name" label="Name" width="200px" />
            <el-table-column property="num" label="Star_num" width="150px"/>
            <el-table-column label="operation" width="200px" algin="center">
                <div class="add">add</div>
            </el-table-column>      
        </el-table>
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
</script>
<style scoped>
  .dialog-footer button:first-child {
    margin-right: 10px;
  }
  .add:hover{
    font-weight: 600;
    cursor: pointer;
  }
  </style>
  