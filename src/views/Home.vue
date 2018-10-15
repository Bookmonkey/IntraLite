<template>
  <div class="home">
    <div class="overlay" :class="theme"></div>
    <div class="content">

      <div class="content-between mb-1">
        <img :src="settings.logo_image"/>
        <div class="title"> {{ settings.title }}</div>
      </div>

      <div class="alert" v-if="links.length === 0">
        No links to show
      </div>
      <div class="link-container">
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


    
      <div class="private-links-title content-between" @click="collapsePrivateLinks()">
        Your private links.

        <i class="fa fa-fw" :class="{ 'fa-angle-up': showPrivateLinks, 'fa-angle-down': !showPrivateLinks }"></i>
      </div>
      <div class="link-container" v-if="showPrivateLinks">
        <div class="link" v-for="(link, index) in privateLinks" :key="index">
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

      <div class="content-around">
        <div class="btn blue" @click="openModal(modalOptions.selectedLink, 'add')">
          Add link
        </div>
      </div>
    </div>
    <modal :options="modalOptions" v-if="modalOptions.visible"></modal>


    <div class="footer">
      <div class="footer-links">
        <a href="/#/settings">Settings</a>
        <!-- <a href="/#/about">About</a> -->
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Modal from "@/components/Modal.vue";
import List from "@/components/List.vue";

import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';
export default {
  name: "home",
  components: {
    Modal,
    List
  },
  data() {
    return {
      // theme: 'theme-green',
      settings: {},
      linkTemplate: {
        id: 0,
        link_name: '',
        link: '',
        link_type: 'public',
        visible: false,
      },
      modalOptions: {
        selectedLink: {},
        visible: false,
        state: 'add',
      },

      privateLinks: [],
      showPrivateLinks: false,
    };
  },
  created() {
    this.getLinks();
    this.getPrivateLinks();
    this.getSettings()
    .then(settings => {
      this.settings = settings;
    });

    let setTheme = localStorage.getItem('theme');
    if(setTheme) {
      this.theme = setTheme;
    }
    else {
      this.theme = 'theme-green';
    }
  },
  methods: {
    ...mapMutations(['getLinks']),
    ...mapActions(['getSettings', "getTheme"]),
    openModal(link, state) {
      this.modalOptions.selectedLink = link;
      this.modalOptions.state  = state;
      if(state === 'add') {
        this.modalOptions.selectedLink = this.linkTemplate;
      }

      this.modalOptions.visible = true;
    },

    getPrivateLinks() {
      this.privateLinks = JSON.parse(localStorage.getItem('privateLinks'));
    },
    collapsePrivateLinks() {
      this.showPrivateLinks = !this.showPrivateLinks;
    }
  },
  computed: {
    ...mapState({
      links: state => state.links,
    })
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/global';

.home {
  display: flex;
  justify-content: space-around;
}

img {
  width: 128px;
  height: 128px;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  &.theme-sea-blue {
    // background: linear-gradient(90deg, #0099FF 0%, #6610f2 100%);
  }
}

.content {
  position: relative; 
  padding: 12px;
  width: 40vw; 
  margin-top:14px;
  background:#fff;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.2);
}

.link-container {
  max-height: 75vh;
  overflow-y: auto;
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
    padding: 0px;
  }
}

.private-links-title {
  margin: 0;
  padding: 8px 0;
  font-size: 1.2rem;
}
</style>
