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
    out: true,
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
    settype(state,data){
      state.searchType = toRaw(data);
    },
    setGeneralSearch(state, data) {
      state.isAdvancedSearch = false;
      state.searchType = toRaw(data.searchType);
      state.and_list = [{ content: data.keyword, select: "", clear: 1 }];
      state.or_list = [];
      state.not_list = [];
      state.start_time = ""; //不知道是不是这样的0
      state.end_time = "";
    },
    clearSearch(state) {
      state.isAdvancedSearch = false;
      state.searchType = "";
      state.and_list = [];
      state.or_list = [];
      state.not_list = [];
      state.start_time = "";
      state.end_time = "";
    },
    setOutCondition(state, raw){
      state.out = raw;
    }
  },
  actions: {},
  getters: {
    getSearch(state) {
      return state;
    },
    getOutConditon(state){
      return state.out;
    }
  },
};
export default SearchModule;
