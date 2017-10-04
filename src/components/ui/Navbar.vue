<template lang="html">
  <div>
  <nav class="nav has-shadow" style="z-index: 950;" >

    <div class="nav-left">
      <router-link style="padding-left:10px" class="nav-item is-brand" to="/"><b>ISC</b></router-link>
      <router-link class="nav-item is-tab" to="/">Dashboard</router-link>
    </div>

    <div class="nav-right">
      <span class="nav-item">
        <button  class="button add-item-btn" v-if="this.$route.path != '/new-item'" v-on:click="showAddItem = !showAddItem"><i class="fa fa-plus"></i>&nbspAdd Item</button>
      </span>
      <button class="button" style="margin-top:8px;margin-right:10px" v-on:click="logout">Logout</Button>

    </div>
  </nav>
  <transition name="slide-fade">
    <nav class="nav has-shadow" v-if="showAddItem" style="border-top: 1px solid #f5f5f5; height: 57px; padding-left:13px; z-index: 900;">

      <div class="nav-left">
        <div class="field search-bar-field" style="width: 93vw">
          <input class="input add-bar" placeholder="Paste link here." v-on:keyup.enter="addItem" v-model="link">
            <a class="button add-item-btn" v-on:click="addItem" >Save</a>
        </div>
      </div>
    </nav>
  </transition>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'navbar',
 created: function() {
   console.log(this.$route.path)
 },
 methods: {
   logout: function() {
     firebase.auth().signOut().then(() => {
       this.$router.replace('login')
     })
   },
   addItem: function() {
     this.$router.replace({path: 'new-item', query: { url: this.link }});
   }
 },
 data () {
   return {
     showAddItem: false,
     link: ''
   }
 }
}
</script>

<style scoped>
b {
    color: #00d1d3 !important;
    padding-left:10px;
}

.search-bar-field {
  padding-top: 10px;
  padding-left: 10px;
}

.search-bar {
    width: 30vw;
}

.add-bar {
    width: 100%;
}

.add-item-btn {
  margin-right: 0px;
  background-color: #00d3d1;
  color: white;
  border: none;
}

.logout-btn {
    margin-right: 10px
}

.slide-fade-enter-active {
  transition: all .3s ease;
}

.slide-fade-leave-active {
  transition: all .3s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(-10px);
  opacity: 0;
}

.input.is-active, .input:active, .input:focus, .textarea.is-active, .textarea:active, .textarea:focus {
  border: #00d3d1 1px solid;
}

.nav-item a.is-tab:hover, a.nav-item.is-tab:hover {
  border-bottom: 1px solid #00d3d1;
}
</style>
