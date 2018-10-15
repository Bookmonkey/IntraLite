import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

const API = require("../config").API;

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    links: [],
    themes: [
      { key: "theme-default", name: "Default" },
      { key: "theme-green", name: "Green" },
      { key: "theme-blue", name: "Blue" },
      { key: "theme-yellow", name: "Yellow" },
      { key: "theme-purple", name: "Purple" },
      { key: "theme-orange", name: "Orange" }
    ],
    theme: "theme-default",
    settings: {}
  },
  getters: {
    listLength: state => {
      return state.links.length;
    },
    themes: state => {
      return state.themes;
    },

  },
  mutations: {
    getLinks(state) {
      console.log(`${API}/api/links/get`)
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
    deleteLinkFromState(state, id) {
      state.links = state.links.filter(ele => ele.id != id);
      return axios.get(`${API}/api/links/delete/${id}`)
      .then(result => {
        return true;  
      });
    },
    setTheme(state, theme) {
      state.theme = theme;
    },
    updateSettings(state, settings) {
      Vue.set(state.settings, 'logo_image', settings.logo_image);
      Vue.set(state.settings, 'title', settings.title);
    },
  },
  actions: {
    getSettings(context) {
      return axios.get(`${API}/api/settings/get`)
      .then(response => {
        context.commit("updateSettings", response.data[0]);
        return response.data[0];
      });
    },
    updateSettings(context, settings) {
      context.commit("updateSettings", settings);
      return axios.post(`${API}/api/settings/update`, { settings })
      .then(response => response.data[0]);
    },
    
    getTheme(context) {
      let theme = localStorage.getItem("theme");
      context.commit("setTheme", theme);
    },
    updateTheme(context, theme) {
      localStorage.setItem("theme", theme);
      context.commit("setTheme", theme);
    },
    deleteLink(context, id) {
      return axios.get(`${API}/api/links/delete/${id}`)
      .then(result => {
        context.commit("deleteLinkFromState", id);
        return true;
      });
    }
  }
});