import { createStore } from "vuex";
import { toRaw } from "vue";
const SearchModule = {
  state: {
    agg_text:"da",
    agg_raw:"",
  },
  mutations: {
    setaggtext(state,text){
        state.agg_text = text;
    },
    setaggraw(state,raw){
        state.agg_raw = raw;
    }
  },
  actions: {},
  getters: {
    getCluster(state) {
      return state;
    },
  },
};
export default SearchModule;