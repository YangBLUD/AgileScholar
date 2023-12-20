import { createStore } from "vuex";
import { toRaw } from "vue";
const SearchModule = {
  state: {
    isAdvancedSearch: false, // 是否是高级搜索
    searchType: "", // 搜索类型
    and_list: [], // 3个搜索的约束
    or_list: [],
    not_list: [],
    start_time: "", // 起始时间
    end_time: "", //截止时间
  },
  mutations: {
    SetAdvancedSearch(state, data) {
      state.and_list = data.and_list;
      state.or_list = data.or_list;
      state.not_list = data.not_list;
      state.start_time = data.start_time;
      state.end_time = data.end_time;
    },
    SetSearch(state, data) {
      state.and_list.push(data);
    },
    clearSearch() {
      state.and_list = [];
      state.or_list = [];
      state.not_list = [];
      state.start_time = "";
      state.end_time = "";
    },
  },
  actions: {},
  getters: {
    getSearch(state) {
      return state;
    },
  },
};
export default SearchModule;