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
               <a :href="link" target="_blank" style="color: #00d3d1">Visit site</a>
               <br>
               <p>Added {{timestamp}}</p>
               <a class="button is-primary is-outlined" style="border:none;" v-show="category">
                <span class="icon is-small">
                  <i class="fa fa-tag"></i>
                </span>
                <span style="text-transform: lowercase;">{{category}}</span>
              </a>

             <modal v-show="showModal" @close="showModal = false" :itemId=itemId :userId=userId></modal>

              <span class="button is-pulled-right is-inverted is-dark" style="border:none; background:none;" 
              @click="showModal = true"
              @mouseover="hoverDel = true"
              @mouseout="hoverDel = false">
                 <span class="icon">
                    <i class="fa fa-trash" v-if="!hoverDel"></i>
                    <i class="fa fa-trash has-text-grey" v-else></i>
                 </span>
              </span>
              <a class="button is-pulled-right" style="border:none;" 
              @click="clickedFavourite"
              @mouseover="hovering = true" 
              @mouseout="hovering = false">
                  <span class="icon">
                     <i class="fa fa-heart has-text-danger" v-if="favourite"></i>
                     <i class="fa fa-heart-o" v-else-if="!hovering"></i>
                     <i class="fa fa-heart-o has-text-danger" v-else></i>
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
import modal from "../DeleteModal.vue"

export default {
  name: 'itemcard',
  props: ['title', 'price', 'img', 'timestamp', 'link', 'favourite', 'itemId', 'category'],
  components: {
     modal
 },
  data () {
    return {
      hovering: false,
      showModal: false,
      userId: firebase.auth().currentUser.uid,
      hoverDel: false
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
.button.is-primary.is-outlined:hover, .button.is-primary.is-outlined:focus {
   background-color: #00d3d1;
   color: #fff;
}

.button.is-primary.is-outlined {
   color: #00d3d1;
}

.content a:not(.button):hover {
    border-bottom-color: #00d3d1;
}

.select:not(.is-multiple)::after {
    border: 1px solid #00d3d1;
}

</style>
