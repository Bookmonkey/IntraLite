<template>
  <div class="settings">
    <div class="settings-nav">
      <div class="title">Quick links - settings</div>
      <ul>
        <li><a href="/#/">Home</a></li>
        <li><a href="/#/settings?abc">Settings</a></li>
      </ul>
    </div>
    <div class="settings-content">
      <div class="group">
        <label for="theme">Theme</label>
        <select v-model="selectedTheme">
          <option v-for="(item, key) in themes" :value="item.key" :key="key"> {{ item.name }}</option>
        </select> 
      </div>

      <div v-if="adminState">
        <hr>
        <div class="group">
          <label for="title">Title</label>
          <input type="text" v-model="settings.title"/>
        </div>
        <div class="group">

          <div>
            <label>Logo</label>
            <input type="file" name="file" id="file" class="inputfile" @change="processFile($event)" />
            <label for="file">
              <i class="fas fa-fw fa-upload"></i>
              Choose a file
            </label>
          </div>
          <img src="" class="img-preview" alt="">
        </div>
      </div>
      
      <div class="group">
        <div class="alert alert-green" v-if="savedChanges">Saved changes</div>
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
  data() {
    return {
      settings: {},
      selectedTheme: '',
      showPreview: false,
      adminState: false,
      savedChanges: false,
    }
  },
  methods: {
    ...mapActions([
      "getSettings",
      "updateSettings",
      "updateTheme"
    ]),
    saveChanges() {
      this.updateTheme(this.selectedTheme);
      this.updateSettings(this.settings);


      this.savedChanges = true;

      setTimeout(() => {
        this.savedChanges = false;
      }, 3000);
    },
    processFile(event) {
      let file = event.target.files[0];
      
      if(file) {
        const fileReader = new FileReader();

        fileReader.addEventListener('load', event => {
          this.setImagePreview(event.target.result);
          this.settings.logo_image = event.target.result;
        });

        fileReader.readAsDataURL(file);
      }
    },
    setImagePreview(base64String) {
      document.querySelector('.img-preview').src = base64String;
    }
  },
  created() {
    this.getSettings()
    .then(settings => {
      this.settings = settings;
      this.setImagePreview(this.settings.logo_image);
    });


    // for internal usecase. Will actually implement a token system
    if(this.$route.query.admin) this.adminState = true;
  },
  computed: {
    ...mapGetters(['themes']),
  }
}
</script>

<style lang="scss">
  @import '../assets/global';
  .settings {
    padding:0;
    margin:0;
    display:flex;
  }

  .settings-nav,
  .settings-content {
    padding: 12px;
  }

  .settings-nav {
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
  .settings-content {
    width: 90vw;
    background:#fff;
  }

  .img-preview {
    // border-radius: 50%;
    padding:12px;
    border:1px solid #ccc;
    margin-top:8px;
  }


.inputfile {
	width: 0.1px;
	height: 0.1px;
	opacity: 0;
	overflow: hidden;
	position: absolute;
	z-index: -1;
}

.inputfile + label {
  font-size: 1rem;
  font-weight: 700;
  color: #555;
  margin-left: 8px;
  border:1px solid $blue;
  padding: 8px 12px;
  display: inline-block;
}

</style>
