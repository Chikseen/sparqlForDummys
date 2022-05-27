import { createStore } from "vuex";

export default createStore({
  state: {
    currentItems: [],
  },
  getters: {},
  mutations: {
    setCurrentItems(state, payload) {
      state.currentItems = payload;
    },
  },
  actions: {},
  modules: {},
});
