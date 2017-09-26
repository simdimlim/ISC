<template>
  <div class="home">
    <navbar />
    <section class="section" style="padding-top:20px">
      <div class="container" style="padding-top:100px" v-if="currentUser.name == ''">
        <three-dots></three-dots>
      </div>
      <div class="container" v-if="currentUser.name != ''">
        <h1 class="title">
          Hello <strong>{{currentUser.name}}</strong>
        </h1>
        <p class="subtitle">Welcome to ISC!</p>
      </div>
    </section>
    <section class="section" style="padding-left:0;padding-top:0;height:700px">
    </section>
  </div>
</template>

<script>
import navbar from './ui/Navbar'
import sidebar from './ui/Sidebar'
import firebase from 'firebase'
import ThreeDots from 'vue-loading-spinner/src/components/ThreeDots'

export default {
  name: 'home',
  components: {
      navbar,
      sidebar,
      ThreeDots
  },
  data: function() {
    return {
      currentUser: {
          name: '',
          photo: '',
      },
      myvar: ''
    }
  },
  created: function() {
    var userId = firebase.auth().currentUser.uid;
    return firebase.database().ref('/users/' + userId).once('value').then((snapshot) => {
      var username = (snapshot.val() && snapshot.val().fname) || '';
      this.currentUser.name = username
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
