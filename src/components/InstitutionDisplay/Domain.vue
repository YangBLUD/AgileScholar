<template>
    <div class="institution-show-content-nav">
        <div class="institution-show-content-nav-block Basic-block">
            <div class="institution-show-content-nav-holder"></div>
            <div class="institution-show-content-nav-title">Domain</div>
        </div>
        <div class="basic-block">
            <div class="domain-box">
                <div class="domain-box-content-header">
                    <p class="domain-content-header">{{ domain_name }}</p>
                </div>
                <div class="domain-term-wrapper">
                    <div class="domain-term-activity">
                        <div class="domain-term-header">Activity</div>
                        <div class="holder"></div>
                        <div class="domain-term-bar">
                            <span class="domain-term" style="width: 50%; background-color: #34c471"></span>
                        </div>
                    </div>
                    <p class="domain-term-percentage">{{ domain_activity }}</p>
                </div>
            </div>
            <div class="domain-box">
                <div class="domain-box-content-header">
                    <p class="domain-content-header">{{ domain_name }}</p>
                </div>
                <div class="domain-term-wrapper">
                    <div class="domain-term-activity">
                        <div class="domain-term-header">Activity</div>
                        <div class="holder"></div>
                        <div class="domain-term-bar">
                            <span class="domain-term" style="width: 50%; background-color: #34c471"></span>
                        </div>
                    </div>
                    <p class="domain-term-percentage">{{ domain_activity }}</p>
                </div>
            </div>
            <div class="domain-box">
                <div class="domain-box-content-header">
                    <p class="domain-content-header">{{ domain_name }}</p>
                </div>
                <div class="domain-term-wrapper">
                    <div class="domain-term-activity">
                        <div class="domain-term-header">Activity</div>
                        <div class="holder"></div>
                        <div class="domain-term-bar">
                            <span class="domain-term" style="width: 50%; background-color: #34c471"></span>
                        </div>
                    </div>
                    <p class="domain-term-percentage">{{ domain_activity }}</p>
                </div>
            </div>
        </div>
    </div>

</template>


<script setup>

import {reactive, ref} from "vue";
import HomePage from "../../views/HomePage/HomePage.vue";

let domain_name = ref("Operating System")
let domain_activity = ref("%50")
let domains = reactive({})
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
</style>
