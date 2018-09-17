<template>
  <div class="home">
    <div class="overlay" :class="getTheme()"></div>
    <div class="content">

      <div class="content-between mb-1">
        <div class="title">Quick links</div>
        <div class="btn blue" @click="openModal(modalOptions.selectedLink, 'add')" v-if="editState">
          Add
        </div>
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
            <div class="btn" @click="openModal(link, 'edit')" v-if="editState">
              <i class="fas fa-edit"></i>
            </div>
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

import { mapState, mapMutations, mapGetters } from 'vuex';
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
      editState: false,
    };
  },
  created() {
    this.getLinks();

    let setTheme = localStorage.getItem('theme');

    console.log(setTheme);
    if(setTheme) {
      this.config.theme = setTheme;
    }
    else {
      this.config.theme = 'default';
    }

    // for internal usecase. Will actually implement a token system
    if(this.$route.query.edit) this.editState = true;
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
    },
    getTheme () {
      return this.config.theme;
    }
  },
  computed: {
    ...mapGetters(['config']),
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

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  &.theme-default {
    background: #f5f7f9;
  }
  &.theme-blue {
    background:#0099FF;
  }

  &.theme-green {
    background:#66bb6a;
  }

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
    padding: 12px;
  }
}
</style>