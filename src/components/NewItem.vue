<template>
  <div class="add">
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'add',
  components: {
  },
  data () {
    return {
    }
  },
  mounted: function() {
    axios({
      method: 'post',
      url: 'http://localhost:5555/',
      headers: {
        'Content-type': 'application/json'
        },
      data:{
        'listname': 'hello'
      }
    })
    .then((response)=>{
      console.log('this is the response from the python server on a get request of listname ', response);
    })
    .catch(error=>{
      console.log('here is the error on a get request from the python server of listname ', error);
    })
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
