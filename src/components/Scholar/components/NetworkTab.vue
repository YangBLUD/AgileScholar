<template>
  <el-container class="network-container">
    <el-aside width="200px">
      <el-menu>
        <el-menu-item index="1" @click="currentView = 'cited'">被引关系</el-menu-item>
        <el-menu-item index="2" @click="currentView = 'partnership'">合作关系</el-menu-item>
        <el-menu-item index="3" @click="currentView = 'reference'">引用关系</el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>
      <component :is="currentComponent"></component>
    </el-main>
  </el-container>
</template>

<script setup>
import {computed, ref, onMounted, reactive} from "vue";
import Cited from "./Network-components/Cited.vue"
import Partnership from "./Network-components/Partnership.vue"
import Reference from "./Network-components/Reference.vue"
import {useStore} from "vuex";
const componentsMap = {
  partnership: Partnership,
  cited:Cited,
  reference:Reference
}
const store = useStore()
const currentView = ref('cited');
const currentComponent = computed(() => componentsMap[currentView.value]);
const authorInformation = reactive(null);
const co_work_list = reactive([]);
const refer_list = reactive([]);
const referred_list = reactive([]);

function getAuthorStates(){
  return store.getters.getAuthorState
}
onMounted(() => {
  console.log(getAuthorStates().authorNetwork.co_work_list.length);
  console.log(getAuthorStates().authorNetwork.refer_list.length);
  console.log(getAuthorStates().authorNetwork.referred_list.length);
});

</script>
