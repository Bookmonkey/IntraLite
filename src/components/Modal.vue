<template>
  <div class="modal">

    <div class="content">
      <div class="content-between">
        <h3>Edit link info</h3>

        <button class="close" @click="closeModal()">
          <i class="fas fa-fw fa-times"></i>
        </button>
      </div>
      
      <div class="group">
        <label for="name">Link title</label>
        <input type="text" v-model="options.selectedLink.link_name" />
      </div>

      <div class="group">
        <label for="link">Link</label>
        <input type="text" v-model="options.selectedLink.link" />
      </div>
  

      <div class="content-between">
        <button class="btn red" @click="deleteLink(options.selectedLink.id)">Delete</button>
        <button class="btn green" @click="saveLink()">Save</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';

export default {
  props: ['options'],
  data() {
    return {

    }
  },
  methods: {
    ...mapMutations(['addLink', 'updateLink', 'deleteLink']),
    closeModal() {
      this.options.visible = false;
      this.options.selectedLink = {};
    },

    saveLink() {
      this.options.selectedLink.id = this.listLength;
      if(this.options.state === 'edit') {
        this.updateLink(this.options.selectedLink);
      }

      else {
        this.addLink(this.options.selectedLink);
      }
    
      this.closeModal();
    }
  },

  computed: {
    ...mapGetters(['listLength']),
  }
}
</script>

<style lang="scss" scoped>
  @import "../assets/global";

  $closeButtonColour: rgba(0, 0, 0, 0.1);
  h3 { margin: 0; }

  .modal {
    position:absolute;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);

    .content {
      position: relative;
      margin: 0 auto;
      margin-top: 32px;
      background: #fff;
      width: 40vw;
      padding: 24px;
      box-shadow: 0px 0px 24px 0px rgba(0, 0, 0, 0.3);
    }
  }

  button.close {
    padding: 8px;
    font-size: 1rem;
    border:none;
    outline: none;
    border-radius: 50%;
    border:1px solid $closeButtonColour;
    transition: all 0.2s ease-in;

    &:hover { background: $closeButtonColour; }
  }


</style>
