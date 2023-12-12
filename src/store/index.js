import { createStore } from "vuex";
import UserModule from "./user";
import SearchModule from "./search";
import createPersistedState from "vuex-persistedstate";
const store = createStore({
  modules: {
    User: UserModule,
    Search: SearchModule,
  },
});
export default store;
