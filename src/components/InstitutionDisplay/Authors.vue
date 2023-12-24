<template>
    <div class="institution-show-content-nav">
        <div class="institution-show-content-nav-block Basic-block">
            <div class="institution-show-content-nav-holder"></div>
            <div class="institution-show-content-nav-title">Author</div>
        </div>
        <div class="basic-block">
            <div v-for="domain in domains" class="domain-box">
                <div class="domain-box-content-header">
                    <p class="domain-content-header">{{ domain.name }}</p>
                </div>
                <div class="domain-term-wrapper">
                    <div class="domain-term-activity">
                        <div class="domain-term-header">Activity</div>
                        <div class="holder"></div>
                        <div class="domain-term-bar">
                            <span class="domain-term" style="background-color: #34c471" :style="{ width: domain.activity_level + '%' }"></span>
                        </div>
                    </div>
                    <p class="domain-term-percentage">{{ domain.activity_level }}%</p>
                </div>
            </div>
            <div v-if="haveMoreDomain && (currentPage !== 1) && (currentPage !== finalPage)" class="domain-btn-group">
                <div class="domain-more-two-btn" @click="minusPage()">
                    Previous
                </div>
                <div class="domain-more-two-btn" @click="addPage()">
                    Next
                </div>
            </div>

            <div v-if="haveMoreDomain && (currentPage === 1)" class="domain-more-btn" @click="addPage()">
                Next
            </div>
            <div v-if="haveMoreDomain && (currentPage === finalPage)" class="domain-more-btn" @click="minusPage()">
                Previous
            </div>
        </div>
    </div>

</template>


<script setup>

import {reactive, ref, watch} from "vue";
import store from "../../store/index.js";

let institution = reactive(store.state.Institution.institution)
let domains = ref(store.getters.getFewDomain)
let haveMoreDomain = ref(store.getters.getHaveMore)
const currentPage = ref(1)
const finalPage = ref(Math.ceil(institution.domain.length/4))

watch(()=>store.state.Institution.id, (newVal, oldVal)=>{
    currentPage.value = 1
    institution = store.state.Institution.institution
    domains = store.getters.getFewDomain
    haveMoreDomain = store.getters.getHaveMore
    finalPage.value = Math.ceil(institution.domain.length/4)
})
function addPage(){
    currentPage.value = currentPage.value + 1
    domains = institution.domain.slice((currentPage.value-1)*4, currentPage.value*4)
}
function minusPage(){
    currentPage.value = currentPage.value - 1
    domains = institution.domain.slice((currentPage.value-1)*4, currentPage.value*4)
}
</script>


<style scoped>
.institution-show-content-nav{
    background-color: #fafafa;
    margin: 10px 0 15px 0;
    /*padding: 30px;*/
}
.institution-show-content-nav-block{
    /*margin: -30px 0 0 -30px;*/
    padding: 13px 0;
    display: flex;
    flex-direction: row;
}
.institution-show-content-nav-holder{
    width: 8px;
    height: 18px;
    background-color: #333333;
}
.institution-show-content-nav-title{
    padding-left: 12px;
    font-size: 18px;
    line-height: 1.125rem;
    font-style: italic;
    font-weight: bold;
}

.basic-block{
    display: flex;
    flex-direction: column;
}

.domain-box {
    --main-color-card: #c8f7dc;
    border-radius: 25px;
    /*width: 100%;*/
    margin: 10px;
    padding: 16px;
    background-color: var(--main-color-card);
}
.domain-box-content-header {
    margin-bottom: 10px;
    p { margin: 0; }
}

.domain-content-header {
    text-align: center;
    font-size: 16px;
    line-height: 24px;
    font-weight: 700;
    opacity: .7;
}

.domain-term {
    display: block;
    height: 4px;
    border-radius: 6px;
}
.domain-term-bar {
    height: 4px;
    border-radius: 6px;
    overflow: hidden;
    background-color: #ffffff;
    margin: 8px 0;
}
.domain-term-activity{
    display: grid;
    grid-template-columns: 58px minmax(0px, 1%) minmax(0px, 70%);
}
.domain-term-header {
    text-align: center;
    font-size: 14px;
    font-weight: 700;
    line-height: 16px;
    margin: 0;
}
.domain-term-percentage {
    text-align: right;
    margin: 0;
    font-size: 14px;
    font-weight: 700;
    line-height: 16px;
}

.domain-more-btn{
    padding: 10px;
    text-align: center;
    min-width: 150px;
    height: 25px;
    line-height: 25px;
    font-size: 14px;
    font-weight: 700;
    opacity: .7;
    font-family: Merriweather Sans, sans-serif;
    margin: 5px 15px 25px 15px;
    border: 1px solid #34c471;
    border-radius: 10px;
    background-color: #c8f7dc;
    cursor: pointer;
}
.domain-btn-group{
    display: flex;
    flex-direction: row;
    padding: 10px;
    min-width: 150px;
    height: 40px;
    font-size: 14px;
    font-weight: 700;
    opacity: .7;
    font-family: Merriweather Sans, sans-serif;
    margin: 5px 15px 25px 15px;
}
.domain-more-two-btn{
    padding: 10px 0 10px 0;
    text-align: center;
    width: 44%;
    min-width: 50px;
    height: 25px;
    line-height: 25px;
    margin: 0 5px 0 5px;
    border: 1px solid #34c471;
    border-radius: 10px;
    background-color: #c8f7dc;
    cursor: pointer;
}
</style>
