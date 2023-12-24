import {createStore} from "vuex"
import ArticleModule from "./article.js";
import InstitutionModule from "./institution.js";
import UserModule from "./user";
import SearchModule from "./search";
import LlmModule from "./llm.js";
import SearchResultModule from "./searchresult";
import AuthorModule from "./author";
import createPersistedState from "vuex-persistedstate";
const store = createStore({
    modules:{
        Article: ArticleModule,
        Institution: InstitutionModule,
        User: UserModule,
    Search: SearchModule,
    LLM: LlmModule,
  },
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
      paths: ["User", "Search", "SearchResult", "LLM", "Author"],
      SearchResult: SearchResultModule,
      Author: AuthorModule,
    }),
  ],
});
export default store;
