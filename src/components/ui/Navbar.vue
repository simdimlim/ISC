<template lang="html">
  <div>

  <nav class="nav has-shadow" style="z-index: 950;" >

    <div class="nav-left">
      <router-link style="padding-left:10px" class="nav-item is-brand" to="/"><b>ISC</b></router-link>
      <router-link class="nav-item is-tab" to="/">Dashboard</router-link>
    </div>

    <div class="nav-right">
      <span class="nav-item">
        <button  class="button add-item-btn" v-if="this.$route.path != '/new-item'" v-on:click="showAddItem = !showAddItem"><i class="fa fa-plus"></i>&nbspAdd Item</button>
      </span>
      <button class="button" style="margin-top:8px;margin-right:10px" v-on:click="logout">Logout</Button>

    </div>
  </nav>
  <transition name="slide-fade">
    <nav class="nav has-shadow" v-if="showAddItem" style="border-top: 1px solid #f5f5f5; height: 57px; padding-left:13px; z-index: 900;">

      <div class="nav-left">
        <div class="field search-bar-field" style="width: 93vw">
          <input class="input add-bar" placeholder="Paste link here." v-on:keyup.enter="addItem" v-model="link">
            <a class="button add-item-btn" v-on:click="addItem">Save</a>
        </div>
      </div>
    </nav>
  </transition>

        <div class="modal is-active" v-if="showModal" style="z-index: 1000;">
          <div class="modal-background"></div>
          <div class="modal-content">
            <div class="modal-card" style="border-radius: 8px">

              <section class="modal-card-body">
                <div class="container" v-if="item.images.length == 0" style="width:auto">
                  <p class="loader-text" style="color:#00d3d1">Collecting details from link...</p><br>
                  <three-dots></three-dots>
                </div>
                <div class="container" v-if="item.images.length != 0" style="padding-left:20px;padding-right:20px;width:auto">
                  <h1 class="title">
                    <strong>New Item</strong>
                  </h1>
                  <div class="columns">
                    <div class="column is-4" style="height:300px;overflow-y:auto">
                      <ul id="example-1">
                        <li v-for="image in item.images">
                          <img :src="image" width="300">
                        </li>
                      </ul>
                    </div>
                    <div class="column" style="text-align:left">
                      <div class="field">
                        <label class="label">Name</label>
                        <div class="control">
                          <input class="input" type="text" placeholder="" v-model="item.title">
                        </div>
                      </div>
                      <div class="field">
                        <label class="label">Price ($)</label>
                        <div class="control">
                          <input class="input" type="number" v-model="item.price">
                        </div>
                      </div>
                      <div class="field">
                        <label class="label">Category</label>
                        <div class="control">
                          <div class="select">
                            <select v-model="item.category">
                              <option disabled value="">Select a category</option>
                              <option>Fashion</option>
                              <option>Technology</option>
                              <option>Other</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <footer class="modal-card-foot"  v-if="item.images.length != 0" style="justify-content:flex-end">
                <button class="button is-success" style="background-color:#00d3d1" v-on:click="saveItem">Save</button>
                <button class="button" v-on:click="closeModal">Cancel</button>
              </footer>
            </div>

          </div>
          <button class="modal-close is-large" aria-label="close" v-on:click="closeModal"></button>
        </div>

  </div>
</template>

<script>
import firebase from 'firebase'

import axios from 'axios'
import ThreeDots from 'vue-loading-spinner/src/components/ThreeDots'

export default {
  name: 'navbar',
  components: {
      ThreeDots
  },
 methods: {
   logout: function() {
     firebase.auth().signOut().then(() => {
       this.$router.replace('login')
     })
   },
   addItem: function() {
     this.showAddItem = false;
//     this.$router.replace({path: 'new-item', query: { url: this.link }});
      this.showModal = true;
      axios.post(`http://localhost:3000/scrape`, {
        link: this.link
      })
      .then(response => {
        this.item.title = response.data.title;
        axios.post(`http://localhost:3000/filter`, {
          data: response.data.images_src,
          link: this.link
        }).then(response => {
          this.item.images = response.data.split(" ");
          this.item.images.slice(0,5)
        }).catch(e => {
          console.log(e)
        })
        this.showLoader = false;
      })
      .catch(e => {
        console.log(e)
      })
   },
   saveItem: function() {
     let user = firebase.auth().currentUser;
     var database = firebase.database();
     let userId = user.uid
     var myRef = firebase.database().ref().push();
     var key = myRef.key;
     var today = new Date();
     var dd = today.getDate();
     var mm = today.getMonth() + 1;
     var yyyy = today.getFullYear();
     if(dd<10) dd = '0'+dd;
     if(mm<10) mm = '0'+mm;
     var currTime = mm + '/' + dd + '/' + yyyy;
     console.log(currTime);
     var newData = {
       title: this.item.title || '',
       img: this.item.images[0] || '',
       price: this.item.price || '',
       category: this.item.category || '',
       timestamp: currTime,
       link: this.link,
       favourite: false,
     }
     firebase.database().ref('users/' + userId + '/items/' + key).set(newData);
     this.showModal = false;
     this.link = '';
     this.showAddItem = false;
   },
   closeModal: function () {
     this.showModal = false;
     this.link = '';
     this.item.images = [];
     this.item.title = '';
     this.item.price = 0;
     this.item.category = '';
   }
 },
 data () {
   return {
     showAddItem: false,
     link: '',
     showModal: false,
     item: {
       images: [],
       title: '',
       price: 0,
       category: '',
     },
     showLoader: true,
   }
 }
}
</script>

<style scoped>
b {
    color: #00d1d3 !important;
    padding-left:10px;
}

.search-bar-field {
  padding-top: 10px;
  padding-left: 10px;
}

.search-bar {
    width: 30vw;
}

.add-bar {
    width: 100%;
}

.add-item-btn {
  margin-right: 0px;
  background-color: #00d3d1;
  color: white;
  border: none;
}

.logout-btn {
    margin-right: 10px
}

.slide-fade-enter-active {
  transition: all .3s ease;
}

.slide-fade-leave-active {
  transition: all .3s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(-10px);
  opacity: 0;
}

.input.is-active, .input:active, .input:focus, .textarea.is-active, .textarea:active, .textarea:focus {
  border: #00d3d1 1px solid;
}

.nav-item a.is-tab:hover, a.nav-item.is-tab:hover {
  border-bottom: 1px solid #00d3d1;
}
</style>
