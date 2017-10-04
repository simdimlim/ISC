<template>
   <div class="card">
   <div class="card-image">
       <img :src="img" alt="Placeholder image">
   </div>
   <div class="card-content">
      <a class="button is-pulled-right is-dark is-outlined" style="border:none;">
         <span class="icon">
            <i class="fa fa-trash"></i>
          </span>
  </a>
     <div class="media">
       <div class="content">
         <p class="title is-4">{{title}}</p>
         <p class="subtitle is-5">${{price}}</p>
         <a>Visit site</a>
         <br>
         <p>Added {{timestamp}}</p>
         <font size="2">
            <a><span class="icon is-small">
           <i class="fa fa-lg fa-tag"></i>
        </span> <span>fashion</span></a>
     </font>
       </div>
     </div>
   </div>
 </div>
</template>

<script>
import "bulma/bulma.sass"

export default {
  name: 'itemcard',
  props: ['title', 'price', 'img', 'timestamp'],
  data () {
    return {

    }
  }
}
</script>

<style scoped>
</style>
