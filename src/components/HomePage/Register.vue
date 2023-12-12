<template>
  <div class="login-dialog">
    <el-dialog
      v-model="dialogFormVisible"
      @close="handleClose"
      :lock-scroll="false"
    >
      <template #header>
        <span class="dialog-header" style="font-weight: 600"> Register </span>
      </template>
      <el-form :model="form">
        <el-form-item label="Username" :label-width="formLabelWidth">
          <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item label="Password" :label-width="formLabelWidth">
          <el-input type="password" v-model="form.password" />
        </el-form-item>
        <el-form-item label="E-mail" :label-width="formLabelWidth">
          <el-input v-model="form.email" />
        </el-form-item>
        <el-form-item label="Captcha" :label-width="formLabelWidth">
          <div style="display: flex; align-items: center">
            <el-input v-model="form.captcha" />
            <span style="width: 150px"></span>
            <el-button
              type="primary"
              @click="getCaptcha"
              style="float: right"
              >{{ captcha_time }}</el-button
            >
          </div>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">Cancel</el-button>
          <el-button @click="handleSubmit">Register</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import { defineEmits } from "vue";
import { Base64 } from "js-base64";
import axios from "axios";
import { encodeUtf8 } from "node-forge/lib/util.js";
import {
  ElDialog,
  ElForm,
  ElInput,
  ElButton,
  ElSelect,
  ElOption,
  ElMessage,
} from "element-plus";
import Login from "./Login.vue";
const dialogFormVisible = ref(true);
const formLabelWidth = "140px";
const emit = defineEmits(["refresh"]);
const captcha_time = ref("Get Captcha");
const form = reactive({
  username: "",
  password: "",
  email: "",
  captcha: "",
  captcha_get: "",
  email_change: false,
});
function handleClose() {
  emit("refresh");
}
function getCaptcha() {
  if (form.email === "") {
    ElMessage.error("Please enter your email");
    return;
  }
  if (captcha_time.value === "Get Captcha") {
    let timer;
    let mount = 60;
    timer = setInterval(() => {
      captcha_time.value = mount + "s";
      mount--;
      if (mount <= 0) {
        captcha_time.value = "Get Captcha";
        clearInterval(timer);
      }
    }, 1000);
    axios({
      url: "http://122.9.5.156:8000/api/v1/home/user/captcha",
      method: "post",
      data: JSON.stringify({
        email: form.email,
      }),
    })
      .then((res) => {
        console.log(res);
        if (res.data.errno == 1002) {
          ElMessage.error("Invalid Email");
          return;
        } else {
          form.email_change = false;
          form.captcha_get = Base64.decode(
            encodeUtf8(res.data.data.verification)
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
function handleSubmit() {
  if (form.username == "") {
    ElMessage.error("Please enter your username");
    return;
  }
  if (!form.username.match("^[a-zA-Z0-9\u4e00-\u9fa5_-]{2,16}$")) {
    ElMessage.error("Invalid username");
    return;
  }
  if (form.password == "") {
    ElMessage.error("Please enter your password");
    return;
  }
  if (!form.password.match("^[a-zA-Z0-9_-]{6,16}$")) {
    ElMessage.error("Invalid password");
    return;
  }
  if (form.email_change === true) {
    ElMessage.error("Please obtain a new captcha");
    return;
  }
  if (form.captcha === "") {
    ElMessage.error("Please enter captcha");
    return;
  }
  if (form.captcha_get === "") {
    ElMessage.error("Please obtain the captcha");
    return;
  }
  if (form.captcha != form.captcha_get) {
    console.log(form.captcha);
    console.log(form.captcha_get);
    ElMessage.error("Incorrect captcha");
    return;
  }
  if (form.captcha == form.captcha_get && form.captcha_get != "") {
    axios({
      url: "http://122.9.5.156:8000/api/v1/home/user/register",
      method: "post",
      data: JSON.stringify({
        username: form.username,
        password: Base64.encode(encodeUtf8(form.password)),
        email: form.email,
      }),
    })
      .then((res) => {
        console.log(res);
        if (res.data.errno == 1005) {
          ElMessage.error("Invalid username");
          return;
        }
        if (res.data.errno == 1006) {
          ElMessage.error("Invalid password");
          return;
        }
        if (res.data.errno == 1007) {
          ElMessage.error("Username already exists");
          return;
        }
        if (res.data.errno == 1008) {
          ElMessage.error("Email already exists");
          return;
        } else {
          ElMessage.success("Registered successfully");
          emit("refresh");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
watch(
  () => form.email,
  (newVal, oldVal) => {
    if (form.captcha_get != "") {
      form.email_change = true;
      form.captcha_get = "";
    }
  },
  { deep: true }
);
</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
