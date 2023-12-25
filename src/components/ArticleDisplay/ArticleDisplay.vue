<template>
  <div>
      <TopNav></TopNav>
  </div>
<!--  <div class="header-padding">-->
<!--    HEADER-->
<!--  </div>-->
  <div class="article-show-header">

  </div>
  <div class="article-show-body">
    <div class="article-show-row">
      <div class="article-show-aside"></div>
      <div class="article-show-content">
        <div class="article-show-content-head">
          <div class="article-show-content-info">RESEARCH-ARTICLE</div>
          <div class="article-show-content-group">
            <el-icon class="article-show-content-icon"><InfoFilled /></el-icon>
            <el-icon class="article-show-content-icon"><View /></el-icon>
            <el-icon class="article-show-content-icon"><PieChart /></el-icon>
            <el-icon class="article-show-content-icon"><Bell /></el-icon>
            <el-icon class="article-show-content-icon"><MessageBox /></el-icon>
            <el-icon class="article-show-content-icon"><Share /></el-icon>
          </div>
        </div>
        <div class="article-show-content-title">
            {{article_title}}
        </div>
        <div class="article-show-content-line"></div>
        <div class="article-show-content-author">
          <span class="article-show-content-author-title">Authors:</span>
          <div v-for="author in authors.slice(0,5)" class="article-show-content-author-block">
            <img src="../../assets/ArticleDisplay/head.jpg" alt="" class="article-show-content-author-img">
            <span class="article-show-content-author-name text-gray">
                {{ author.name }}
            </span>
          </div>
          <span class="article-show-content-author-all text-underline">Authors Info & Claims</span>
        </div>
        <div class="article-show-content-line"></div>
        <div class="article-show-content-source text-gray">
          <p>
            {{ source }}
          </p>
          <ul>
              <li><a :href="landing_page_url">{{ landing_page_url }}</a> </li>
          </ul>
        </div>
        <div class="article-show-content-line"></div>
        <div class="article-show-content-publish">
            <strong>Published: </strong><span class="text-gray"> {{ publish_date }} </span>
<!--            <span class="text-underline">Publication History</span>-->
        </div>
        <div class="article-show-content-line"></div>

        <div class="article-show-content-cite">
          <div class="article-show-content-cite-block">
            <img class="article-show-content-cite-show-icon" src="../../assets/ArticleDisplay/cite.png" alt="Cites"><span class="article-show-content-cite-show-text text-blue">{{ cited_count }}</span>
            <img class="article-show-content-cite-show-icon" src="../../assets/ArticleDisplay/click.png" alt="Clicks"><span class="article-show-content-cite-show-text text-blue">{{ clickNum }}</span>
          </div>
          <div class="article-show-content-cite-btn-block">
            <el-tooltip
                    effect="dark"
                    content="Report"
                    placement="bottom"
            >
              <el-icon class="article-show-content-cite-btn-icon" @click="reportArticle()"><Warning /></el-icon>
            </el-tooltip>
            <el-tooltip
                    effect="dark"
                    content="Generate reference format"
                    placement="bottom"
            >
                <el-icon class="article-show-content-cite-btn-icon"><Connection /></el-icon>
            </el-tooltip>
            <el-tooltip
                    effect="dark"
                    content="Add to favorites"
                    placement="bottom"
            >
              <el-icon class="article-show-content-cite-btn-icon"><Folder /></el-icon>

<!--              <StarDialog class="article-show-content-cite-btn-icon" :token="store.state.User.token" :paper_id:="store.state.Article.id" :type="0" :is_star="store.state.Article.is_star"></StarDialog>-->
            </el-tooltip>
<!--            <el-tooltip-->
<!--                    effect="dark"-->
<!--                    content="Generate reference format"-->
<!--                    placement="bottom"-->
<!--            >-->
<!--              <el-icon class="article-show-content-cite-btn-icon"><FolderRemove /></el-icon>-->
<!--            </el-tooltip>-->
            <el-tooltip
                    effect="dark"
                    content="PDF file"
                    placement="bottom"
            >
              <el-icon v-if="pdfUrl!==null" class="article-show-content-cite-btn-icon article-pdf" @click="downloadPdf()"><Document /> PDF</el-icon>
            </el-tooltip>
          </div>
        </div>
        <div class="article-show-content-line"></div>
      </div>
      <div class="article-show-aside"></div>
    </div>

    <div class="article-show-row">
      <div class="article-show-aside">

      </div>
      <div class="article-show-content">
        <Abstract/>
        <Reference/>
        <Recommendation/>
        <ArticleComment/>
      </div>
      <div class="article-show-aside">

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
                    <el-form-item label="详细材料" prop="details">
                        <el-upload
                                ref="upLoads"
                                class="upload-demo"
                                drag
                                :limit="1"
                                :auto-upload="false"
                                :on-change="handleChange"
                                :show-file-list="true"
                        >
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
              <el-button @click="handleClose()">取消</el-button>
              <el-button type="primary" @click="editP()">
                保存
              </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup>
import {
    Bell,
    Connection,
    InfoFilled,
    MessageBox,
    PieChart,
    Pointer,
    Share,
    View,
    Link,
    Document, FolderRemove, Folder, CircleCheck, WarningFilled, Comment, Promotion, Warning, UploadFilled
} from "@element-plus/icons-vue";
import {onMounted, reactive, ref, watch} from "vue";
import TopNav from "../HomePage/TopNav.vue";
import ArticleComment from "./ArticleComment.vue";
import Recommendation from "./Recommendation.vue";
import Reference from "./Reference.vue";
import Abstract from "./Abstract.vue";
import CitedBy from "./CitedBy.vue";
import store from "../../store/index.js";
import router from "../../router/index.js";
import {ElMessage} from "element-plus";
import axios from "axios";
import StarDialog from "./StarDialog.vue";

let clickNum = ref(120);
let article_title = ref(store.state.Article.title)
let authors = ref(store.state.Article.Authors)
let cited_count = ref(store.state.Article.cited_count)
let landing_page_url = ref(store.state.Article.landing_page_url)
let publish_date = ref(store.state.Article.publication_date)
let source = ref(store.getters.get_source)
let pdfUrl = ref(store.state.Article.pdf_url)

watch(()=>store.state.Article.id, (newVal, oldVal)=>{
    article_title.value = store.state.Article.title
    console.log(store.state.Article.title)
    authors.value = store.state.Article.Authors
    cited_count.value = store.state.Article.cited_count
    landing_page_url.value = store.state.Article.landing_page_url
    publish_date.value = store.state.Article.publication_date
    source.value = store.getters.get_source
    pdfUrl.value = store.state.Article.pdf_url
    window.scrollTo(0,0)
})


const reportDialog = ref(false)

function reportArticle(){
    reportDialog.value = true
}
const file = ref(null)
const reportUrl = ref("http://122.9.5.156:8000/api/v1/paper/report_comment_or_paper")
let description = ref("")
const handleChange = (file) => {
    file.value = file.raw
    console.log(file.value)
};
function handleClose() {
    reportDialog.value = false
    description.value = ""
    file.value = null
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
    formData.append("report_text", description.value);
    formData.append("report_file", file.value);
    console.log(description.value)
    console.log(file.value)
    // formData.append("comment_id", null);
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
}

function downloadPdf(){
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.target = '_blank'; // 打开新窗口
    link.download = 'document.pdf'; // 下载时的文件名

    // 模拟点击链接以触发下载
    link.click();
}
</script>

<style scoped>
.header-padding{
    /*width: 100vw;*/
    height: 8vh;
    min-height: 68px;
    color: #f9f9f9;
    background-color: #1a1a1a;
}


.article-show-header{
    height: 75px;
    /*width: 100vw;*/
    display: flex;
    flex-direction: column;
    align-items: center;
}
.article-show-path{
    width: 100%;
    max-width: 1300px;
    padding: 0 15px;
    /*background-color: #f0f0f0;*/
    line-height: 50px;
    color: #595959;
}
.article-show-path-way{
}


.article-show-body{
    /*width: 100vw;*/
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.article-show-row{
    width: 100%;
    height: auto;
    /*min-height: 46vh;*/
    max-width: 1300px;
    padding: 0 15px;
    /*background-color: #f9f9f9;*/
    display: grid;
    grid-template-columns: minmax(200px, 16%) minmax(400px, 68%) minmax(200px, 16%);
}
.article-show-aside{
    /*background-color: #f3f3f3;*/
}

.article-show-content{
    height: auto;
    /*background-color: #f6f6f6;*/
    font-size: 14px;
    display: block;
}
.article-show-content-head{
    height: 30px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    color: #888888;
}
.article-show-content-info{
    font-size: 12px;
}
.article-show-content-icon{
    width: 20px;
    height: 20px;
    margin: 5px;
    font-size: 20px;
}
.article-show-content-title{
    line-height: 40px;
    font-size: 28px;
    font-weight: bold;
}
.article-show-content-line{
    width: 100%;
    border-style: solid;
    border-width: 1px;
    border-color: #e1e1e1;
    margin: 10px 0 8px 0;
    color: #212121;
}

.article-show-content-author{
    line-height: 36px;
    height: auto;
    flex-wrap: wrap;
    display: flex;
    flex-direction: row;
    align-items: center;
}
.article-show-content-author-title{
    font-weight: bold;
}
.article-show-content-author-block{
    line-height: 36px;
    height: 36px;
    margin: 4px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}
.article-show-content-author-img{
    width: 30px;
    height: 30px;
    margin: 5px;
    border-radius: 30px;
}
.article-show-content-author-name{
    text-decoration: underline;
    white-space: nowrap;
}
.article-show-content-author-all{
    margin-left: 10px;
}
.article-show-content-author-all :hover{
    color: #535bf2;
}

.article-show-content-source{
}
.article-show-content-source ul{
    margin-left: -20px;
}
.article-show-content-source p{
    margin: 14px 0;
}

.article-show-content-publish{
    margin: 20px 0;
}

.article-show-content-cite{
    margin: 15px 0 15px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.article-show-content-cite-block{
    height: 30px;
}
.article-show-content-cite-show-icon{
    width: 20px;
    height: 20px;
}
.article-show-content-cite-show-text{
    vertical-align: top;
    font-size: 16px;
    margin: 0 3px;
}
.article-show-content-cite-btn-icon{
    width: 30px;
    height: 30px;
    font-size: 15px;
    margin: 0 5px;
    background-color: #f0f0f0;
    color: #6b6b6b;
    border-radius: 2px;
}



.text-gray{
    color: #595959;
}
.text-underline{
    color: #646cff;
    text-decoration: underline;
    /*margin-left: 10px;*/
    cursor: pointer;
}
.text-blue{
    color: #0077c2;
}
.article-pdf{
    width: 70px;
    color: #f9f9f9;
    background-color: #d40c03;
}
.update-content {
    max-height: 680px;
    overflow: auto;
}

.left {
    width: 80%;
}

.upload-demo{
    width: 660px;
}

/** {*/
/*    margin: 0;*/
/*    padding: 0;*/
/*    !*-webkit-box-sizing: border-box;*!*/
/*    !*-moz-box-sizing: border-box;*!*/
/*    !*box-sizing: border-box;*!*/
/*}*/
</style>
