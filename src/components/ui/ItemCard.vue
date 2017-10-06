<template>
   <div class="card" style="">
      <div class="card-image" style="height:300px;position:relative;width:100%;overflow:hidden">
         <img :src="img" style="top:0;left:0;bottom:0;right:0;margin:auto;position:absolute;z-index:0;width:100%">
      </div>
      <div class="card-content" style="position:relative;background-color:white">
         <div class="media">
            <div class="content">
               <p class="title is-4" style="font-size:19px;padding-bottom:7px">{{title}}</p>
               <p class="subtitle is-5" style="margin-bottom:10px" v-show="price">${{price}}</p>
               <a :href="link" target="_blank" style="color: #00d3d1">Visit site</a>
               <div style="padding-top:5px;padding-bottom:10px;">Added {{timestamp}}</div>
               <a class="button is-primary is-outlined is-pulled-left is-small" style="border:none;" v-show="category">
                <span class="icon is-small">
                  <i class="fa fa-tag"></i>
                </span>
                <span style="text-transform: lowercase; font-size: 15px;">{{category}}</span>
              </a>

             <modal v-show="showModal" @close="showModal = false" :itemId=itemId :userId=userId></modal>
             
             <div style="padding-top:24px;" v-show="category"></div>
              <span class="button is-inverted is-dark is-pulled-right" style="border:none; background:none;"
              @click="showModal = true"
              @mouseover="hoverDel = true"
              @mouseout="hoverDel = false">
                 <span class="icon">
                    <i class="fa fa-trash" v-if="!hoverDel"></i>
                    <i class="fa fa-trash has-text-grey" v-else></i>
                 </span>
              </span>
              <span class="button is-pulled-right" style="border:none; background:none;"
              @click="clickedFavourite"
              @mouseover="hovering = true"
              @mouseout="hovering = false">
                  <span class="icon">
                     <i class="fa fa-heart has-text-danger" v-if="favourite"></i>
                     <i class="fa fa-heart-o" v-else-if="!hovering"></i>
                     <i class="fa fa-heart-o has-text-danger" v-else></i>
                  </span>

               </span>
               <span class="button is-pulled-right is-inverted is-dark" style="border:none; background:none;"
               @mouseover="hoverPur = true"
               @mouseout="hoverPur = false"
               @click="markPurchased">
                  <span class="icon">
                     <i class="fa fa-check has-text-grey" v-if="hoverPur && purchased"></i>
                     <i class="fa fa-check has-text-success" v-else-if="purchased"></i>
                     <i class="fa fa-plus" v-else-if="!hoverPur"></i>
                     <i class="fa fa-plus has-text-grey" v-else></i>
                  </span>
               </span>
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
  props: ['title', 'price', 'img', 'timestamp', 'link', 'favourite', 'itemId', 'category', 'purchased'],
  components: {
     modal
 },
  data () {
    return {
      hovering: false,
      showModal: false,
      userId: firebase.auth().currentUser.uid,
      hoverDel: false,
      hoverPur: false
    }
  },
  methods: {
    clickedFavourite: function() {
      var newFavourite = !this.favourite;
      this.favourite = !this.favourite;
      let userId = firebase.auth().currentUser.uid;
      firebase.database().ref('users/' + userId + '/items/' + this.itemId + '/favourite').set(newFavourite);
   },
   markPurchased: function() {
      var newPurchased = !this.purchased;
      this.purchased = !this.purchased;
      let userId = firebase.auth().currentUser.uid;
      firebase.database().ref('users/' + userId + '/items/' + this.itemId + '/purchased').set(newPurchased);
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

.button {
    -moz-appearance: none;
    -webkit-appearance: none;
    align-items: center;
    border: 1px solid transparent;
    border-radius: 3px;
    box-shadow: none;
    display: inline-flex;
    font-size: 1rem;
    /* height: 2.25em; */
    justify-content: flex-start;
    line-height: 1.5;
    padding-bottom: calc(0.375em - 1px);
    padding-left: calc(0.625em - 1px);
    padding-right: calc(0.625em - 1px);
    padding-top: calc(0.375em - 1px);
    position: relative;
    vertical-align: top;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-color: white;
    border-color: #dbdbdb;
    color: #363636;
    cursor: pointer;
    justify-content: center;
    /* padding-left: 0.75em; */
    /* padding-right: 0.75em; */
    text-align: center;
    white-space: nowrap;
}

</style>
