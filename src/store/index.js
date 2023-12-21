import {createStore} from "vuex"
import createPersistedState from 'vuex-persistedstate'
import AdminMoudle from "./Admin.js"

const store = createStore({
    modules: {
        Admin : AdminMoudle,
    },
    plugins: [
        createPersistedState({
            storage: window.sessionStorage,
            paths: ["Admin"],
        }),
    ],
});

export default store