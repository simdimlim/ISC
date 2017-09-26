<!-- Login.vue -->
<template>
   <span class="button">
      <div id="show-modal" @click="showModal = true" class="button">Login</div>
      <!-- use the modal component, pass in the prop -->
      <modal v-if="showModal" @close="showModal = false">
         <!--
         you can use custom content here to overwrite
         default content
      -->
         <h3 slot="header">custom header</h3>
      </modal>
   </span>
</template>

<script>
import modal from './LoginModal.vue'

export default {
   name: 'login',
   components: {
      modal
   },
   data () {
      return {
         showModal: false
      }
   }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login-btn {
    margin-right: 0px
}

.nav-item a.is-tab:hover, a.nav-item.is-tab:hover {
  border-bottom: 1px solid #00d3d1;
}

.button {
    background-color: #00d3d1;
    border: none;
    color: white;
    padding: 20px 42px;
    text-align: center;
    text-decoration: none;
    font-size: 20px;
}
</style>