<template>
  <div class="login-dialog">
    <el-dialog
      v-model="dialogFormVisible"
      @close="handleClose"
      :lock-scroll="false"
      style="border-radius: 10px"
    >
      <template #header>
        <span class="dialog-footer" style="font-weight: 600">
          Welcome to What Scholar
        </span>
      </template>
      <el-form :model="form">
        <el-form-item label="Username" :label-width="formLabelWidth">
          <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item label="Password" :label-width="formLabelWidth">
          <el-input v-model="form.password" type="password" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">Cancel</el-button>
          <el-button @click="handleSubmit">Sign in</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import axios from "axios";
import { Base64 } from "js-base64";
import { useStore } from "vuex";
import { ElDialog, ElForm, ElInput, ElButton, ElMessage } from "element-plus";
import { encodeUtf8 } from "node-forge/lib/util.js";
const dialogFormVisible = ref(true);
const Store = useStore();
const formLabelWidth = "140px";
const emit = defineEmits(["refresh"]);

const form = reactive({
  username: "",
  password: "",
});

function handleClose() {
  emit("refresh");
}
function handleSubmit() {
  // 处理表单提交逻辑
  if (form.username == "") {
    ElMessage.error("Please enter your username");
    return;
  }
  if (form.password == "") {
    ElMessage.error("Please enter your password");
    return;
  }
  axios({
    url: "http://122.9.5.156:8000/api/v1/home/user/login",
    method: "post",
    data: JSON.stringify({
      username: form.username,
      password: Base64.encode(encodeUtf8(form.password)), //加密
    }),
  })
    .then((res) => {
      console.log(res);
      if (res.data.errno == 1002) {
        ElMessage.error("Username does not exist!");
        return;
      }
      if (res.data.errno == 1003) {
        ElMessage.error("Wrong password!");
        return;
      } else {
        let data = res.data.data;
        const user = {
          user_name: data.username,
          user_id: data.user_id,
          user_email: data.email,
          token: data.token,
          claimed_scholar_id: data.claimed_scholar_id,
          claimed_scholar_name: data.claimed_scholar_name,
        };
        console.log(user)
        Store.commit("loginSuccess", user);
        ElMessage.success("Welcome!");
        emit("refresh");
      }
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
</style>
