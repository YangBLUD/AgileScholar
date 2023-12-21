import {createStore} from 'vuex'
import {reactive, toRaw} from "vue";
const InstitutionModule ={
    state: {
        currentInstitutionId: -1,
        Authors:[],
    },
    mutations: {
        initAuthors(state){
            state.Authors = []
        },
        changeCurrentInstitutionId(state, institutionId){
            state.currentArticleId = institutionId
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
export default InstitutionModule
