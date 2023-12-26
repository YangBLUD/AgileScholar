<template>
    <div class="article-show-content-abstract">
        <div class="article-show-content-nav abstract-nav">
            <div class="article-show-content-nav-block abstract-block">
                <div class="article-show-content-nav-holder"></div>
                <div class="article-show-content-nav-title">ABSTRACT</div>
            </div>
            <p class="article-show-content-abstract-text">{{abstract_text}}</p>
        </div>
    </div>
</template>


<script setup>
import {ref, watch} from "vue";
import store from "../../store/index.js";

const abstract_text = ref(store.state.Article.abstract)
watch(()=>store.state.Article.id, (newVal, oldVal)=>{
    abstract_text.value = store.state.Article.abstract
})


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

.article-show-content-abstract{
    margin: 20px 0 20px 0;
}
.article-show-content-abstract-text{
    margin: 0;
    font-family: Open Sans, sans-serif;
    font-weight: 300;
    font-size: 17px;
    line-height: 34px;
}

.abstract-nav{
    padding: 30px;
}
.abstract-block{
    margin: -30px 0 0 -30px;
}
</style>
