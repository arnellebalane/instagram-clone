import { createStore } from 'vuex';

const state = {
  currentUser: null,
  currentUserLikes: {},
  error: null,
};

const getters = {
  isLoggedIn(state) {
    return state.currentUser !== null;
  },

  hasError(state) {
    return state.error !== null;
  },
};

const mutations = {
  setCurrentUser(state, user) {
    state.currentUser = user;
  },

  setCurrentUserLikes(state, likes) {
    state.currentUserLikes = likes.reduce((obj, like) => {
      obj[like.id] = true;
      return obj;
    }, {});
  },

  setError(state, message) {
    state.error = message;
  },

  clearError(state) {
    state.error = null;
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
