import { createStore } from "vuex";
import { toRaw } from "vue";
const UserModule = {
  state: {
    login_or_not: false,
    user_name: "",
    user_id: "",
    token: "",
    user_email: "",
    claimed_scholar_id: "",
    claimed_scholar_name: "",
  },
  mutations: {
    loginSuccess(state, user) {
      state.user_id = toRaw(user.user_id);
      state.login_or_not = true;
      state.user_name = toRaw(user.user_name);
      state.token = toRaw(user.token);
      state.user_email = toRaw(user.user_email);
      state.claimed_scholar_id = toRaw(user.claimed_scholar_id);
      state.claimed_scholar_name = toRaw(user.claimed_scholar_name);
    },
    logout(state) {
      state.user_id = "";
      state.login_or_not = false;
      state.user_name = "";
      state.token = "";
      state.user_email = "";
      state.claimed_scholar_id = "";
      state.claimed_scholar_name = "";
    },
    setlogin(state, login_or_not) {
      state.login_or_not = login_or_not;
    },
  },
  actions: {},
  getters: {
    getUserinfo(state) {
      return state;
    },
    getLoginState(state) {
      return state.login_or_not;
    },
  },
};
export default UserModule;
