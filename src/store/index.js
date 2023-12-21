import {createStore} from "vuex"
import ArticleModule from "./article.js";
import InstitutionModule from "./institution.js";
const store = createStore({
    modules:{
        Article: ArticleModule,
        Institution: InstitutionModule,
    }
})
export default store
