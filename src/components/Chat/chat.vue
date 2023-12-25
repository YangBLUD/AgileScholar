<template>
  <div class="title">
    AI Assistant<el-button :icon="Refresh" circle style="position:absolute; margin-left: 70px; margin-top: 20px;"
      @click="resetList" />
  </div>
  <div style="width: 400px;">
    <el-scrollbar style=" max-height:100%; height:700px; min-height:200px; border-bottom: 1.5px solid rgb(220, 220, 220);"
      wrap-class="scroll-wrap" ref="scrollContainer">
      <div style="min-height: 667px">
        <template v-for="(item, index) in messageList" :key="index">
          <div class="rightContainer">
            <bubbleSelf :content="item.content" :avatar="config.peopleAvatar" :sender="config.peopleName"
              v-if="item.isLlm === false"></bubbleSelf>
            <bubble :content="item.content" :avatar="config.llmAvatar" :sender="config.llmName" v-if="item.isLlm">
            </bubble>
          </div>
        </template>
      </div>
    </el-scrollbar>
    <el-input placeholder="Please input" v-model="input" maxlength="1000" type="text" clearable="true">
      <template #append>
        <div>
          <el-button :icon="Search" @click="ask(input)" />
        </div>
      </template>
    </el-input>
  </div>
</template>

<script setup>

import bubbleSelf from "./bubbleSelf.vue";
import bubble from "./bubble.vue";
import { onMounted, reactive, ref, watch } from "vue";
import { Search, Refresh } from "@element-plus/icons-vue";
import { useStore } from "vuex";
import axios from "axios";
const store = useStore()
const messageList = ref([])
const input = ref('')
function getMessageList() {
  return store.getters.getList
}
const config = reactive({
  peopleName: "Me",
  llmName: "AI",
  peopleAvatar: "",
  llmAvatar: "",
})
onMounted(() => {
  messageList.value = getMessageList()
})
watch(() => getMessageList(), (newVal, oldVal) => {
  messageList.value = newVal
}, { deep: true })
function getUserInfo() {
  return store.getters.getUserinfo
}
function askSentence(question) {
  let chatHistory = 0;
  if (messageList.value.length > 0) {
    chatHistory = 1
  }
  store.commit('addSentence', {
    content: question,
    isLlm: false,
  })
  axios({
    // 接口网址：包含协议名，域名，端口和路由
    url: "http://122.9.5.156:8000/api/v1/home/ai_chat",
    // 请求方式，默认为get，可以不写
    method: 'post',
    // 请求可以携带的参数，用对象来写，get方法对应params，其他方法对应data
    data: JSON.stringify({
      token: getUserInfo().token,
      question: question,
      chat_history: chatHistory,
    }),
    // 成功请求回数据后，进入then，并用console.log打印结果
  }).then(res => {
    console.log(res.data.data)
    store.commit('addSentence', {
      content: res.data.data.answer,
      isLlm: true,
    })
  }).catch(err => {
    console.log(err)
  })
}
function resetList() {
  store.commit('resetList')
}
function ask(s) {
  askSentence(s)
  input.value = ""
}
</script>

<style scoped>
.title {
  background: linear-gradient(to right, #ff00ff, #00ffff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
  height: 70px;
  line-height: 70px;
  font-size: 25px;
  font-weight: bold;
  font-family: "Helvetica Neue", sans-serif;
}
</style>