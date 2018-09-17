<template>
  <div class="config">
    <div class="config-nav">
      <div class="title">Quick links - Config</div>
      <ul>
        <li><a href="/#/">Home</a></li>
        <li><a href="/#/config?abc">Settings</a></li>
      </ul>
    </div>
    <div class="config-content">
      <div class="group">
        <label for="theme">Theme</label>
        <select v-model="config.theme">
          <option v-for="(item, key) in themes" :value="item.key" :key="key"> {{ item.name }}</option>
        </select> 
      </div>

      <div class="group">
        <button class="btn green" @click="saveChanges()">Save</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  methods: {
    ...mapMutations(["mutateTheme"]),
    saveChanges() {
      this.mutateTheme(this.config.theme);

      localStorage.setItem('theme', this.config.theme);

      console.log(localStorage.getItem('theme'));
    }
  },
  created() {
    console.log(this.config);
  },
  computed: {
    ...mapGetters(['themes', 'config']),
  }
}
</script>

<style lang="scss">
  @import '../assets/global';
  .config {
    padding:0;
    margin:0;
    display:flex;
  }

  .config-nav,
  .config-content {
    padding: 12px;
  }

  .config-nav {
    $borderColour: rgba(120, 134, 156, 0.08);
    width: 25vw;
    height: 100vh;
    background:#f5f7f9;
    box-sizing: border-box;

    border-top:1px solid $borderColour;
    border-right:1px solid $borderColour;
    border-bottom:1px solid $borderColour;

    ul {
      list-style: none;
      padding: 0;
      margin: 8px 0;

      li {
        padding:12px;
        border-top:1px solid rgba(120, 134, 156, 0.2);
        border-left:1px solid rgba(120, 134, 156, 0.2);
        border-right:1px solid rgba(120, 134, 156, 0.2);
        transition: background 0.2s ease-in-out;
        a {
          display: block;
        }

        &:hover{
          background:rgba(120, 134, 156, 0.1);
        }

        &:last-child{
          border-bottom:1px solid rgba(120, 134, 156, 0.2);
        }
      }
    }
    
  }
  .config-content {
    width: 90vw;
    background:#fff;
  }
</style>
