import { createStore } from "vuex";
import { toRaw } from "vue";
const LlmModule = {
    state: {
        chatList: [],
    },
    mutations: {
        addSentence(state, sentence) {
           state.chatList.push(toRaw(sentence))
        },
        resetList(state){
            state.chatList = []
        }
    },
    actions: {},
    getters: {
        getList(state) {
            return state.chatList;
        },
    },
};
export default LlmModule;
