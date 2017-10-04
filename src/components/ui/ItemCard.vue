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
              
             <modal v-show="showModal" @close="showModal = false" itemId=itemId userId=></modal>
             
              <span class="button is-pulled-right is-dark is-outlined" style="border:none;" @click="showModal = true">
                 <span class="icon">
                    <i class="fa fa-trash"></i>
                 </span>
              </span>
              <a class="button is-pulled-right is-danger is-outlined" style="border:none;">
                  <span class="icon">
                     <i class="fa fa-heart-o"></i>
                  </span>
               </a>
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
      showModal: false
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

</style>
