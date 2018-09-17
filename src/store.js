import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

const API = "http://localhost:3000";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    links: [],
    themes: [
      { key: "theme-default", name: "Default" },
      { key: "theme-green", name: "Green" },
      { key: "theme-blue", name: "Blue" }
    ],
    config: {
      theme: "theme-default"
    }
  },
  getters: {
    listLength: state => {
      return state.links.length;
    },
    themes: state => {
      return state.themes;
    },

    config: state => {
      return state.config;
    }
  },
  mutations: {
    getLinks(state) {
      axios.get(`${API}/api/links/get`).then(result => {
        state.links = result.data;
      });
    },
    addLink(state, link) {
      axios.post(`${API}/api/links/add`, { link: link })
      .then(result => {
        state.links.push(link);
      });
    },
    updateLink(state, link) {
      axios.post(`${API}/api/links/update`, { link: link })
      .then(result => {
        console.log(result);
      });
    },
    deleteLink(state, id) {
      axios.delete(`${API}/api/links/delete/${id}`)
      .then(result => {
        // state.links.splice(index, 1);
      });
    },
    mutateTheme(state, theme) {
      Vue.set(state.config, "theme", theme);
    }
  },
  actions: {
  }
});