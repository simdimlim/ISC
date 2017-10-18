<template>
  <div class="card" style="box-shadow:none !important;border-bottom:1px solid lightgray">
    <div class="card-image" style="height:300px;position:relative;width:100%;overflow:hidden" @mouseover="imgHover = true" @mouseout="imgHover = false">
      <a :href="link" target="_blank">
      <img :src="img" style="top:0;left:0;bottom:0;right:0;margin:auto;position:absolute;z-index:0;width:100%;">
    </a>
    </div>
    <div class="card-content" style="position:relative;background-color:white;height:150px;width:100%;overflow:hidden;padding:0">
      <div class="media" style="position:absolute;top:0;left:0;right:0;bottom:0;padding:1px;margin-top:15px;">
        <div class="content">
          <p class="title is-4" style="font-size:14px;font-weight:200;padding-bottom:15px">{{title}}</p>
          <p class="subtitle is-5" style="margin-bottom:10px;font-size:15px;font-weight:bold" v-show="price">${{parseFloat(price)}}</p>
          <div class="columns">
            <a :href="link" target="_blank" v-on:click="clickedVisit" class="button login-btn" style="width:105%;position:absolute;bottom:45px;font-size:14px;font-variant:all-small-caps">BUY AT {{host}}</a>
          </div>
          <div class="columns" style="position:absolute;width:103%;bottom:0px">
            <div class="column" style="margin-bottom:10px">
              <a class="button is-static is-outlined is-pulled-left is-small" style="border:none;color:#00d3d1" v-show="category" disabled>
                <span class="icon is-small" style="padding-top:3px">
                  <i class="fa fa-tag"></i>
                </span>
                <span style="text-transform: lowercase; font-size: 13px;">{{category}}</span>
              </a>
            </div>
            <div class="column is-6" style="padding:1px;position:absolute;right:4px;bottom:16px">
              <deleteModal v-show="showDeleteModal" @close="showDeleteModal = false" :itemId=itemId :userId=userId</deleteModal>
              <editModal v-show="showEditModal" @close="showEditModal = false" :itemId=itemId :userId=userId :title=title :price=price :category=category></editModal>
              <span class="button is-inverted is-dark is-pulled-right" style="border:none; background:none;"
                @click="showDeleteModal = true"
                @mouseover="hoverDel = true"
                @mouseout="hoverDel = false">
                <span class="icon tooltip">
                  <span class="tooltiptext" style="left:-24px">Delete</span>
                  <i class="fa fa-trash" v-if="!hoverDel"></i>
                  <i class="fa fa-trash has-text-grey" v-else></i>
                </span>
              </span>
              <span class="button is-inverted is-dark is-pulled-right" style="border:none; background:none;"
                @click="showEditModal = true"
                @mouseover="hoverEdit = true"
                @mouseout="hoverEdit = false">
                <span class="icon tooltip">
                  <span class="tooltiptext" style="left:-10px">Edit</span>
                  <i class="fa fa-pencil" v-if="!hoverEdit"></i>
                  <i class="fa fa-pencil has-text-grey" v-else></i>
                </span>
              </span>
              <span class="button is-pulled-right" style="border:none; background:none;"
                @click="clickedFavourite"
                @mouseover="hovering = true"
                @mouseout="hovering = false">
                <span class="icon tooltip">
                  <span class="tooltiptext" style="left: -49px;">Add to favourites</span>
                  <i class="fa fa-heart has-text-danger" v-if="favourite"></i>
                  <i class="fa fa-heart-o" v-else-if="!hovering"></i>
                  <i class="fa fa-heart has-text-danger" v-else></i>
                </span>
              </span>
              <span class="button is-pulled-right is-inverted is-dark" style="border:none; background:none;"
                @mouseover="hoverPur = true"
                @mouseout="hoverPur = false"
                @click="markPurchased">
                <span class="icon tooltip">
                  <span class="tooltiptext" style="left: -39.5px;">Add to fulfilled</span>
                  <i class="fa fa-times" v-if="hoverPur && purchased"></i>
                  <i class="fa fa-check has-text-success" v-else-if="purchased"></i>
                  <i class="fa fa-plus" v-else-if="!hoverPur"></i>
                  <i class="fa fa-check has-text-success" v-else></i>
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "bulma/bulma.sass"
import firebase from 'firebase'
import deleteModal from "../DeleteModal.vue"
import editModal from "../EditModal.vue"

export default {
  name: 'itemcard',
  props: ['title', 'price', 'img', 'timestamp', 'link', 'favourite', 'itemId', 'category', 'purchased', 'host'],
  components: {
     deleteModal,
     editModal
 },
  data () {
    return {
      hovering: false,
      showDeleteModal: false,
      showEditModal: false,
      userId: firebase.auth().currentUser.uid,
      hoverDel: false,
      hoverEdit: false,
      hoverPur: false,
      imgHover: false
    }
  },
  methods: {
    clickedVisit: function () {
      var newClicks;
      let userId = firebase.auth().currentUser.uid;
      var db = firebase.database();
      db.ref('users/' + userId + '/items/' + this.itemId + '/clicks').on("value", function(snapshot) {
        newClicks = snapshot.val() + 1;
      }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      });
      db.ref('users/' + userId + '/items/' + this.itemId + '/clicks').set(newClicks);
    },
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
   },
   openLink: function() {
     window.open(this.link,'_blank');
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

.tooltip {
    position: relative;
    display: inline-block;
    padding:1px;
    font-size:18px;
}

/* Tooltip text */
.tooltip .tooltiptext {
    visibility: hidden;
    width: 120px;
    background-color: black;
    color: #fff;
    text-align: center;
    padding: 5px 0;
    border-radius: 6px;
    bottom: 33px;
    font-size: 14px;
    width: auto;
    background-color: rgba(0, 0, 0, 0.78);
    padding-left: 10px;
    padding-right: 10px;
    /* Position the tooltip text - see examples below! */
    position: absolute;
    z-index: 1;
}

/* Show the tooltip text when you mouse over the tooltip container */
.tooltip:hover .tooltiptext {
    visibility: visible;
}
</style>

</style>
