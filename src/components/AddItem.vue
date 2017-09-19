<template>
  <div class="add">
    <navbar />
    <section class="section" style="padding-top:20px">
      <div class="container">
        <h1 class="title">
          Ya bish <strong>{{currentUser.name}}</strong>
        </h1>
        <p class="subtitle">Enter item URL below</p>
        <div class="columns link-form">
          <div class="column is-three-quarters"><div class="field">
            <div class="control">
              <input class="input" type="text"  v-on:keyup.enter="addItem" v-model="link" placeholder="e.g https://www.examplestore.com/item">
            </div>
            </div>
          </div>
          <div class="column"><a v-on:click="addItem" class="button">Button</a></div>
        </div>
      </div>
    </section>
    <section class="section" style="padding-left:0;padding-top:0;height:700px">
    </section>
  </div>
</template>

<script>
import navbar from './ui/Navbar'
import sidebar from './ui/Sidebar'
import axios from 'axios'

export default {
  name: 'add',
  components: {
      navbar
  },
  data () {
    return {
      currentUser: {
          name: 'Temp',
      },
      link: ''
    }
  },
  methods: {
    addItem: function(e) {
      this.$router.push({path: 'new-item', query: { url: this.link }});
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.link-form {
    margin-left: 200px;
    margin-right: 200px;
}
</style>
