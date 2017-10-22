<template>
  <div class="modal is-active" style="z-index: 1000">
    <div class="modal-background" @click="$emit('close')"></div>
    <div class="modal-card">

      <header class="modal-card-head">
        <p class="modal-card-title" style="padding-top:25px;margin-bottom:0px">
          <center>Edit item</center>
        </p>
        <button class="delete" aria-label="close" @click="$emit('close')"></button>
      </header>

      <section class="modal-card-body">
        <div class="field">
          <label class="label">Name</label>
          <div class="control"  style="text-align:right">
            <input class="input" type="text" maxlength="65" v-model=newTitle>
              <p style="font-size:11px;color:#7d7d7d;padding-top:2px;">{{wordsLeft}} characters remaining</p>
          </div>
        </div>

        <div class="field">
          <label class="label">Price ($)</label>
          <div class="control">
            <input class="input" type="number" v-model=newPrice>
          </div>
        </div>

        <div class="control">
          <label class="label">Category</label>
          <div class="select">
            <select v-model=newCategory>
              <option disabled value="">Select a category</option>
              <option>None</option>
              <option>Fashion</option>
              <option>Motors</option>
              <option>Home & Garden</option>
              <option>Electronics</option>
              <option>Sports</option>
              <option>Health & Beauty</option>
              <option>Toys & Media</option>
              <option>Collectables</option>
              <option>Other</option>
            </select>
          </div>
        </div>
      </section>

      <footer class="modal-card-foot" style="justify-content:flex-end">
        <button class="button is-success" @click="updateItem()" style="background-color:#00d3d1">Save changes</button>
        <button class="button" @click="$emit('close')">Cancel</button>
      </footer>

    </div>
  </div>
</template>

<script>
import "bulma/bulma.sass"
import firebase from 'firebase'
import { EventBus } from '../main.js';

export default {
  name: 'editModal',
  props: ['userId', 'itemId', 'title', 'price', 'category'],
  data () {
    return {
      newTitle: '',
      newPrice: '',
      newCategory: ''
   }
  },
  methods: {
    updateItem: function () {
      firebase.database().ref('users/' + this.userId + '/items/' + this.itemId + '/title').set(this.newTitle);
      firebase.database().ref('users/' + this.userId + '/items/' + this.itemId + '/price').set(this.newPrice);
      firebase.database().ref('users/' + this.userId + '/items/' + this.itemId + '/category').set(this.newCategory);
      this.$emit('close');
   }
  },
  computed: {
    wordsLeft: function () {
      return 65 - this.newTitle.length;
   }
},
created: function() {
   // when edit button is clicked, set the appropriate variables
   EventBus.$on('updateDetails', () => {
      this.newTitle = this.title; 
      this.newPrice = this.price;
      this.newCategory = this.category;
   });
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.modal-card-head {
    padding-top: 5px;
    padding-left: 20px;
    padding-bottom: 0;
    padding-right: 20px;
    background: white;
    border: none;
}
.delete:after, .delete:before {
    margin-left: 0;
    margin-top: 0;
}
</style>
