<template>
  <div class="home">
    <navbar />
    <section class="section" style="padding-top:20px">
      <div class="container">
        <h1 class="title">
          Hello <strong>{{currentUser.name}}</strong>
        </h1>
        <p class="subtitle">Welcome to ISC!</p>
      </div>
    </section>
    <section class="section" style="padding-left:0;padding-top:0;height:700px">
    </section>
  </div>
</template>

<script>
import navbar from './ui/Navbar'
import sidebar from './ui/Sidebar'

export default {
  name: 'home',
  components: {
      navbar,
      sidebar
  },
  data () {
    return {
      currentUser: {
          name: 'Temp',
          photo: '',
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home {
    font-family: sans-serif;
}
</style>
