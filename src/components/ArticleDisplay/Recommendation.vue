<template>
    <div class="article-show-content-recommendations">
        <div class="article-show-content-nav">
            <div class="article-show-content-nav-block">
                <div class="article-show-content-nav-holder"></div>
                <div class="article-show-content-nav-title">Recommendations</div>
            </div>
        </div>
        <div class="article-show-content-reference-content">
            <div class="article-show-content-reference-block" v-if="!recommendation_i"
                v-for="(art, index) in recommendations_1">
                <p class="recommendation-text"><strong>{{ index + 1 }}. </strong>{{ art.dis }}</p>
                <div class="text-underline article-show-content-recommendation-other">
                    <router-link :to="{ name: 'article-display', params: { id: art.id } }" @click="jump(art.id)">
                        Read More
                    </router-link>
                </div>
            </div>
            <div class="article-show-content-reference-block" v-if="recommendation_i"
                v-for="(art, index) in recommendations_2">
                <p class="recommendation-text"><strong>{{ index + 1 }}. </strong>{{ art.dis }}</p>
                <div class="text-underline article-show-content-recommendation-other">
                    <router-link :to="{ name: 'article-display', params: { id: art.id } }" @click="jump(art.id)">
                        Read More
                    </router-link>
                </div>
            </div>
        </div>
        <div class="article-show-content-reference-bottom">
            <button v-if="!recommendation_i" class="article-show-content-reference-btn recommendations-btn"
                @click="getFewerRecommendation_i()">
                Show Fewer Recommendations
            </button>
            <button v-if="recommendation_i" class="article-show-content-reference-btn recommendations-btn"
                @click="getMoreRecommendation_i()">
                Show More Recommendations
            </button>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import store from "../../store/index.js";
import axios from "axios";
import { ElMessage } from "element-plus";
import { useRoute, useRouter } from "vue-router";
import router from "../../router/index.js";
const route = useRoute()
let recommendation_i = ref(true);

const recommendations_1 = ref(store.getters.get_recommendations)
const recommendations_2 = ref(store.getters.get_few_recommendations)
watch(() => store.state.Article.id, (newVal, oldVal) => {
    recommendations_1.value = store.getters.get_recommendations
    recommendations_2.value = store.getters.get_few_recommendations
})
// watch(()=>route.params.id, (newVal, oldVal)=>{
//     jump(newVal)
// })
onMounted(() => {
    jump(route.params.id)
})
watch(() => route.path, (newPath, oldPath) => {
  jump(route.params.id)
});
function getMoreRecommendation_i() {
    recommendation_i.value = false;
}
function getFewerRecommendation_i() {
    recommendation_i.value = true;
}

function jump(article_id) {
    axios({
        // 接口网址：包含协议名，域名，端口和路由
        url: 'http://122.9.5.156:8000/api/v1/paper/get_comment',
        // 请求方式，默认为get，可以不写
        method: 'post',
        // 请求可以携带的参数，用对象来写，get方法对应params，其他方法对应data
        data: JSON.stringify({
            paper_id: article_id,
        }),
        // 成功请求回数据后，进入then，并用console.log打印结果
    }).then(res => {
        if (res.data.errno === 0) {
            store.commit('updateComment', res.data.data)
            console.log(res.data.data)
        }
        else {
            ElMessage.error('出错啦，找周霄')
        }
    }).catch(err => {
        console.log(err)
    })
    axios({
        // 接口网址：包含协议名，域名，端口和路由
        url: 'http://122.9.5.156:8000/api/v1/paper/get_paper_information',
        // 请求方式，默认为get，可以不写
        method: 'post',
        // 请求可以携带的参数，用对象来写，get方法对应params，其他方法对应data
        data: JSON.stringify({
            token: store.getters.getUserinfo.token.value,
            paper_id: article_id,
        }),
        // 成功请求回数据后，进入then，并用console.log打印结果
    }).then(res => {
        if (res.data.errno === 0) {
            store.commit('updateCurrent', res.data.data)
            console.log(res.data.data)
        }
        else {
            ElMessage.error('出错啦，找周霄')
        }
    }).catch(err => {
        console.log(err)
    })
    if (store.getters.getLoginState) {
        axios({
            // 接口网址：包含协议名，域名，端口和路由
            url: 'http://122.9.5.156:8000/api/v1/home/add_history',
            // 请求方式，默认为get，可以不写
            method: 'post',
            // 请求可以携带的参数，用对象来写，get方法对应params，其他方法对应data
            data: JSON.stringify({
                token: store.getters.getUserinfo.token,
                paper_id: article_id,
                type: 0,
            }),
            // 成功请求回数据后，进入then，并用console.log打印结果
        }).then(res => {
            if (res.data.errno === 0) {
                // console.log(res.data.data)
            }
            else {
                ElMessage.error('出错啦，找周霄')
            }
        }).catch(err => {
            console.log(err)
        })
    }
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


.article-show-content-recommendations {}

.recommendations-btn {
    width: 320px;
}

.article-show-content-recommendation-other {
    margin-left: auto;
    margin-top: 5px;
    margin-right: 10px;

}

.recommendation-text {
    font-family: "Open Sans", sans-serif;
    font-weight: 300;
}


.article-show-content-reference-block {
    margin-top: 8px;
    padding-bottom: 16px;
    font-size: 14px;
    line-height: 20px;
    color: #000000;
    border-bottom: 1px dashed #6b6b6b;
    display: flex;
    flex-direction: column;

}

.article-show-content-reference-bottom {
    display: flex;
    flex-direction: row;
    justify-content: center;
    border-bottom: 1px dashed #e0e0e0;
    margin-bottom: 40px;
}

.article-show-content-reference-btn {
    padding: 12px 54px 12px 54px;
    width: 320px;
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

.article-show-content-reference-btn :hover {
    background-color: #f0f0f0;
}

.text-underline {
    color: #646cff;
    text-decoration: underline;
    /*margin-left: 10px;*/
    cursor: pointer;
}

.reference-text {
    font-family: "Open Sans", sans-serif;
    font-weight: 300;
}
</style>
