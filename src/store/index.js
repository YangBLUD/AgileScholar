import { createStore } from "vuex";
import UserModule from "./user";
import SearchModule from "./search";
import LlmModule from './llm.js'
import createPersistedState from "vuex-persistedstate";
const store = createStore({
  modules: {
    User: UserModule,
    Search: SearchModule,
    LLM: LlmModule,
  },
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
      paths: ["User", "Search", "SearchResult", "LLM"],
    }),
  ],
});
export default store;
