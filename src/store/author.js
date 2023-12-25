import { createStore } from "vuex";
import { toRaw } from "vue";
const AuthorModule = {
    state: {
        authorId: -1,
        authorInformation: null,
        authorNetwork:null
    },
    mutations: {
       setAuthorId(state, num){
            state.authorId = num
       },
       setAuthorInformation(state, authorInformation){
            state.authorInformation = authorInformation
            state.authorId = authorInformation.id
       },
       setAuthorNetwork(state, network){
           state.authorNetwork = network
       }
    },
    actions: {},
    getters: {
        getAuthorState(state) {
            return state;
        },
    },
};
export default AuthorModule;