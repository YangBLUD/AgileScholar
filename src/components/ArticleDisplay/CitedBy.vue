<template>
    <div class="article-show-content-cited">
        <div class="article-show-content-nav">
            <div class="article-show-content-nav-block">
                <div class="article-show-content-nav-holder"></div>
                <div class="article-show-content-nav-title">Cited By</div>
            </div>
        </div>
    </div>
</template>


<script setup>

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

.article-show-content-cited{

}


</style>
