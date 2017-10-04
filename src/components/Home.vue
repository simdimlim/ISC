<template>
  <div class="home">
    <navbar />

      <div class="columns">
      <!-- make sidebar hide pls on window smaller -->
        <div class="column"><sidebar style="margin-left:25px;margin-top:50px"/></div>
        <div class="column is-10">
    <section class="section" style="padding-top:20px">
      <div class="container" style="padding-top:100px;width:auto;padding-right:268px" v-if="currentUser.name == ''">
        <three-dots></three-dots>
      </div>
      <div class="container" style="width:auto;padding-right:268px" v-if="currentUser.name != ''">
        <h1 class="title" style="color:#3a3a3a;font-weight:200">
          Hello <strong style="font-weight:600">{{currentUser.name}}</strong>
        </h1>
        <p class="subtitle">Welcome to ISC!</p>
      </div>
    </section>
    <section class="section" style="padding-left:0;padding-top:0;height:700px">
      <div class="columns">
        <div v-for="image in currentUser.items" class="column is-3">
          <itemcard :title="image.title" :price="image.price" :img="image.img" :timestamp="image.timestamp"></itemcard>
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
      myvar: ''
    }
  },
  created: function() {
    var userId = firebase.auth().currentUser.uid;
    var db = firebase.database();
    db.ref('/users/' + userId).once('value').then((snapshot) => {
      var username = (snapshot.val() && snapshot.val().fname) || '';
      this.currentUser.name = username
    });
    var ref = db.ref('/users/' + userId + '/items').on("value", (snapshot) => {
      snapshot.forEach((child) => {
        var key = child.key;
        var value = child.val();
        this.currentUser.items.push(value);
      });
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
