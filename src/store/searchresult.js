import { createStore } from "vuex";
import { toRaw } from "vue";
const SearchModule = {
  state: {
    agg_text:"da",
    agg_raw:"",
  },
  mutations: {
    setCluster(state,text,raw){
        state.agg_text = text;
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