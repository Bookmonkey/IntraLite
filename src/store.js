import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    links: []
  },
  getters: {
    listLength: state => {
      return state.links.length;
    }
  },
  mutations: {
    addLink(state, link) {
      state.links.push(link);
    },
    deleteLink(state, index) {
      state.links.splice(index, 1);
    }
  },
  actions: {}
});