<template>
  <div class="mask" v-if="showLogin || showRegister"></div>
  <div class="top-nav">
    <ul>
      <li style="padding-left: 18px"><a href="#">
          <img src="../../assets/7b5cd0fb87aa1c3e2b77df08f6161fa.png" alt=""
            style="width: 245px; position: relative; top: -7px;">
        </a>
        <!-- <a href="#" style="
            color: aliceblue;
            line-height: 40px;
            font-size: 20px;
            text-decoration: none;
            font-style: italic;
          ">What Scholar</a> -->
      </li>
      <li style="width: 45%; margin-right: 0">
        <div style="margin-top: 3px; margin-left: 100px;">
          <!-- <el-input v-model="searchText" @keyup="userNameKeyup($event)" size="large" width="200px"
            style="font-size: 16px;">
            <template #prefix>
              <el-icon class="el-input__icon">
                <search />
              </el-icon>
            </template>
          </el-input> -->
          <!-- <button @click="addHistory">add star</button> -->
        </div>
      </li>
      <el-popover placement="bottom" :width="425" trigger="click" v-if="have_user_info">
        <template #default>
          <AI />
        </template>
        <template #reference>
          <el-avatar :src="Avatar" style="cursor: pointer; margin-top: 3px;"></el-avatar>
        </template>
      </el-popover>
      <el-popover placement="bottom" :width="325" trigger="click" v-if="!have_user_info" effect="dark">
        <template #default>
          <div class="ai-text-title">AI Assistant</div>
          <div class="ai-text">Understand your words</div>
          <div class="ai-text">Answer your questions</div>
          <div class="ai-text">Create your needs</div>
          <div class="ai-text">Solve your difficulties</div>
          <div class="ai-text">Learn your teachings</div>
          <el-button type="primary" class="ai-button" @click="login">Login</el-button>
        </template>
        <template #reference>
          <el-avatar :src="Avatar" style="cursor: pointer; margin-top: 3px;"></el-avatar>
        </template>
      </el-popover>
      <li class="right">
        <button v-if="have_user_info" @click="history" style="border-radius: 10px 0 0 10px;">History</button>
        <button v-if="have_user_info" @click="star">Favorites</button>
        <button v-if="is_admin && have_user_info" @click="toAdmin">Admin</button>
        <button v-if="is_scholar && have_user_info" @click="toPersonal">Personal Homepage</button>
        <button v-if="have_user_info" @click="logout" style="margin-right: 20px;border-radius: 0 10px 10px 0;">Sign
          out</button>
        <button v-if="!have_user_info" @click="login" style="border-radius: 10px 0 0 10px;">Sign in</button>
        <button v-if="!have_user_info" @click="register"
          style="margin-right: 20px;border-radius: 0 10px 10px 0;">Register</button>
      </li>
    </ul>
  </div>
  <div style="position: relative">
    <History v-if="showHistory" @refresh="refresh" />
    <Star v-if="showStar" @refresh="refresh" />
    <div class="login-box" v-if="showRegister">
      <span class="close" @click="refresh">×</span>
      <h2>Register</h2>
      <form>
        <div class="user-box">
          <input type="text" name="" required="" v-model="form.username" />
          <label>Username</label>
        </div>
        <div class="user-box">
          <input type="password" name="" required="" v-model="form.password" />
          <label>Password</label>
        </div>
        <div class="user-box">
          <input type="text" name="" required="" v-model="form.email" />
          <label>E-mail</label>
        </div>
        <div class="user-box">
          <input type="text" name="" required="" v-model="form.captcha" style="width: 60%; float: left" />
          <label>Captcha</label>
          <el-button type="primary" @click="getCaptcha" style="float: right; margin-top: 7px">{{ captcha_time
          }}</el-button>
        </div>
        <a href="#" @click="handleSubmit">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Register
        </a>
      </form>
    </div>
    <div class="login-box" v-if="showLogin">
      <span class="close" @click="refresh">×</span>
      <h2>Login</h2>
      <form>
        <div class="user-box">
          <input type="text" name="" required="" v-model="loginForm.username" />
          <label>Username</label>
        </div>
        <div class="user-box">
          <input type="password" name="" required="" v-model="loginForm.password" />
          <label>Password</label>
        </div>
        <a href="#" @click="handleLoginSubmit">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Submit
        </a>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch, onMounted, onUnmounted } from "vue";
import Login from "./Login.vue";
import AI from "../Chat/chat.vue";
import Avatar from "../../assets/icon.png"
import Register from "./Register.vue";
import { Search } from "@element-plus/icons-vue";
import Star from "./Star.vue";
import History from "./History.vue";
import { useStore } from "vuex";
import { ElInput, ElMessage } from "element-plus";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";
import { Base64 } from "js-base64";
import { ElDialog, ElForm, ElButton } from "element-plus";
import { encodeUtf8 } from "node-forge/lib/util.js";
const showLogin = ref(false);
const showRegister = ref(false);
const showStar = ref(false);
const showHistory = ref(false);
const searchText = ref("");
const Store = useStore();
const router = useRouter();
const have_user_info = ref(false);
const is_scholar = ref(false);
const is_admin = ref(false);
const dialogVisible = ref(false);
onMounted(() => {
  have_user_info.value = Store.getters.getLoginState;
  is_admin.value = Store.getters.getUserinfo.is_admin;
  is_scholar.value =
    Store.getters.getUserinfo.claimed_scholar_name != "" ? true : false;
});
function addHistory() {
  let login = Store.getters.getLoginState;
  if (!login) {
    ElMessage.error("Please login first!");
    return;
  }
  axios({
    url: "http://122.9.5.156:8000/api/v1/home/star",
    method: "post",
    data: JSON.stringify({
      token: Store.getters.getUserinfo.token,
      paper_id: "2972869264",
      type: 0,
      folder_id: 9,
    }),
  })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
}
function userNameKeyup(event) {
  if (event.keyCode == 13) {
    performSearch();
  }
}
watch(
  () => Store.getters.getLoginState,
  (newVal) => {
    have_user_info.value = newVal;
  },
  { deep: true },
);
watch(() => Store.getters.getScholarName,
  (newVal) => {
    if (newVal != "") {
      is_scholar.value = true;
    } else {
      is_scholar.vlaue = false;
    }
  }, { deep: true })
watch(() => Store.getters.getUserinfo.is_admin,
  (newVal) => {
    is_admin.value = newVal;
  },
  { deep: true })
function login() {
  showLogin.value = true;
}
function logout() {
  ElMessage.success("You have successfully signed out");
  Store.commit("logOut");
  router.push("/home")
}
function register() {
  showRegister.value = true;
}
function star() {
  showStar.value = !showStar.value;
}
function history() {
  showHistory.value = !showHistory.value;
}
function toPersonal() {
  let id = Store.getters.getUserinfo.claimed_scholar_id;
  router.push(`/scholar/${id}`);
}
function refresh() {
  showLogin.value = false;
  showRegister.value = false;
  showStar.value = false;
  showHistory.value = false;
  loginForm.username = "";
  loginForm.password = "";
  form.username = "";
  (form.password = ""),
    (form.email = ""),
    (form.captcha = ""),
    (form.captcha_get = ""),
    (form.email_change = false);
}
function performSearch() {
  if (searchText.value === "") {
    return;
  }
  const data = {
    searchType: 0,
    keyword: searchText.value,
  };
  Store.commit("setGeneralSearch", data);
  searchText.value = "";
  router.push("/searchResult");
}
//登录
const loginForm = reactive({
  username: "",
  password: "",
});
function handleLoginSubmit() {
  // 处理表单提交逻辑
  if (loginForm.username == "") {
    ElMessage.error("Please enter your username");
    return;
  }
  if (loginForm.password == "") {
    ElMessage.error("Please enter your password");
    return;
  }
  axios({
    url: "http://122.9.5.156:8000/api/v1/home/user/login",
    method: "post",
    data: JSON.stringify({
      username: loginForm.username,
      password: Base64.encode(encodeUtf8(loginForm.password)), //加密
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
          is_admin: data.is_admin,
          user_name: data.username,
          user_id: data.user_id,
          user_email: data.email,
          token: data.token,
          claimed_scholar_id: data.claimed_scholar_id,
          claimed_scholar_name: data.claimed_scholar_name,
        };
        Store.commit("loginSuccess", user);
        ElMessage.success("Welcome!");
        refresh();
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
function toAdmin() {
  Store.commit("AdminLogin")
  router.push("/admin");
}
//注册
const captcha_time = ref("Get Captcha");
let form = reactive({
  username: "",
  password: "",
  email: "",
  captcha: "",
  captcha_get: "",
  email_change: false,
});
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
          refresh();
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
    if (form.captcha_get != "" && showRegister.value) {
      form.email_change = true;
      form.captcha_get = "";
    }
  },
  { deep: true }
);

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
</script>

<style scoped>
.mask {
  z-index: 998;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.61);
}

.close {
  font-size: 20px;
  position: absolute;
  top: 5px;
  right: 10px;
  color: aliceblue;
  cursor: pointer;
}

.top-nav {
  z-index: 999;
  position: fixed;
  width: 100%;
  height: 45px;
  background-color: #000000;
  color: #d8d8d8;
  opacity: 1;
  padding: 10px;
  text-align: center;
  border-bottom: #fff 1px solid;
}

.top-nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-between;
}

.top-nav li {
  margin-right: 20px;
}

.top-nav button {
  margin-top: 3px;
  background-color: rgb(37, 37, 37);
  color: #dfdfdf;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}

.top-nav button:hover {
  background-color: rgb(120, 120, 120);
}

.login-box {
  border: #dfdfdf 0.5px solid;
  z-index: 999;
  position: fixed;
  top: 300px;
  left: 50%;
  width: 400px;
  padding: 40px;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 16, 0.873);
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.6);
  border-radius: 10px;
}

.login-box h2 {
  margin: 0 0 30px;
  padding: 0;
  color: #fff;
  text-align: center;
}

.login-box .user-box {
  position: relative;
}

.login-box .user-box input {
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid #fff;
  outline: none;
  background: transparent;
}

.login-box .user-box label {
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  pointer-events: none;
  transition: 0.5s;
}

.login-box .user-box input:focus~label,
.login-box .user-box input:valid~label {
  top: -20px;
  left: 0;
  color: #03e9f4;
  font-size: 12px;
}

.login-box form {
  text-align: center;
}

.login-box form a {
  position: relative;
  display: inline-block;
  padding: 10px 20px;
  color: #03e9f4;
  font-size: 16px;
  text-decoration: none;
  text-transform: uppercase;
  overflow: hidden;
  transition: 0.5s;
  margin-top: 40px;
  letter-spacing: 4px;
}

.login-box a:hover {
  background: #03e9f4;
  color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 5px #03e9f4, 0 0 25px #03e9f4, 0 0 50px #03e9f4,
    0 0 100px #03e9f4;
}

.login-box a span {
  position: absolute;
  display: block;
}

.login-box a span:nth-child(1) {
  top: 0;
  left: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #03e9f4);
  animation: btn-anim1 1s linear infinite;
}

@keyframes btn-anim1 {
  0% {
    left: -100%;
  }

  50%,
  100% {
    left: 100%;
  }
}

.login-box a span:nth-child(2) {
  top: -100%;
  right: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(180deg, transparent, #03e9f4);
  animation: btn-anim2 1s linear infinite;
  animation-delay: 0.25s;
}

@keyframes btn-anim2 {
  0% {
    top: -100%;
  }

  50%,
  100% {
    top: 100%;
  }
}

.login-box a span:nth-child(3) {
  bottom: 0;
  right: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(270deg, transparent, #03e9f4);
  animation: btn-anim3 1s linear infinite;
  animation-delay: 0.5s;
}

@keyframes btn-anim3 {
  0% {
    right: -100%;
  }

  50%,
  100% {
    right: 100%;
  }
}

.login-box a span:nth-child(4) {
  bottom: -100%;
  left: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(360deg, transparent, #03e9f4);
  animation: btn-anim4 1s linear infinite;
  animation-delay: 0.75s;
}

@keyframes btn-anim4 {
  0% {
    bottom: -100%;
  }

  50%,
  100% {
    bottom: 100%;
  }
}

:deep(.el-button) {
  background-color: #000000;
  color: rgb(255, 255, 255);

  &:hover {
    color: #03e9f4;
  }
}

:deep(.el-button--primary) {
  --el-button-border-color: white;
}

:deep(.el-button:hover) {
  border-color: #03e9f4;
}

.ai-text-title {
  background: linear-gradient(to right, #ff00ff, #00ffff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
  height: 70px;
  line-height: 70px;
  font-size: 30px;
  font-weight: bold;
  font-family: "Helvetica Neue", sans-serif;
}

.ai-text {
  background: linear-gradient(to right, #48c6ef, #6f86d6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
  height: 30px;
  line-height: 30px;
  font-size: 20px;
  font-weight: bold;
  font-family: "Arial Black", sans-serif;
}

.ai-button {
  font-size: 16px;
  margin-top: 20px;
  margin-left: 120px;
  background: linear-gradient(to right, #ff00ff, #00ffff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: background-color 0.3s ease;
  /* 添加过渡效果 */
}

.ai-button:hover {
  background-color: #cccccc;
  /* 鼠标悬停时背景颜色变为灰色 */
}

.ai-button:not(:hover) {
  animation: none !important;
  /* 鼠标离开后取消动画效果 */
}
</style>
