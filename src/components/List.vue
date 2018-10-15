<template>
  <div class="list">
    <div class="link-container">
      <div class="link" v-for="(link, index) in items" :key="index">
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
  </div>
</template>

<script>
import Modal from "@/components/Modal.vue";
export default {
  props: ["items", "state"],
  components: {
    Modal
  },
  data() {
    return {
      modalOptions: {
        selectedLink: {},
        visible: false,
        state: 'add',
      },
    }
  },
  methods: {
    openModal(link, state) {
      this.modalOptions.selectedLink = link;
      this.modalOptions.state  = state;
      if(state === 'add') {
        this.modalOptions.selectedLink = JSON.parse(JSON.stringify(this.linkTemplate));
      }

      this.modalOptions.visible = true;
    },
  }
};
</script>

<style lang="scss">
@import "../assets/global";

// .link-container {
//   max-height: 75vh;
//   overflow-y: auto;
// }
</style>
