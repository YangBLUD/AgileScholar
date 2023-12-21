<template>
    <div class="article-show-content-comment">
        <div class="article-show-content-nav">
            <div class="article-show-content-nav-block">
                <div class="article-show-content-nav-holder"></div>
                <div class="article-show-content-nav-title">Comment</div>
            </div>
        </div>
        <div class="comment-global">
            <div class="comment-line">
                <img class="sender-img" src="../../assets/ArticleDisplay/head.jpg" alt="">
                <input class="comment-input" type="text">
                <el-icon class="comment-send"><Promotion /></el-icon>
            </div>
            <div class="article-show-content-comment-content">
                <ul id="comments-list" class="comments-list">
                    <li>
                        <div class="comment-main-level">
                            <!-- Avatar -->
                            <div class="comment-avatar"><img src="http://i9.photobucket.com/albums/a88/creaticode/avatar_1_zps8e1c80cd.jpg" alt=""></div>
                            <!-- Contenedor del Comentario -->
                            <div class="comment-box">
                                <div class="comment-head">
                                    <h6 class="comment-name by-author"><a href="http://creaticode.com/blog">Agustin Ortiz</a></h6>
                                    <span>hace 20 minutos</span>
                                    <el-tooltip
                                            effect="dark"
                                            content="Comment"
                                            placement="bottom"
                                    >
                                        <el-icon class="comment-icon"><Comment /></el-icon>
                                    </el-tooltip>
                                    <el-tooltip
                                            effect="dark"
                                            content="Report"
                                            placement="bottom"
                                    >
                                        <el-icon class="comment-icon"><WarningFilled /></el-icon>
                                    </el-tooltip>
                                </div>
                                <div class="comment-content">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit omnis animi et iure laudantium vitae, praesentium optio, sapiente distinctio illo?
                                </div>
                            </div>
                        </div>
                        <!-- Respuestas de los comentarios -->
                        <ul class="comments-list reply-list">
                            <li>
                                <!-- Avatar -->
                                <div class="comment-avatar"><img src="http://i9.photobucket.com/albums/a88/creaticode/avatar_2_zps7de12f8b.jpg" alt=""></div>
                                <!-- Contenedor del Comentario -->
                                <div class="comment-box">
                                    <div class="comment-head">
                                        <h6 class="comment-name"><a href="http://creaticode.com/blog">Lorena Rojero</a></h6>
                                        <span>hace 10 minutos</span>
                                        <el-tooltip
                                                effect="dark"
                                                content="Report"
                                                placement="bottom"
                                        >
                                            <el-icon class="comment-icon"><WarningFilled /></el-icon>
                                        </el-tooltip>
                                    </div>
                                    <div class="comment-content">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit omnis animi et iure laudantium vitae, praesentium optio, sapiente distinctio illo?
                                    </div>
                                </div>
                            </li>
                            <li>
                                <!-- Avatar -->
                                <div class="comment-avatar"><img src="http://i9.photobucket.com/albums/a88/creaticode/avatar_1_zps8e1c80cd.jpg" alt=""></div>
                                <!-- Contenedor del Comentario -->
                                <div class="comment-box">
                                    <div class="comment-head">
                                        <h6 class="comment-name by-author"><a href="http://creaticode.com/blog">Agustin Ortiz</a></h6>
                                        <span>hace 10 minutos</span>
                                        <el-tooltip
                                                effect="dark"
                                                content="Report"
                                                placement="bottom"
                                        >
                                            <el-icon class="comment-icon"><WarningFilled /></el-icon>
                                        </el-tooltip>
                                    </div>
                                    <div class="comment-content">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit omnis animi et iure laudantium vitae, praesentium optio, sapiente distinctio illo?
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <div class="comment-main-level">
                            <!-- Avatar -->
                            <div class="comment-avatar"><img src="http://i9.photobucket.com/albums/a88/creaticode/avatar_2_zps7de12f8b.jpg" alt=""></div>
                            <!-- Contenedor del Comentario -->
                            <div class="comment-box">
                                <div class="comment-head">
                                    <h6 class="comment-name"><a href="http://creaticode.com/blog">Lorena Rojero</a></h6>
                                    <span>hace 10 minutos</span>
                                    <el-tooltip
                                            effect="dark"
                                            content="Report"
                                            placement="bottom"
                                    >
                                        <el-icon class="comment-icon"><WarningFilled /></el-icon>
                                    </el-tooltip>
                                </div>
                                <div class="comment-content">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit omnis animi et iure laudantium vitae, praesentium optio, sapiente distinctio illo?
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>

import {defineComponent} from "vue";
import {Comment, Promotion, WarningFilled} from "@element-plus/icons-vue";

export default defineComponent({
    components: {Promotion, Comment, WarningFilled}
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


.article-show-content-comment{
    margin-bottom: 100px;
}
.article-show-content-comment-content{
    margin: 15px auto 15px;
    /*width: 768px;*/
}



/*  评论区 */
* {
    margin: 0;
    padding: 0;
    /*-webkit-box-sizing: border-box;*/
    /*-moz-box-sizing: border-box;*/
    /*box-sizing: border-box;*/
}

.article-show-content-comment-content a {
    color: #03658c;
    text-decoration: none;
}

.article-show-content-comment-content ul {
    list-style-type: none;
}

.article-show-content-comment-content h1 {
    font-size: 36px;
    color: #283035;
    font-weight: 400;
}

.article-show-content-comment-content h1 a {
    font-size: 18px;
    font-weight: 700;
}

.comments-list {
    margin-top: 30px;
    position: relative;
}

/**
 * Lineas / Detalles
 -----------------------*/
.comments-list:before {
    content: '';
    width: 2px;
    height: 100%;
    background: #c7cacb;
    position: absolute;
    left: 32px;
    top: 0;
}

.comments-list:after {
    content: '';
    position: absolute;
    background: #c7cacb;
    bottom: 0;
    left: 27px;
    width: 7px;
    height: 7px;
    border: 3px solid #dee1e3;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
}

.reply-list:before, .reply-list:after {display: none;}
.reply-list li:before {
    content: '';
    width: 60px;
    height: 2px;
    background: #c7cacb;
    position: absolute;
    top: 25px;
    left: -55px;
}


.comments-list li {
    margin-bottom: 15px;
    display: block;
    position: relative;
}

.comments-list li:after {
    content: '';
    display: block;
    clear: both;
    height: 0;
    width: 0;
}

.reply-list {
    padding-left: 88px;
    clear: both;
    margin-top: 15px;
}
/**
 * Avatar
 ---------------------------*/
.comments-list .comment-avatar {
    width: 65px;
    height: 65px;
    position: relative;
    z-index: 99;
    float: left;
    border: 3px solid #FFF;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    -webkit-box-shadow: 0 1px 2px rgba(0,0,0,0.2);
    -moz-box-shadow: 0 1px 2px rgba(0,0,0,0.2);
    box-shadow: 0 1px 2px rgba(0,0,0,0.2);
    overflow: hidden;
}

.comments-list .comment-avatar img {
    width: 100%;
    height: 100%;
}

.reply-list .comment-avatar {
    width: 50px;
    height: 50px;
}

.comment-main-level:after {
    content: '';
    width: 0;
    height: 0;
    display: block;
    clear: both;
}
/**
 * Caja del Comentario
 ---------------------------*/
.comments-list .comment-box {
    width: 780px;
    float: right;
    position: relative;
    -webkit-box-shadow: 0 1px 1px rgba(0,0,0,0.15);
    -moz-box-shadow: 0 1px 1px rgba(0,0,0,0.15);
    box-shadow: 0 1px 1px rgba(0,0,0,0.15);
}

.comments-list .comment-box:before, .comments-list .comment-box:after {
    content: '';
    height: 0;
    width: 0;
    position: absolute;
    display: block;
    border-width: 10px 12px 10px 0;
    border-style: solid;
    border-color: transparent #FCFCFC;
    top: 8px;
    left: -11px;
}

.comments-list .comment-box:before {
    border-width: 11px 13px 11px 0;
    border-color: transparent rgba(0,0,0,0.05);
    left: -12px;
}

.reply-list .comment-box {
    width: 710px;
}
.comment-box .comment-head {
    background: #FCFCFC;
    padding: 10px 12px;
    border-bottom: 1px solid #E5E5E5;
    overflow: hidden;
    -webkit-border-radius: 4px 4px 0 0;
    -moz-border-radius: 4px 4px 0 0;
    border-radius: 4px 4px 0 0;
}

.comment-box .comment-head i {
    float: right;
    margin-left: 14px;
    position: relative;
    top: 2px;
    color: #A6A6A6;
    cursor: pointer;
    -webkit-transition: color 0.3s ease;
    -o-transition: color 0.3s ease;
    transition: color 0.3s ease;
}

.comment-box .comment-head i:hover {
    color: #03658c;
}

.comment-box .comment-name {
    color: #283035;
    font-size: 14px;
    font-weight: 700;
    float: left;
    margin-right: 10px;
}

.comment-box .comment-name a {
    color: #283035;
}

.comment-box .comment-head span {
    float: left;
    color: #999;
    font-size: 13px;
    position: relative;
    top: 1px;
}

.comment-box .comment-content {
    background: #FFF;
    padding: 12px;
    font-size: 15px;
    color: #595959;
    -webkit-border-radius: 0 0 4px 4px;
    -moz-border-radius: 0 0 4px 4px;
    border-radius: 0 0 4px 4px;
}

.comment-box .comment-name.by-author, .comment-box .comment-name.by-author a {color: #03658c;}
.comment-box .comment-name.by-author:after {
    content: 'autor';
    background: #03658c;
    color: #FFF;
    font-size: 12px;
    padding: 3px 5px;
    font-weight: 700;
    margin-left: 10px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
}

/** =====================
 * Responsive
 ========================*/
@media only screen and (max-width: 766px) {
    .comments-container {
        width: 480px;
    }

    .comments-list .comment-box {
        width: 390px;
    }

    .reply-list .comment-box {
        width: 320px;
    }
}

.comment-icon{
    font-size: 20px;
}
.comment-icon :hover{
    color: #535bf2;
}
.comment-line{
    display: flex;
    flex-direction: row;
    height: 38px;
    padding: 15px 0;
    border-bottom: 1px dashed #d0d0d0;
    border-top: 1px dashed #d0d0d0;
}
.sender-img{
    width: 37px;
    height: 37px;
    border-radius: 50%;
    margin-right: 10px;
    border: 1px solid #d0d0d0;
}
.comment-input{
    border-radius: 15px;
    border: 2px solid #ededed;
    padding: 7px 10px;
    margin: 0 10px 0 0;
    box-sizing: border-box;
    width: 780px;
}
.comment-send{
    font-size: 20px;
    width: 37px;
    height: 37px;
    border-radius: 50%;
    border: 1px solid #d0d0d0;
    color: #6b6b6b;
}
</style>
