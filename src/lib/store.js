import { createStore } from 'vuex';

const state = {
  currentUser: null,
};

const getters = {
  isLoggedIn(state) {
    return state.currentUser !== null;
  },
};

const mutations = {
  setCurrentUser(state, user) {
    state.currentUser = user;
  },
};

const actions = {};

const store = createStore({
  state,
  getters,
  mutations,
  actions,
});

export default store;
