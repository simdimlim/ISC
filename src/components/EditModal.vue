<template>
  <div class="modal is-active" style="z-index: 1000">
    <div class="modal-background" @click="$emit('close')"></div>
    <div class="modal-card">

      <header class="modal-card-head">
        <p class="modal-card-title">
          <center>Edit item</center>
        </p>
        <button class="delete" aria-label="close" @click="$emit('close')"></button>
      </header>

      <section class="modal-card-body">
        <div class="field">
          <label class="label">Name</label>
          <div class="control">
            <input class="input" type="text" v-bind:placeholder=this.title v-model=item.title>
          </div>
        </div>

        <div class="field">
          <label class="label">Price ($)</label>
          <div class="control">
            <input class="input" type="number" v-bind:placeholder=this.price v-model=item.price>
          </div>
        </div>

        <div class="control">
          <label class="label">Category</label>
          <div class="select">
            <select v-model=item.category>
              <option disabled value="">Select a category</option>
              <option>Fashion</option>
              <option>Motors</option>
              <option>Home & Garden</option>
              <option>Electronics</option>
              <option>Sports</option>
              <option>Health, Beauty & Baby</option>
              <option>Toys & Media</option>
              <option>Collectables</option>
              <option>Other</option>
            </select>
          </div>
        </div>
      </section>

      <footer class="modal-card-foot">
        <button class="button is-success" @click="updateItem()">Save changes</button>
        <button class="button" @click="$emit('close')">Cancel</button>
      </footer>

    </div>
  </div>
</template>

<script>
import "bulma/bulma.sass"
import firebase from 'firebase'

export default {
  name: 'editModal',
  props: ['userId', 'itemId', 'title', 'price', 'category'],
  data () {
    return {
      item: {
        title: this.title,
        price: this.price,
        category: this.category,
      },
    }
  },
  methods: {
    updateItem: function () {
      console.log(this.item.title);
      console.log(this.item.price);
      console.log(this.item.category);
      // error checking
      if (this.item.title == '') {
        this.item.title = this.title;
      };
      if (this.item.price == '' || parseFloat(this.item.price) <= 0) {
        this.item.price = this.price;
      };
      if (this.item.category == '') {
        this.item.category = "Other";
      };
      firebase.database().ref('users/' + this.userId + '/items/' + this.itemId + '/title').set(this.item.title);
      firebase.database().ref('users/' + this.userId + '/items/' + this.itemId + '/price').set(this.item.price);
      firebase.database().ref('users/' + this.userId + '/items/' + this.itemId + '/category').set(this.item.category);
      this.$emit('close');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.modal-card-head {
    padding: 3px;
    background: white;
    border: none;
}
.delete:after, .delete:before {
    margin-left: 0;
    margin-top: 0;
}
</style>
