<template> 
    <el-header class="header"> 
      <p class="text">管理员页面</p> 
      <img src="../assets/vue.svg" class="avatar" alt="avatar" @click="toggleCard"/>
      <el-button round>退出登录</el-button>
      <div class="card" v-show="showCard">
        <p>个人信息</p>
        <p>用户名：{{ username }}</p>
        <p>角色：管理员</p>
        <p>邮箱：admin@example.com</p>
      </div>
    </el-header> 
    <el-main> 
        <el-row> 
          <el-col :span="4"> 
            <el-form label-position="left" label-width="100px"> 
              <el-form-item label="状态"> 
                <el-select v-model="status" placeholder="请选择"> 
                  <el-option label="全部" value="all"></el-option> 
                  <el-option label="未处理" value="false"></el-option> 
                  <el-option label="已处理" value="true"></el-option> 
                </el-select> 
              </el-form-item> 
              <el-form-item label="类型"> 
                <el-select v-model="type" placeholder="请选择"> 
                <el-option label="全部" value="all"></el-option> 
                <el-option label="A" value="A"></el-option> 
                <el-option label="B" value="B"></el-option> 
                <el-option label="C" value="C"></el-option> 
                </el-select> 
              </el-form-item> 
            </el-form> 
          </el-col>
          <el-col :span="20"> 
            <el-scrollbar height="500px"> 
              <p v-for="item in filteredList" class="item"> 
                <span>姓名：{{ item.name }}</span> 
                <span>类型：{{ item.type }}</span> 
                <span>日期：{{ item.date }}</span>
                <span :class="item.isResult ? 'result' : 'no-result'"> {{ item.isResult ? "已处理" : "未处理" }} </span> 
              </p> 
            </el-scrollbar> 
          </el-col> 
        </el-row> 
      </el-main> 
    </template>

<script lang="ts" setup> 
import { computed, ref } from "vue";

//举报
class inform {
  id: number;
  name:string;
  date: string;
  academic_id: number;
  comment_id: number;
  user_id: number;
  content: string;
  file: string;
  //file: File;
  status: string;
  results: string;
}

//申诉
class appeal {
  id: number;
  date: string;
  user_id: number;
  content: string;
  file: string;
  //file: File;
  status: string;
  results: string;
}

//认证申请
class apply {
  id: number;
  user_id: number;
  content: string;
  file: string;
  //file: File;
  isSuccess: boolean;
  mysql_id: number;
}

let informList: inform[] = [
  {id: 1, name: "name1", date: "2023-12-5", academic_id: 1, comment_id: 1, user_id: 1, content: "这是举报材料1", file: "这是举报文件1", status: "举报状态1", results:"举报处理结果1"},
  {id: 2, name: "name2", date: "2023-12-5", academic_id: 2, comment_id: 2, user_id: 2, content: "这是举报材料2", file: "这是举报文件2", status: "举报状态2", results:"举报处理结果2"},
  {id: 3, name: "name3", date: "2023-12-5", academic_id: 3, comment_id: 3, user_id: 3, content: "这是举报材料3", file: "这是举报文件3", status: "举报状态3", results:"举报处理结果3"},
]

let appealList: appeal[] = [
  {id: 1, date: "2023-12-5", user_id: 1, content: "这是申诉材料1", file: "这是申诉文件1", status: "申诉状态1", results:"申诉处理结果1"},
  {id: 2, date: "2023-12-5", user_id: 2, content: "这是申诉材料2", file: "这是申诉文件2", status: "申诉状态2", results:"申诉处理结果2"},
  {id: 3, date: "2023-12-5", user_id: 3, content: "这是申诉材料3", file: "这是申诉文件3", status: "申诉状态3", results:"申诉处理结果3"},
]

let applyList: apply[] = [
  {id: 1, user_id: 1, content: "这是认证材料1", file: "这是认证文件1", isSuccess: true, mysql_id: 1},
  {id: 2, user_id: 2, content: "这是认证材料2", file: "这是认证文件2", isSuccess: true, mysql_id: 2},
  {id: 3, user_id: 3, content: "这是认证材料3", file: "这是认证文件3", isSuccess: true, mysql_id: 3},
]
interface Item { 
  id: number; 
  name: string; 
  type: string; 
  date: string; 
  isResult: boolean; 
  other_id?: number; 
}

let itemList: Item[] = [ 
  { id: 1, name: "Alice", type: "A", date: "2023-11-21", isResult: true, other_id: 10 }, 
  { id: 2, name: "Bob", type: "B", date: "2023-11-22", isResult: false }, 
  { id: 3, name: "Charlie", type: "C", date: "2023-11-23", isResult: true, other_id: 30 }, 
];

let username = ref("admin"); // 模拟登录的用户名 
let status = ref("all"); // 状态筛选条件 
let type = ref("all"); // 类型筛选条件
let showCard = ref(false); // 卡片的状态

// 根据筛选条件和排序规则返回过滤后的列表 
let filteredList = computed(() => { 
  return itemList .filter((item) => { 
    return ( (status.value === "all" || item.isResult.toString() === status.value) && (type.value === "all" || item.type === type.value) ); 
    }) 
  .sort((a, b) => { 
    if (a.isResult === b.isResult) { 
      return a.date < b.date ? -1 : 1; 
    } 
    else { 
      return a.isResult ? 1 : -1; 
    } 
  }); 
}); 

// 切换卡片的状态
let toggleCard = () => {
  showCard.value = !showCard.value;
};
</script>


<style scoped> 
.item { 
  display: flex; 
  flex-direction: row; 
  align-items: center; 
  justify-content: space-around; 
  height: 100px; 
  margin: 10px; 
  text-align: center;
  border-radius: 4px; 
  background:#68646d;
  color:#ECF5FF;
}

.header {
  display: flex;
  align-items: center;
  justify-content: center;
}

.text {
  font-size: 30px;
  display: flex;
}

.avatar {
  width: 40px;
  height: 40px;
  margin-left: auto;
  border-radius: 50%;
  border: 2px solid black;
}

.card {
  position: absolute;
  right: 20px;
  top: 80px;
  width: 300px;
  height: 200px;
  border: 1px solid var(--el-color-primary);
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  z-index: 99;
}

.no-result { 
  color: red; 
}

.result { 
  color: green; 
} 
</style>