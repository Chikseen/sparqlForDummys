import { createStore } from "vuex";

export default createStore({
  state: {
    currentItems: [],
    components: {},
    selectedElement: "",
  },
  getters: {},
  mutations: {
    setCurrentItems(state, payload) {
      state.currentItems = payload;
    },
    setComponents(state, payload) {
      state.components = payload;
    },
    setSelectedElement(state, payload) {
      state.selectedElement = payload;
    },
  },
  actions: {},
  modules: {},
});
