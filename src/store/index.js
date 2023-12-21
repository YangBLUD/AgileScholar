import {createStore} from "vuex"
import ArticleModule from "./article.js";
import InstitutionModule from "./institution.js";
import UserModule from "./user";
import SearchModule from "./search";
import createPersistedState from "vuex-persistedstate";
const store = createStore({
    modules:{
        Article: ArticleModule,
        Institution: InstitutionModule,
        User: UserModule,
    Search: SearchModule,
    }
})
export default store
