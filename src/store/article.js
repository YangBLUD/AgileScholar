import {createStore} from 'vuex'
import {reactive, toRaw} from "vue";
const ArticleModule ={
    state: {
        currentArticleId: -1,
        Authors:[],  //数组，存储当前所有的组织
        currentAuthorId: -1,
    },
    mutations: {
        initAuthors(state){
            state.Authors = []
        },
        changeCurrentArticle(state, articleId){
            state.currentArticleId = articleId
        }

    },
    actions: {

    },
    getters: {
        get_currentAuthor(state){
            const authors = state.Authors
            for(let author of authors){
                if(author.id===state.currentAuthorId){
                    return author
                }
            }
        },
    }
}
export default ArticleModule
