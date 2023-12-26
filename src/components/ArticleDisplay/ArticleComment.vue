<template>
    <div class="article-show-content-comment" id="comment">
        <div class="article-show-content-nav">
            <div class="article-show-content-nav-block">
                <div class="article-show-content-nav-holder"></div>
                <div class="article-show-content-nav-title">Comment</div>
            </div>
        </div>
        <div class="comment-global">
            <div class="comment-line">
                <img class="sender-img" src="../../assets/logo.png" alt="">
                <input v-model="input_content" class="comment-input" type="text" :placeholder="input_placeholder">
                <el-tooltip effect="dark" content="Cancel" placement="bottom">
                    <el-icon class="comment-send" style="margin-right: 10px" @click="clearReplyTo()">
                        <CloseBold />
                    </el-icon>
                </el-tooltip>
                <el-tooltip effect="dark" content="Send" placement="bottom">
                    <el-icon class="comment-send" @click="sendComment()">
                        <Promotion />
                    </el-icon>
                </el-tooltip>

            </div>
            <div class="article-show-content-comment-content">
                <ul id="comments-list" class="comments-list">
                    <li v-for="comment in comments">
                        <div class="comment-main-level">
                            <div class="comment-avatar"><img src="../../assets/logo.png" alt=""></div>
                            <div class="comment-box">
                                <div class="comment-head">
                                    <h6 v-if="comment.is_scholar" class="comment-name by-author"><a href="">{{ comment.user
                                    }}</a></h6>
                                    <h6 v-if="!comment.is_scholar" class="comment-name"><a href="">{{ comment.user }}</a>
                                    </h6>
                                    <span>{{ comment.comment_time }}</span>
                                    <el-tooltip effect="dark" content="Comment" placement="bottom">
                                        <el-icon class="comment-icon"
                                            @click="confirmReplyTo(comment.user, comment.id, comment.id)">
                                            <Comment />
                                        </el-icon>
                                    </el-tooltip>
                                    <el-tooltip effect="dark" content="Delete" placement="bottom"
                                        v-if="comment.user === user.user_name">
                                        <el-icon class="comment-icon" @click="deleteComment(comment.id)">
                                            <DeleteFilled />
                                        </el-icon>
                                    </el-tooltip>
                                    <el-tooltip effect="dark" content="Report" placement="bottom">
                                        <el-icon class="comment-icon" @click="reportComment(comment.id)">
                                            <WarningFilled />
                                        </el-icon>
                                    </el-tooltip>
                                </div>
                                <div class="comment-content">
                                    {{ comment.content }}
                                </div>
                            </div>
                        </div>
                        <ul class="comments-list reply-list">
                            <li v-for="sec_comment in comment.reply_list">
                                <div class="comment-avatar"><img src="../../assets/logo.png" alt=""></div>
                                <div class="comment-box">
                                    <div class="comment-head">
                                        <h6 v-if="sec_comment.is_scholar" class="comment-name by-author"><a href="">{{
                                            sec_comment.user }}</a></h6>
                                        <h6 v-if="!sec_comment.is_scholar" class="comment-name"><a href="">{{
                                            sec_comment.user }}</a></h6>
                                        <span>reply {{ sec_comment.reply_to }} {{ sec_comment.comment_time }}</span>
                                        <el-tooltip effect="dark" content="Comment" placement="bottom">
                                            <el-icon class="comment-icon"
                                                @click="confirmReplyTo(sec_comment.user, sec_comment.id, comment.id)">
                                                <Comment />
                                            </el-icon>
                                        </el-tooltip>
                                        <el-tooltip effect="dark" content="Delete" placement="bottom"
                                            v-if="sec_comment.user === user.user_name">
                                            <el-icon class="comment-icon" @click="deleteComment(sec_comment.id)">
                                                <DeleteFilled />
                                            </el-icon>
                                        </el-tooltip>
                                        <el-tooltip effect="dark" content="Report" placement="bottom">
                                            <el-icon class="comment-icon" @click="reportComment(sec_comment.id)">
                                                <WarningFilled />
                                            </el-icon>
                                        </el-tooltip>
                                    </div>
                                    <div class="comment-content">
                                        {{ sec_comment.content }}
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <el-dialog title="" v-model="reportDialog" width="40%" :before-close="handleClose">
        <el-form ref="updateInfo" label-width="150px">
            <div class="update-content">
                <div class="left">
                    <el-form-item label="举报说明" prop="description">
                        <el-input v-model="description" :rows="4" type="textarea" placeholder="请输入举报理由" />
                    </el-form-item>
                    <el-form-item class="dialog-form-item" label="详细材料" prop="details">
                        <el-upload ref="upLoads" class="upload-demo" drag :limit="1" :auto-upload="false"
                            :on-change="handleChange" :show-file-list="true">
                            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                            <div class="el-upload__text">
                                Drop file here or <em>click to upload</em>
                            </div>
                        </el-upload>
                    </el-form-item>
                </div>
            </div>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button class="dialog-btn" @click="handleClose()">取消</el-button>
                <el-button class="dialog-btn" type="primary" @click="editP()">
                    保存
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup>

import { defineComponent, reactive, ref, watch } from "vue";
import {
    CloseBold,
    Comment,
    Delete,
    DeleteFilled,
    Promotion,
    UploadFilled,
    WarningFilled
} from "@element-plus/icons-vue";
import store from "../../store/index.js";
import axios from "axios";
import { ElMessage } from "element-plus";
import Report from "./Report.vue";
let user = ref(store.getters.getUserinfo)
let comments = ref(store.state.Article.comments)
watch(() => store.state.Article.id, (newVal, oldVal) => {
    comments.value = store.state.Article.comments
    user.value = store.getters.getUserinfo
    initCommentForm()
})
watch(() => store.state.Article.comment_add_num, (newVal, oldVal) => {
    comments.value = store.state.Article.comments
    user.value = store.getters.getUserinfo
    initCommentForm()
})


const new_comment = reactive({
    paper_id: "",
    content: "",
    reply_to: null,
    id: -1,
    user: "",
    user_id: -1,
    comment_time: "",
    is_scholar: false,
    author_id: "",
    reply_list: []
})
const new_create = reactive({
    new_comment: {},
    first_id: -1,
})
let input_placeholder = ref("请输入评论内容……")
let input_content = ref("")
function confirmReplyTo(username, reply_id, first_id) {
    input_placeholder.value = "reply to " + username
    const targetElement = document.getElementById('comment');
    if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
    }
    new_comment.reply_to = reply_id
    new_create.first_id = first_id
}
function clearReplyTo() {
    initCommentForm()
}
function sendComment() {
    if (!store.getters.getUserinfo.login_or_not) {
        ElMessage.warning("Please Login first")
        return
    }
    new_comment.content = input_content.value
    new_comment.paper_id = store.state.Article.id
    new_comment.user = store.state.User.user_name
    new_comment.user_id = -store.state.User.user_id

    new_comment.is_scholar = false
    new_comment.author_id = ""
    new_comment.reply_list = []
    console.log(store.state.User.token)
    console.log(new_comment.paper_id)
    console.log(new_comment.content)
    console.log(new_comment.reply_to)
    axios({
        // 接口网址：包含协议名，域名，端口和路由
        url: 'http://122.9.5.156:8000/api/v1/paper/comment',
        // 请求方式，默认为get，可以不写
        method: 'post',
        // 请求可以携带的参数，用对象来写，get方法对应params，其他方法对应data
        data: JSON.stringify({
            token: store.state.User.token,
            paper_id: new_comment.paper_id,
            content: new_comment.content,
            reply_to: new_comment.reply_to
        }),
        // 成功请求回数据后，进入then，并用console.log打印结果
    }).then(res => {
        if (res.data.errno === 0) {
            new_comment.comment_time = res.data.data.comment_time
            new_comment.id = res.data.data.comment_id
            new_create.new_comment = new_comment
            console.log(res.data.data)
            // store.commit("addComment", new_create)
            getComment()
            initCommentForm()
        }
        else {
            ElMessage.error('出错啦，找周霄')

            console.log(res.data)
            console.log(user.token)
        }
    }).catch(err => {
        console.log(err)
    })
}
function initCommentForm() {
    input_placeholder.value = "请输入评论内容……"
    input_content.value = ""
    new_create.new_comment = {}
    new_create.first_id = -1

    new_comment.paper_id = ""
    new_comment.content = ""
    new_comment.reply_to = null
    new_comment.id = -1
    new_comment.user = ""
    new_comment.user_id = -1
    new_comment.comment_time = ""
    new_comment.is_scholar = false
    new_comment.author_id = ""
    new_comment.reply_list = []
}

function deleteComment(comment_id) {
    axios({
        // 接口网址：包含协议名，域名，端口和路由
        url: 'http://122.9.5.156:8000/api/v1/paper/delete_comment',
        // 请求方式，默认为get，可以不写
        method: 'post',
        // 请求可以携带的参数，用对象来写，get方法对应params，其他方法对应data
        data: JSON.stringify({
            token: store.state.User.token,
            comment_id: comment_id
        }),
        // 成功请求回数据后，进入then，并用console.log打印结果
    }).then(res => {
        if (res.data.errno === 0) {
            getComment()
        }
        else {
            ElMessage.error('出错啦，找周霄')
            console.log(res.data)
        }
    }).catch(err => {
        console.log(err)
    })
}

function getComment() {
    axios({
        // 接口网址：包含协议名，域名，端口和路由
        url: 'http://122.9.5.156:8000/api/v1/paper/get_comment',
        // 请求方式，默认为get，可以不写
        method: 'post',
        // 请求可以携带的参数，用对象来写，get方法对应params，其他方法对应data
        data: JSON.stringify({
            paper_id: store.state.Article.id,
        }),
        // 成功请求回数据后，进入then，并用console.log打印结果
    }).then(res => {
        if (res.data.errno === 0) {
            store.commit('updateComment', res.data.data)
            store.commit("updateCommentNum")
            console.log(res.data.data)
        }
        else {
            ElMessage.error('出错啦，找周霄')
        }
    }).catch(err => {
        console.log(err)
    })
}


let description = ref("")
const reportDialog = ref(false)

let comment_id = ref(-1)
function reportComment(com_id) {
    comment_id.value = com_id
    reportDialog.value = true
}
const upFile = ref(null)
const reportUrl = ref("http://122.9.5.156:8000/api/v1/paper/report_comment_or_paper")
const handleChange = (file) => {
    upFile.value = file.raw
    console.log(upFile.value)
};
function handleClose() {
    reportDialog.value = false
    description.value = ""
    upFile.value = null
}
const handleUploadSuccess = (response) => {
    ElMessage.success("Report successful, please wait for the administrator to process！")
};

const handleUploadError = (err) => {
    // 上传失败的回调函数
    console.log(err);
};

function editP() {
    // console.log(userInfo)
    // uploadFile(userImage)
    const formData = new FormData();
    formData.append("token", store.state.User.token);
    formData.append("paper_id", store.state.Article.id);
    formData.append("report_text", description.value)
    formData.append("report_file", upFile.value);
    console.log(upFile.value)
    formData.append("comment_id", comment_id.value);
    // 发送上传请求
    axios.post(reportUrl.value, formData)
        .then(response => {
            console.log(response)
            handleUploadSuccess(response.data);
        })
        .catch(error => {
            handleUploadError(error);
        });
    reportDialog.value = false
    description.value = ""
    upFile.value = null
}
</script>

<style scoped>
.article-show-content-nav {
    background-color: #fafafa;
    margin: 10px 0 15px 0;
    /*padding: 30px;*/
}

.article-show-content-nav-block {
    /*margin: -30px 0 0 -30px;*/
    padding: 13px 0;
    display: flex;
    flex-direction: row;
}

.article-show-content-nav-holder {
    width: 8px;
    height: 18px;
    background-color: #333333;
}

.article-show-content-nav-title {
    padding-left: 12px;
    font-size: 18px;
    line-height: 1.125rem;
    font-style: italic;
    font-weight: bold;
}


.article-show-content-comment {
    margin-bottom: 100px;
}

.article-show-content-comment-content {
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

.reply-list:before,
.reply-list:after {
    display: none;
}

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
    -webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    -moz-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
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
    -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
    -moz-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
}

.comments-list .comment-box:before,
.comments-list .comment-box:after {
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
    border-color: transparent rgba(0, 0, 0, 0.05);
    left: -12px;
}

.reply-list .comment-box {
    width: 710px;
    min-width: 340px;
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

.comment-box .comment-name.by-author,
.comment-box .comment-name.by-author a {
    color: #03658c;
}

.comment-box .comment-name.by-author:after {
    content: 'scholar';
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

.comment-icon {
    font-size: 20px;
}

.comment-icon :hover {
    color: #535bf2;
}

.comment-line {
    display: flex;
    flex-direction: row;
    height: 38px;
    padding: 15px 0;
    border-bottom: 1px dashed #d0d0d0;
    border-top: 1px dashed #d0d0d0;
}

.sender-img {
    width: 37px;
    height: 37px;
    border-radius: 50%;
    margin-right: 10px;
    border: 1px solid #d0d0d0;
}

.comment-input {
    border-radius: 15px;
    border: 2px solid #ededed;
    padding: 7px 10px;
    margin: 0 10px 0 0;
    box-sizing: border-box;
    width: 780px;
}

.comment-send {
    font-size: 20px;
    width: 37px;
    min-width: 37px;
    height: 37px;
    border-radius: 50%;
    border: 1px solid #d0d0d0;
    color: #6b6b6b;
    cursor: pointer;
}

.comment-global {
    margin-top: 25px;
}

.update-content {
    max-height: 680px;
    overflow: auto;
}

.left {
    width: 80%;
}

.upload-demo {
    width: 660px;
}

.dialog-btn {
    padding: 5px 15px 5px 15px;
}

.dialog-form-item {
    margin-top: 20px;
}
</style>
