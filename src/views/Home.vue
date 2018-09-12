<template>
  <div class="home">
    <div class="overlay"></div>
    <div class="content">

      <div class="content-between">
        <div class="title">Quick links</div>

        <span class="link-add" @click="openModal(modalOptions.selectedLink, 'add')">
          Add
        </span>
      </div>

      <div class="alert" v-if="links.length === 0">
        No links to show
      </div>
      <div class="link" v-for="(link, index) in links" :key="index">
        <div class="content-between">
          <a :href="link.link" target="_blank">
            {{ link.link_name }}
          </a>
          <div class="btn" @click="openModal(link, 'edit')">
            <i class="fas fa-edit"></i>
          </div>
        </div>
      </div> 

    </div>
    <modal :options="modalOptions" v-if="modalOptions.visible"></modal>


    <div class="footer">
      <div class="footer-links">
        <a href="/#/config">Settings</a>
        <a href="/#/about">About</a>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Modal from "@/components/Modal.vue";

import { mapState, mapMutations } from 'vuex';
export default {
  name: "home",
  components: {
    Modal
  },
  data() {
    return {
      linkTemplate: {
        id: 0,
        link_name: '',
        link: '',
        visible: false,
      },
      modalOptions: {
        selectedLink: {},
        visible: false,
        state: 'add',
      },
    };
  },
  created() {
    this.getLinks();
  },
  methods: {
    ...mapMutations(['getLinks']),
    openModal(link, state) {

      this.modalOptions.selectedLink = link;
      this.modalOptions.state  = state;
      if(state === 'add') {
        this.modalOptions.selectedLink = JSON.parse(JSON.stringify(this.linkTemplate));
      }

      this.modalOptions.visible = true;
    }
  },
  computed: mapState({
    links: state => state.links
  })
};
</script>

<style lang="scss" scoped>
@import '../assets/global';

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(90deg, #0099FF 0%, #6610f2 100%);
}

.content {
  position: relative; 
  padding: 12px;
  margin: 0 auto; 
  width: 40vw; 
  background:white;
  border-radius: 5px;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.2);
}

.link-add {
  background: $blue;
  color: white;
  width: 60px;
  text-align: center;
  padding: 6px;
  line-height: 1.4;
  cursor: pointer;
}

.footer {
  position: absolute;
  bottom:0;
  left: 0;
  border-top: 2px solid #aeaeae;
  background:#fff;
  width: 100vw;
  display:flex;
  justify-content: space-around;
}

.footer-links {
  padding: 8px;
  font-size: .9rem;

  a {
    padding: 12px;
  }
}
</style>