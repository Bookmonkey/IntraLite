import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

const API = "http://localhost:3000";
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
    getLinks(state) {
      axios.get(`${API}/api/links/get`).then(result => {
        state.links = result.data;
      });
    },
    addLink(state, link) {
      axios.post(`${API}/api/links/add`, { link: link })
      .then(result => {
        console.log(result);
        state.links.push(link);
      });
    },
    deleteLink(state, index) {
      state.links.splice(index, 1);
    }
  },
  actions: {}
});