<template>
  <button @click="test">askQuestion</button>
  <button @click="resetList">resetList</button>
  <el-scrollbar style=" max-height:100%; height:625px; min-height:200px;border-bottom: 1.5px solid rgb(220, 220, 220);"
                wrap-class="scroll-wrap" ref="scrollContainer">
    <div style="min-height: 667px">
      <template v-for="(item, index) in messageList" :key="index">
        <div class="rightContainer">
          <bubbleSelf :content="item.content" :avatar="config.peopleAvatar" :sender="config.peopleName" v-if="item.isLlm === false"></bubbleSelf>
          <bubble :content="item.content" :avatar="config.llmAvatar" :sender="config.llmName" v-if="item.isLlm"></bubble>
        </div>
      </template>
    </div>
  </el-scrollbar>
</template>

<script setup>

import BubbleSelf from "./bubbleSelf.vue";
import Bubble from "./bubble.vue";
import {onMounted, reactive, ref, watch} from "vue";
import {useStore} from "vuex";
import axios from "axios";
const store = useStore()
const messageList = ref([])
function getMessageList(){
  return store.getters.getList
}
const config = reactive({
  peopleName: "me",
  llmName: "sbzx",
  peopleAvatar: "",
  llmAvatar: "",
})
onMounted(() => {
  messageList.value = getMessageList()
})
watch(() => getMessageList(), (newVal, oldVal) => {
  messageList.value = newVal
},{deep: true})
function getUserInfo(){
  return store.getters.getUserinfo
}
function askSentence(question){
  let chatHistory = 0;
  if(messageList.value.length > 0){
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
function resetList(){
  store.commit('resetList')
}
function test(){
  askSentence("杨哥是sb")
}
</script>

<style scoped>

</style>