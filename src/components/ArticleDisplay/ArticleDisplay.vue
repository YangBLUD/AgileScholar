<template>
  <div class="header-padding">
    HEADER
  </div>
  <div class="article-show-header">
    <div class="article-show-path">
      <div class="article-show-path-way">Home > Conference > ICGDA > Proceeding > Yuan Shen > Yang Ding Hao de six-life Water God</div>
    </div>
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
            Statistical properties analysis of file modification in open-source software repositories
        </div>
        <div class="article-show-content-line"></div>
        <div class="article-show-content-author">
          <span class="article-show-content-author-title">Authors:</span>
          <div class="article-show-content-author-block">
            <img src="../../assets/ArticleDisplay/head.jpg" alt="" class="article-show-content-author-img">
            <span class="article-show-content-author-name text-gray">
                Yang Dinghao
            </span>
          </div>
            <div class="article-show-content-author-block">
                <img src="../../assets/ArticleDisplay/head.jpg" alt="" class="article-show-content-author-img">
                <span class="article-show-content-author-name text-gray">Yang Dinghao</span>
            </div>
          <span class="article-show-content-author-all text-underline">Authors Info & Claims</span>
        </div>
        <div class="article-show-content-line"></div>
        <div class="article-show-content-source text-gray">
          <p>
            ICGDA '18: Proceedings of the International Conference on Geoinformatics and Data Analysis · April 2018 · Pages 62–66
          </p>
          <ul>
              <li>https://doi.org/10.1145/3220228.3220248</li>
          </ul>
        </div>
        <div class="article-show-content-line"></div>
        <div class="article-show-content-publish">
            <strong>Published:</strong><span class="text-gray"> 20 April 2018</span>
            <span class="text-underline">Publication History</span>
        </div>
        <div class="article-show-content-line"></div>

        <div class="article-show-content-cite">
          <div class="article-show-content-cite-block">
            <img class="article-show-content-cite-show-icon" src="../../assets/ArticleDisplay/cite.png" alt="Cites"><span class="article-show-content-cite-show-text text-blue">{{clickNum}}</span>
            <img class="article-show-content-cite-show-icon" src="../../assets/ArticleDisplay/click.png" alt="Clicks"><span class="article-show-content-cite-show-text text-blue">{{citeNum}}</span>
          </div>
          <div class="article-show-content-cite-btn-block">
            <el-tooltip
                    effect="dark"
                    content="Report"
                    placement="bottom"
            >
              <el-icon class="article-show-content-cite-btn-icon"><Warning /></el-icon>
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
              <el-icon class="article-show-content-cite-btn-icon article-pdf"><Document /> PDF</el-icon>
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
        <div class="article-show-content-abstract">
          <div class="article-show-content-nav abstract-nav">
            <div class="article-show-content-nav-block abstract-block">
              <div class="article-show-content-nav-holder"></div>
              <div class="article-show-content-nav-title">ABSTRACT</div>
            </div>
            <p class="article-show-content-abstract-text">{{abstract_text}}</p>
          </div>
        </div>

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
              <span class="reference-text"><strong>{{index + 1}}. </strong>{{ art }}</span>
            </div>
            <div class="article-show-content-reference-block"
                 v-if="reference_i"
                 v-for="(art, index) in references_2"
            >
              <span class="reference-text"><strong>{{index + 1}}. </strong>{{ art }}</span>
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

        <div class="article-show-content-cited">
          <div class="article-show-content-nav">
            <div class="article-show-content-nav-block">
              <div class="article-show-content-nav-holder"></div>
              <div class="article-show-content-nav-title">Cited By</div>
            </div>
          </div>
        </div>

        <div class="article-show-content-recommendations">
          <div class="article-show-content-nav">
            <div class="article-show-content-nav-block">
              <div class="article-show-content-nav-holder"></div>
              <div class="article-show-content-nav-title">Recommendations</div>
            </div>
          </div>
          <div class="article-show-content-reference-content">
            <div class="article-show-content-reference-block"
                 v-if="!recommendation_i"
                 v-for="(art, index) in recommendations_1"
            >
              <p class="recommendation-text"><strong>{{index + 1}}. </strong>{{ art }}</p>
              <div class="text-underline article-show-content-recommendation-other">Read More</div>
            </div>
            <div class="article-show-content-reference-block"
                 v-if="recommendation_i"
                 v-for="(art, index) in recommendations_2"
            >
              <p class="recommendation-text"><strong>{{index + 1}}. </strong>{{ art }}</p>
              <div class="text-underline article-show-content-recommendation-other">Read More</div>
            </div>
          </div>
          <div class="article-show-content-reference-bottom">
            <button v-if="!recommendation_i" class="article-show-content-reference-btn recommendations-btn" @click="getFewerRecommendation_i()">
                Show Fewer Recommendations
            </button>
            <button v-if="recommendation_i" class="article-show-content-reference-btn recommendations-btn" @click="getMoreRecommendation_i()">
                Show More Recommendations
            </button>
          </div>
        </div>

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
      </div>
      <div class="article-show-aside">

      </div>
    </div>
  </div>
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
    Document, FolderRemove, Folder, CircleCheck, WarningFilled, Comment, Promotion, Warning
} from "@element-plus/icons-vue";
import {ref} from "vue";

let clickNum = ref(120);
let citeNum = ref(45);
let reference_i = ref(true);
let recommendation_i = ref(true);

let abstract_text = ref("Mining the evolutionary rules of source code files can be conducted by analyzing the data generated in the development of open source software. In this paper, the development log information of two famous open source projects is collected and the statistical distribution of the number of developers corresponding to class files modification is analyzed by statistical method. As a result, we discover that the statistical distribution of the number of developers corresponding to class files modification fellows approximately an exponential distribution. In addition, we analyze the features of function and structure of two kinds of class files and discover that both class files developed by developers who have too many modification behaviors to their projects and class files modified by too many developers tend to be more complex. The statistical analysis of these two projects may provide new insights into the research on studying the evolution of open source software, choosing appropriate programmers to refactor open source software and allocating task of maintenance for open source software.");
let references_1 = ref([
    "Lakhani K R, Von Hippel E. How Open Source Software Works: 'Free' User-to-User Assistance?{J}. Research Policy, 2003, 32(6): 923--943.",
    "Hippel E V. Learning from open-source software{J}. Mit Sloan Management Review, 2001.",
    "Lin Y. Mining and Analyzing Behavioral Characteristic of Developers in Open Source Software{J}. Chinese Journal of Computers, 2010.",
    "Gall H C, Lanza M. Software evolution: analysis and visualization{C}. international conference on software engineering, 2006: 1055--1056. ",
    "Hindle A, German D M, Holt R C, et al. What do large commits tell us? : a taxonomical study of large commits{C}. mining software repositories, 2008: 99--108.",
    "Hattori L, Lanza M. On the nature of commits{J}. automated software engineering, 2008: 63--71. ",
    "Lin S, Yutao M A. Statistical properties of file modification in open-source software repositories: case studies{J}. Computer Engineering & Applications, 2013, 49(2):80--85.",
    "Murphy-Hill E, Parnin C, Black A.How we refactor, and how we know it{C}//Proceedings of the 31st International Conference on Software Engineering. Canada: {s.n.}, 2009: 287--297."
]);
let references_2 = ref([
    "Lakhani K R, Von Hippel E. How Open Source Software Works: 'Free' User-to-User Assistance?{J}. Research Policy, 2003, 32(6): 923--943.",
    "Hippel E V. Learning from open-source software{J}. Mit Sloan Management Review, 2001.",
    "Lin Y. Mining and Analyzing Behavioral Characteristic of Developers in Open Source Software{J}. Chinese Journal of Computers, 2010."
])
let recommendations_1 = ref([
    "Lakhani K R, Von Hippel E. How Open Source Software Works: 'Free' User-to-User Assistance?{J}. Research Policy, 2003, 32(6): 923--943.",
    "Hippel E V. Learning from open-source software{J}. Mit Sloan Management Review, 2001.",
    "Lin Y. Mining and Analyzing Behavioral Characteristic of Developers in Open Source Software{J}. Chinese Journal of Computers, 2010.",
    "Gall H C, Lanza M. Software evolution: analysis and visualization{C}. international conference on software engineering, 2006: 1055--1056. ",
    "Hindle A, German D M, Holt R C, et al. What do large commits tell us? : a taxonomical study of large commits{C}. mining software repositories, 2008: 99--108.",
    "Hattori L, Lanza M. On the nature of commits{J}. automated software engineering, 2008: 63--71. ",
    "Lin S, Yutao M A. Statistical properties of file modification in open-source software repositories: case studies{J}. Computer Engineering & Applications, 2013, 49(2):80--85.",
    "Murphy-Hill E, Parnin C, Black A.How we refactor, and how we know it{C}//Proceedings of the 31st International Conference on Software Engineering. Canada: {s.n.}, 2009: 287--297."
]);
let recommendations_2 = ref([
    "Lakhani K R, Von Hippel E. How Open Source Software Works: 'Free' User-to-User Assistance?{J}. Research Policy, 2003, 32(6): 923--943.",
    "Hippel E V. Learning from open-source software{J}. Mit Sloan Management Review, 2001.",
    "Lin Y. Mining and Analyzing Behavioral Characteristic of Developers in Open Source Software{J}. Chinese Journal of Computers, 2010."
])

function getMoreRecommendation_i(){
    recommendation_i.value = false;
}
function getFewerRecommendation_i(){
    recommendation_i.value = true;
}
function getMoreReference_i(){
    reference_i.value = false;
}
function getFewerReference_i(){
    reference_i.value = true;
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
    height: 50px;
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
    margin-left: 18px;
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

.article-show-content-cited{

}

.article-show-content-recommendations{

}
.recommendations-btn{
    width: 320px;
}
.article-show-content-recommendation-other{
    margin-left: auto;
    margin-top: 5px;
    margin-right: 10px;

}
.recommendation-text{
    font-family: "Open Sans", sans-serif;
    font-weight: 300;
}

.article-show-content-comment{
    margin-bottom: 100px;
}
.article-show-content-comment-content{
    margin: 15px auto 15px;
    /*width: 768px;*/
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
.abstract-nav{
    padding: 30px;
}
.abstract-block{
    margin: -30px 0 0 -30px;
}
.reference-text{
    font-family: "Open Sans", sans-serif;
    font-weight: 300;
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
