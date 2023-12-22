<template>
  <button @click="test"></button>
  <el-scrollbar style=" max-height:100%; height:625px; min-height:200px;border-bottom: 1.5px solid rgb(220, 220, 220);"
                wrap-class="scroll-wrap" ref="scrollContainer">
    <div style="min-height: 667px">
      <template v-for="(item, index) in messageList" :key="index">
        <div class="rightContainer">
          <bubbleSelf :content="item.content" :avatar="config.peopleAvatar" :sender="config.peopleName"></bubbleSelf>
          <bubble :content="item.content" :avatar="config.llmAvatar" :sender="config.llmName"></bubble>
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
function askSentence(question){
  store.commit('addSentence', {
    content: question,
    isLlm: false,
  })

}
function test(){
  askSentence("杨哥是sb")
}
</script>

<style scoped>

</style>