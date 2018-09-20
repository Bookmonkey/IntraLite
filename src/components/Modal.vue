<template>
  <transition name="modal-fade">
    <div class="modal">

      <div class="content">
        <div class="content-between">
          <h3>
            <span v-if="options.state === 'edit'">Edit link info</span>
            <span v-if="options.state === 'add'">Add link</span>
          </h3>

          <button class="btn default round" @click="closeModal()">
            <i class="fas fa-fw fa-times"></i>
          </button>
        </div>
        
        <div class="group">
          <label for="name">Link title</label>
          <input type="text" v-model="options.selectedLink.link_name" autofocus />
        </div>

        <div class="group">
          <label for="link">Link</label>
          <input type="url" v-model="options.selectedLink.link" />
        </div>
    

        <div class="content-between">
          <div>

            <button class="btn red"  v-if="options.state === 'edit'" @click="promptDelete(options.selectedLink.id)">Delete</button>
          </div>
          <button class="btn green" @click="saveLink()">Save</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  props: ['options'],
  data() {
    return {
    }
  },
  created() {
    document.addEventListener('keydown', event => {
      if(event.keyCode === 27) {
        this.closeModal();
      }
    })
  },
  beforeDestroy() {
    document.removeEventListener('keydown');
  },
  methods: {
    ...mapMutations(['addLink', 'updateLink']),
    ...mapActions(['deleteLink']),
    closeModal() {
      this.options.visible = false;
      this.options.selectedLink = {};
    },

    promptDelete(id) {
      this.deleteLink(id)
      .then(response => {
        this.options.visible = false;
        this.options.selectedLink = {};
      });
    },

    saveLink() {
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
  // * Enter and leave animations can use different */
/* durations and timing functions.              */
.modal-fade-enter-active, .modal-fade-leave-active {
  transition: all .3s cubic-bezier(0.86, 0, 0.07, 1);
}
.modal-fade-enter, .modal-fade-leave-to {
  opacity: 0;
}

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
      width: 30vw;
      padding: 24px;
      box-shadow: 0px 0px 24px 0px rgba(0, 0, 0, 0.3);
    }
  }

</style>
