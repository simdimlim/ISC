<template>
   <div class="card">
      <div class="card-image">
         <img :src="img" alt="Placeholder image">
      </div>
      <div class="card-content">
         <div class="media">
            <div class="content">
               <p class="title is-4">{{title}}</p>
               <p class="subtitle is-5">${{price}}</p>
               <a>Visit site</a>
               <br>
               <p>Added {{timestamp}}</p>
               <a class="button is-primary is-outlined" style="border:none;">
                <span class="icon is-small">
                  <i class="fa fa-tag"></i>
                </span>
                <span style="text-transform: lowercase;">{{category}}</span>
              </a>
              <a class="button is-pulled-right is-dark is-outlined" style="border:none;">
                 <span class="icon">
                    <i class="fa fa-trash"></i>
                 </span>
              </a>
              <a class="button is-pulled-right" style="border:none;">
                 <span class="icon has-text-danger">
                    <i class="fa fa-heart-o" v-on:mouseover="hovering = !hovering"></i>
                    <i class="fa fa-heart" v-if="hovering"></i>
                 </span>
              </a>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import "bulma/bulma.sass"

export default {
  name: 'itemcard',
  props: ['title', 'price', 'img', 'timestamp', 'category'],
  data () {
    return {
      hovering: false
    }
  }
}
</script>

<style scoped>
</style>
