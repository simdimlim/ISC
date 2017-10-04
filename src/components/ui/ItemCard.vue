<template>
   <div class="card">
      <div class="card-image">
         <img :src="img" alt="Placeholder image">
      </div>
      <div class="card-content">
         <div class="media">
            <div class="content">
               <p class="title is-4" style="font-size:19px;padding-bottom:7px">{{title}}</p>
               <p class="subtitle is-5" style="margin-bottom:10px">${{price}}</p>
               <a :href="link" style="color: #00d3d1">Visit site</a>
               <br>
               <p>Added {{timestamp}}</p>
               <a class="button is-primary is-outlined" style="border:none;">
                <span class="icon is-small">
                  <i class="fa fa-tag"></i>
                </span>
                <span style="text-transform: lowercase;">{{category}}</span>
              </a>
              <a class="button is-pulled-right is-dark is-outlined" style="border:none;">
                 <span class="icon">
                    <i class="fa fa-trash"></i>
                 </span>
              </a>
              <a class="button is-pulled-right" style="border:none;">
                 <span class="icon has-text-danger">
                    <i class="fa fa-heart-o" v-on:mouseover="hovering = !hovering"></i>
                    <i class="fa fa-heart" v-if="hovering"></i>
                 </span>
              </a>
            </div>
         </div>
   </div>
 </div>
</template>

<script>
import "bulma/bulma.sass"
import firebase from 'firebase'

export default {
  name: 'itemcard',
  props: ['title', 'price', 'img', 'timestamp', 'link', 'favourite', 'itemId', 'category'],
  data () {
    return {
      hovering: false
    }
  },
  methods: {
    clickedFavourite: function() {
      var newFavourite = !this.favourite;
      this.favourite = !this.favourite;
      let userId = firebase.auth().currentUser.uid;
      firebase.database().ref('users/' + userId + '/items/' + this.itemId + '/favourite').set(newFavourite);
    }
  }
}
</script>

<style scoped>
</style>
