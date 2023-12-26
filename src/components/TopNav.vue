<template>
  <div class="top-nav">
    <ul>
      <li style="padding-left: 30px">
        <img src="../assets/7b5cd0fb87aa1c3e2b77df08f6161fa.png" alt="">
        <!-- <a href="#" style="
            color: aliceblue;
            line-height: 40px;
            font-size: 20px;
            text-decoration: none;
            font-style: italic;
          ">What Scholar</a> -->
      </li>
      <li style="width: 55%; margin-right: 0">
        <div style="float: right">
          <el-input v-model="input" class="w-50 m-2" size="large" @keyup.enter="performSearch">
            <template #prefix>
              <el-icon class="el-input__icon">
                <search />
              </el-icon>
            </template>
          </el-input>
        </div>
      </li>
      <li class="right">
        <button v-if="have_user_info" @click="history">History</button>
        <button v-if="have_user_info" @click="star">Favorites</button>
        <button v-if="have_user_info" @click="logout">Sign out</button>
        <button v-if="!have_user_info" @click="login">Sign in</button>
        <button v-if="!have_user_info" @click="register">Register</button>
      </li>
    </ul>
  </div>
  <div style="position: relative">
    <History v-if="showHistory" @refresh="refresh" />
    <Login v-if="showLogin" @refresh="refresh" />
    <Register v-if="showRegister" @refresh="refresh" />
    <Star v-if="showStar" @refresh="refresh" />
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import Login from "./Login.vue";
import Register from "./Register.vue";
import { Search } from "@element-plus/icons-vue";
import Star from "./Star.vue";
import History from "./history.vue";
import { useStore } from "vuex";
import { ElInput, ElMessage } from "element-plus";
import { useRouter, useRoute } from "vue-router";
const showLogin = ref(false);
const showRegister = ref(false);
const showStar = ref(false);
const showHistory = ref(false);
const input = ref("");
const Store = useStore();
const router = useRouter();
const have_user_info = ref(false);
watch(
  () => Store.getters.getLoginState,
  (newVal) => {
    have_user_info.value = newVal;
  },
  { deep: true }
);
function login() {
  showLogin.value = true;
}
function logout() {
  ElMessage.success("You have successfully signed out");
  Store.commit("logout");
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
function refresh() {
  showLogin.value = false;
  showRegister.value = false;
  showStar.value = false;
  showHistory.value = false;
}
const performSearch = () => {
  console.log(input.value);
  if (input.value === "") {
    return;
  }
  const data = {
    searchType: 1,
    keyword: input.value,
  };
  Store.commit("setGeneralSearch", data);
  input.value = "";
  router.push("/searchResult");
};
</script>

<style scoped>
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
  background-color: rgb(37, 37, 37);
  color: #dfdfdf;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

.top-nav button:hover {
  background-color: rgb(120, 120, 120);
}
</style>
