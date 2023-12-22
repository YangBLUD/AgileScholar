<template>
    <el-icon @click="start"><StarFilled /></el-icon>
    <el-dialog  
      v-model="centerDialogVisible"
      class="tan-win"
      width="30%"
      align-center
    >
        <div class="title"> Add To Folder</div>
        <div class="folder-list">
          <div class="folder-item" v-for="item in fold">
            <div class="item-checkbox">
              <el-checkbox size="large" @click="addfold(item)"/>
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
          <el-button type="primary" @click="handleEdit" class="btn">
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
  import { useRouter } from "vue-router";
  const router = useRouter ();

  const centerDialogVisible = ref(false)
  const props = defineProps({
      token:String,
      paper_id:String,    
      type:Number,
  })
function getfold(){
    axios({
      url: "http://122.9.5.156:8000/api/v1/home/get_folders",
      method: "post",
      data: JSON.stringify({    
            token :props.token,
      }),
    })
      .then((res) => {
            console.log(res);
            fold.value = res.data.data
      })
      .catch((err) => {
        console.log(err);
      });
}

  const fold = ref([])
  function start(){
    if(props.token==""){
      router.push({ path: "home"});
    }
    centerDialogVisible.value = true;
    getfold();
    choose.value = [];
  }
  const choose = ref([]);
  function addfold(item){
    for(let i=0;i<choose.value.length;i++){
      if(choose.value[i].folder_id == item.folder_id){
        return;
      }
    }
    console.log(item);
    choose.value.push(item);
  }
  function handleEdit() {
      centerDialogVisible.value = false;
      for(let i = 0;i < choose.value.length;i++){
        let folder_id = choose.value[i].folder_id;
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
      
	}

</script>
<style scoped>
  .tan-win{
    border-radius: 10%;
    padding-top: 5px;
  }  
  .title{
      position: relative;
      top:-30px;
      margin-left: 33%;
      font-size: 20px;
      font-weight: 500;
    }
    .btn{
      position: relative;
      left: -150px;
    }
  .folder-list{
    margin-left: 10%;
    .folder-item{
      .item-checkbox{
        display: inline-block;
      }
      .item-name{
        margin-left: 20px;
        display: inline-block;
      }
      .item-num{
        margin-left: 40%;
        font-size: 14px;
        font-weight: 300;
        display: inline-block;
      }
    }
  }
</style>
  