<template>
    <div class="main" @click="">
        <div class="left">
            <div class="timer">
                <div class="state">
                    PROCEEDING
                </div>
                <div class="time">
                    {{ props.info.publication_date }}
                </div>
            </div>
            <div class="pic">
                <img src="../../assets/result.png" alt="" style="width: 120px;height: 150px;">
            </div>
        </div>
        <div class="right">
            <div class="title">
                <router-link class="link" :to="{ name: 'article-display', params: { id: props.info.id } }">
                    <span v-html="props.info.title"></span>
                </router-link>
            </div>
            <div class="wri_list">
                <div class="writer" v-if="props.info.author_all" v-for="item in props.info.author_all.slice(0, 2)">
                    <img src="../../assets/logo.png" class="writer-pic" />
                    <router-link :to="{ name: 'scholar-display', params: { id: item.id } }">
                        <div class="name"><span v-html="item.name"></span></div>
                    </router-link>

                </div>
            </div>
            <div class="abstract">
                <div v-if="props.info.abstract" class="ab-text"><span v-html="props.info.abstract"></span></div>
                <div v-else>without abstract</div>
            </div>
            <div class="bottom">
                <div class="data">
                    <div class="inference">
                        <img src="../../assets/ArticleDisplay/cite.png" style="width: 20px; height: 20px;" alt="Cites">
                        <div class="inf-num">{{ props.info.cited_count }}</div>
                    </div>
                    <div class="trend">
                        <img style="width: 20px; height: 20px;" src="../../assets/icon-trend.png" alt="Clicks">
                        <div class="tr-num">{{ props.info.type_num }}</div>
                    </div>
                </div>
                <div class="choice">
                    <div class="introduce" v-if="props.info.pdf_url">
                        <img style="width: 25px; height: 25px;" src="../../assets/PDF.png" alt="Clicks">
                    </div>
                    <div class="introduce" v-if="props.info.landing_page_url">
                        <img style="width: 25px; height: 25px;" src="../../assets/view.png" alt="Clicks">
                    </div>
                    <div class="introduce">
                        <stardialog :token="props.token" :paper_id="paper_id" :type="type" :is_star="props.info.is_star">
                        </stardialog>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { Edit, DocumentAdd, StarFilled, Link, Document } from "@element-plus/icons-vue";
import { defineProps } from 'vue';
import { reactive, ref, onMounted, onUnmounted, onBeforeMount } from "vue";
import axios from "axios";
import stardialog from "./stardialog.vue";
import { useStore } from "vuex";
const Store = useStore();
onMounted(() => {
    paper_id.value = props.info.id;
});
//用于收藏
const paper_id = ref("2106749358");
const type = ref(0);

//用于链接的分享
function gotolink() {
    window.open(props.info.landing_page_url);
}
//用于pdf
function gotopdf() {
    window.open(props.info.pdf_url);
}
const props = defineProps({
    info: Object,
    token: String,
})
</script>
<style scoped>
.main {
    display: flex;
}

.left {
    display: flex;
    /* width: 30%; */

    .timer {
        width: 50%;
        margin: 15px;

        .state {
            font-size: 14px;
            font-weight: 900;
        }

        .time {
            font-size: 14px;
            color: gray;
        }
    }

    .pic {
        position: relative;
        margin: 15px;
        width: 30px;
        height: 30px;

    }
}

.right {
    margin: 15px;
    position: relative;
    left: 10%;
    height: 100%;

    /* width: 95%; */
    .title {
        font-size: 18px;
        width: 87%;
        height: 72px;
        cursor: pointer;
        white-space: pre-wrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-family: Merriweather Sans, sans-serif;
        color: #0077c2;
        font-weight: 600;

        >>>em {
            font-weight: bold;
            background-color: rgb(254, 253, 196);

        }
    }

    .wri_list {
        margin-top: 15px;
        display: flex;

        .writer {
            display: flex;
            cursor: pointer;
            margin-right: 20px;
            font-weight: bold;

            .writer-pic {

                margin: 10px 5px 10px 0px;
                width: 30px;
                height: 30px;
                border-radius: 50%;
                /* -webkit-filter: grayscale(100%);
            -moz-filter: grayscale(100%);
            -ms-filter: grayscale(100%);
            -o-filter: grayscale(100%);
            filter: grayscale(100%);
            filter: gray; */
            }

            .name {
                margin: 15px 0;
                color: #616374;
                font-family: Merriweather, serif;

                >>>em {
                    font-weight: bold;
                    background-color: rgb(254, 253, 196);

                }
            }

            .name:hover {
                text-decoration: underline;
            }
        }
    }

    .abstract {
        margin-top: 15px;
        font-size: 16px;
        width: 87%;
        height: 65px;
        overflow: hidden;
        white-space: pre-wrap;
        text-overflow: ellipsis;
        font-family: Merriweather Sans, sans-serif;

        >>>em {
            font-weight: bold;
            background-color: rgb(254, 253, 196);

        }
    }

    .ab-text {
        font-family: Merriweather Sans, sans-serif;

    }

    .bottom {
        position: relative;
        left: 0px;
        bottom: 0px;
        margin: 15px 0;
        display: flex;
        width: 100%;

        .data {
            position: relative;
            left: 0px;
            display: flex;
            width: 24%;
            /* border-right: 1px solid #e6e6e6; */
            font-size: 18px;

            .inference {
                margin-top: 5px;
                margin-right: 10px;
                display: flex;
                color: #0077c2;
                font-size: 25px;

                .inf-num {
                    font-size: 15px;
                    margin-left: 5px;
                    font-weight: 600;
                    font-family: icomoon !important;
                }
            }

            .trend {
                margin-top: 5px;
                margin-right: 10px;
                display: flex;
                color: #974dff;
                font-size: 25px;

                .tr-num {
                    font-size: 15px;
                    margin-left: 5px;
                    font-weight: 600;
                }
            }
        }

        .choice {
            top: -5px;
            position: relative;
            left: 35%;
            display: flex;

            .introduce {
                background-color: rgb(231, 229, 229);
                margin: 5px;
                margin-left: 5px;
                font-size: 25px;
                color: gray;
                border-radius: 2px;
                height: 30px;
                width: 30px;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
            }

            .introduce:hover {
                background-color: #d7d7d7;
            }
        }
    }
}

.link {
    color: rgb(83, 139, 199);
    text-decoration: none;
}

.link:hover {
    text-decoration: underline;
}
</style>