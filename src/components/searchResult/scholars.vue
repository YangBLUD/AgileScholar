<template>
    <div class="main">
        <div class="pic">
            <img src="../../assets/logo.png" class="scholar-pic" />
        </div>
        <div class="name" style="text-align: center;">
            <router-link style="color: black;" :to="{ name: 'scholar-display', params: { id: props.info.id } }">
                <span v-html="props.info.display_name" style="display: inline-block;"></span>
            </router-link>
        </div>
        <div class="jigou" v-if="props.info.institution && props.info.institution.length != 0" style="text-align: center;">
            <router-link :to="{ name: 'institution-display', params: { id: props.info.institution[0].id } }">
                <span v-html="props.info.institution[0].name" style="display: inline-block;"></span>
            </router-link>
        </div>
        <div class="star">
            <stardialog :token="props.token" :paper_id="props.info.id" :type="type" :is_star="props.info.is_star">
            </stardialog>
        </div>

    </div>
</template>
<script setup>
import { defineProps } from 'vue';
import { reactive, ref, onMounted, onUnmounted, onBeforeMount } from "vue";
import axios from "axios";
import stardialog from "./stardialog.vue";
import { useStore } from "vuex";
const Store = useStore();
onMounted(() => {
    type.value = 1;
});
//用于收藏
const paper_id = ref("2106749358");
const type = ref(0);
const folder_id = ref(2);
const folderlist = ref([]);

const props = defineProps({
    info: Object,
    token: String,
})
</script>
<style scoped>
.main {
    display: flex;
    width: 100%;
    height: 100%;
}

.pic {
    width: 250px;
    height: 140px;
    cursor: pointer;

    .scholar-pic {
        margin-left: 60%;
        margin-top: 20%;
        width: 110px;
        height: 110px;
        border-radius: 50%;
    }
}

.name {
    position: relative;
    left: -40px;
    top: 150px;
    height: 20px;
    width: 600px;

    >>>em {
        background-color: yellow;
    }
}

.name span {
    display: inline-block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    position: relative;
    left: -50px;
    width: 200px;
}

.jigou {
    color: #0077c2;
    font-size: .875rem;
    position: relative;
    left: -230px;
    top: 180px;
    width: 600px;
    height: 20px;
    /* white-space: pre-wrap; */
    /* overflow: hidden; */
    text-overflow: ellipsis;

    >>>em {
        background-color: yellow;
    }
}

.jigou span {
    display: inline-block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    position: relative;
    left: -50px;
    width: 200px;
}

.star {
    position: relative;
    left: -300px;
    top: 20px;
    background-color: rgb(231, 229, 229);
    color: gray;
    font-size: 25px;
    border-radius: 2px;
    height: 30px;
    width: 33px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

.star:hover {
    background-color: #d7d7d7;
}
</style>