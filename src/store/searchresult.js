import { createStore } from "vuex";
import { toRaw } from "vue";
const SearchModule = {
  state: {
    cluster:"da"
  },
  mutations: {
    setCluster(state,cluster){
        state.cluster = cluster;
    }
  },
  actions: {},
  getters: {
    getCluster(state) {
      return state.cluster;
    },
  },
};
export default SearchModule;