<template>
  <div class="add">

    <navbar/>

    <section class="section" style="padding-top:20px;">
      <div class="container main-container">

        <div class="container" v-if="item.images.length == 0">
          <p class="loader-text">Collecting details from link...</p><br>
          <three-dots></three-dots>
        </div>

        <div class="container" v-if="item.images.length != 0" style="padding-left:100px;padding-right:100px">
          <h1 class="title">
            <strong>Add Details</strong>
          </h1>
          <div class="columns">
            <div class="column is-4" style="height:400px;overflow-y:auto">
              <ul id="example-1">
                <li v-for="image in item.images">
                  <img :src="image" width="300">
                </li>
              </ul>
            </div>
            <div class="column is-7" style="text-align:left">
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
                    </select>
                  </div>
                </div>
              </div>
              <div class="field" style="padding-top:27px">
                <input class="button" type="submit" v-on:click="addItem" value="Save">
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import navbar from './ui/Navbar'
import sidebar from './ui/Sidebar'
import axios from 'axios'
import ThreeDots from 'vue-loading-spinner/src/components/ThreeDots'
import firebase from 'firebase'

export default {
  name: 'add',
  components: {
      navbar,
      ThreeDots
  },
  data () {
    return {
      currentUser: {
          name: 'Temp',
      },
      item: {
        images: [],
        title: '',
        price: 0,
        category: '',
      },
      link: this.$route.query.url,
      showLoader: true,
    }
  },
  mounted: function() {
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
  methods: {
    addItem: function() {
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
      var currTime = dd + '/' + mm + '/' + yyyy;
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
      this.$router.replace('home');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main-container {
}
.field {
  padding-top: 15px;
  padding-left: 30px;
}
.loading {
  border:none;
}
.loader-text {
  color: #00d3d1;
  padding-top: 30px;
  padding-bottom: 15px;
  font-weight: bold;
}
.link-form {
    margin-left: 200px;
    margin-right: 200px;
}
</style>
