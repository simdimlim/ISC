<template>
  <div class="home">
    <navbar />

      <div class="columns">
      <!-- make sidebar hide pls on window smaller -->
        <div class="column"><sidebar style="margin-left:25px;margin-top:50px"/></div>
        <div class="column is-10">

    <section class="section" style="padding-top:20px;padding-left:0;padding-bottom:15px">

      <div class="container" style="padding-top:100px;width:auto;padding-right:268px" v-if="currentUser.name == ''">
        <three-dots></three-dots>
      </div>
      <div class="container" style="width:auto;" v-if="currentUser.name != ''">
        <div class="select is-pulled-right" style="z-index: 3;">
           <select v-on:change="sortBy" v-model="sort">
            <option>Last added</option>
            <option>First added</option>
            <option>Price low to high</option>
            <option>Price high to low</option>
           </select>
        </div>
        <p class="is-pulled-right" style="padding-right: 1%; padding-top: 0.5%;">Sort by: </p>
        <h1 class="title" style="color:#3a3a3a;font-weight:200; text-align:left">
          Hello <strong style="font-weight:600">{{currentUser.name}}</strong>
        </h1>
        <p class="subtitle" style="text-align:left">Welcome to ISC!</p>
      </div>
    </section>
    <section class="section" style="padding-left:0;padding-top:0;height:700px" v-if="currentUser.name != ''">
      <div class="columns">
        <div v-for="image in currentUser.items" v-model="currentUser.items" class="column is-3">
          <itemcard :title="image.title" :price="image.price" :img="image.img" :timestamp="image.timestamp" :link="image.link" :favourite="image.favourite" :itemId="image.key"></itemcard>
        </div>
      </div>
    </section>
  </div>
</div>
</div>
</template>

<script>
import navbar from './ui/Navbar'
import sidebar from './ui/Sidebar'
import itemcard from './ui/ItemCard'
import firebase from 'firebase'
import ThreeDots from 'vue-loading-spinner/src/components/ThreeDots'

export default {
  name: 'home',
  components: {
      navbar,
      itemcard,
      sidebar,
      ThreeDots
  },
  data: function() {
    return {
      currentUser: {
          name: '',
          photo: '',
          items: [],
      },
      myvar: '',
      sort: 'Last added'
    }
  },
  created: function() {
    var userId = firebase.auth().currentUser.uid;
    var db = firebase.database();
    db.ref('/users/' + userId).once('value').then((snapshot) => {
      var username = (snapshot.val() && snapshot.val().fname) || '';
      this.currentUser.name = username;
    });
    var ref = db.ref('/users/' + userId + '/items').once("value", (snapshot) => {
      snapshot.forEach((child) => {
        var key = child.key;
        var value = child.val();
        value.key = key;
        console.log(value)
        this.currentUser.items.unshift(value);
      });
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
  },
  methods: {
    sortBy: function () {
      console.log('hey')
      if (this.sort == 'First added') this.currentUser.items.reverse();
      if (this.sort == 'Last added') this.currentUser.items.reverse();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
