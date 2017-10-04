<template>
   <div class="modal is-active" style="z-index: 1000">
    <div class="modal-background" @click="$emit('close')"></div>
       <div class="modal-card" style="width:30%;">
          
          <header class="modal-card-head">
            <p class="modal-card-title"></p>
            <button class="delete is-medium" @click="$emit('close')"></button>
          </header>
          
         <section class="modal-card-body" style="padding:40px;">
          <center>Are you sure you want to delete this item?</center>
         </section>
         
         <div class="field has-addons">
            <p class="control" style="width:50%;">
            <a class="button is-success" style="padding:30px; width:100%;" @click="deleteItem()"><b>YES</b></a>
         </p>
         <p class="control" style="width:50%;">
            <a class="button is-danger" style="padding:30px; width:101%;" @click="$emit('close')"><b>NO</b></a>
         </p>
         </div>
         
      </div>
    </div>
</div>

</template>

<script>
import "bulma/bulma.sass"
import firebase from 'firebase'

export default {
  name: 'modal',
  props: ['userId', 'itemId'],
  data () {
    return {
      
    }
  },
  methods: {
   //   going to have to archive these items in the future instead of actually removing from db
      deleteItem: function() {
         firebase.database().ref('users/' + this.userId + '/items/' + this.itemId).remove();
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
