<template>
    <div class="article-show-content-reference">
        <div class="article-show-content-nav">
            <div class="article-show-content-nav-block">
                <div class="article-show-content-nav-holder"></div>
                <div class="article-show-content-nav-title">References</div>
            </div>
        </div>
        <div class="article-show-content-reference-content">
            <div class="article-show-content-reference-block"
                 v-if="!reference_i"
                 v-for="(art, index) in references_1"
            >
                <span class="reference-text"><strong>{{index + 1}}. </strong>{{ art.dis }}</span>
            </div>
            <div class="article-show-content-reference-block"
                 v-if="reference_i"
                 v-for="(art, index) in references_2"
            >
                <span class="reference-text"><strong>{{index + 1}}. </strong>{{ art.dis }}</span>
            </div>
        </div>
        <div class="article-show-content-reference-bottom">
            <button v-if="!reference_i" class="article-show-content-reference-btn" @click="getFewerReference_i()">
                Show Fewer References
            </button>
            <button v-if="reference_i" class="article-show-content-reference-btn" @click="getMoreReference_i()">
                Show More References
            </button>
        </div>
    </div>
</template>

<script setup>
import {ref, watch} from "vue";
import store from "../../store/index.js";

let reference_i = ref(true);
const references_1 = ref(store.getters.get_references);
const references_2 = ref(store.getters.get_few_references)
watch(()=>store.state.Article.id, (newVal, oldVal)=>{
    references_1.value = store.getters.get_references
    references_2.value = store.getters.get_few_references
})

function getMoreReference_i(){
    reference_i.value = false;
}
function getFewerReference_i(){
    reference_i.value = true;
}
</script>

<style scoped>
.article-show-content-nav{
    background-color: #fafafa;
    margin: 10px 0 15px 0;
    /*padding: 30px;*/
}
.article-show-content-nav-block{
    /*margin: -30px 0 0 -30px;*/
    padding: 13px 0;
    display: flex;
    flex-direction: row;
}
.article-show-content-nav-holder{
    width: 8px;
    height: 18px;
    background-color: #333333;
}
.article-show-content-nav-title{
    padding-left: 12px;
    font-size: 18px;
    line-height: 1.125rem;
    font-style: italic;
    font-weight: bold;
}

.article-show-content-reference{

}
.article-show-content-reference-block{
    margin-top: 8px;
    padding-bottom: 16px;
    font-size: 14px;
    line-height: 20px;
    color: #000000;
    border-bottom: 1px dashed #6b6b6b;
    display: flex;
    flex-direction: column;

}
.article-show-content-reference-bottom{
    display: flex;
    flex-direction: row;
    justify-content: center;
    border-bottom: 1px dashed #e0e0e0;
    margin-bottom: 40px;
}
.article-show-content-reference-btn{
    padding: 12px 54px 12px 54px;
    width: 270px;
    height: 40px;
    line-height: 16px;
    font-size: 14px;
    font-family: Merriweather Sans, sans-serif;
    margin: 20px;
    border: 1px solid #333333;
    border-radius: 3px;
    background-color: #ffffff;
    cursor: pointer;
}
.article-show-content-reference-btn :hover{
    background-color: #f0f0f0;
}

.reference-text{
    font-family: "Open Sans", sans-serif;
    font-weight: 300;
}
</style>
