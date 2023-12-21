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
    setAdvancedSearch(state, data) {
      state.isAdvancedSearch = true;
      state.searchType = toRaw(data.searchType);
      state.and_list = toRaw(data.and_list);
      state.or_list = toRaw(data.or_list);
      state.not_list = toRaw(data.not_list);
      state.start_time = toRaw(data.start_time);
      state.end_time = toRaw(data.end_time);
    },
    setGeneralSearch(state, data) {
      state.isAdvancedSearch = false;
      state.searchType = toRaw(data.searchType);
      state.and_list = [{ content: data.keyword, select: "", clear: 1 }];
      state.or_list = [];
      state.not_list = [];
      state.start_time = "0"; //不知道是不是这样的0
      state.end_time = "0";
    },
    clearSearch() {
      state.isAdvancedSearch = false;
      state.searchType = "";
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
