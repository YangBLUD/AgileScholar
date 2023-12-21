import { createStore } from "vuex";
import UserModule from "./user";
import SearchModule from "./search";
import SearchResultModule from "./searchresult";
import createPersistedState from "vuex-persistedstate";
const store = createStore({
  modules: {
    User: UserModule,
    Search: SearchModule,
    SearchResult: SearchResultModule,
  },
});
export default store;
