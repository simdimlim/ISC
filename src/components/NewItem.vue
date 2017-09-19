<template>
  <div class="add">

    <navbar/>

    <section class="section" style="padding-top:20px">
      <div class="container main-container">

        <div class="container" v-if="showLoader">
          <p class="loader-text">Collecting details from link...</p><br>
          <three-dots></three-dots>
        </div>

        <div class="container" v-if="!showLoader">
          <h1 class="title">
            <strong>Add Details</strong>
          </h1>
          <div class="columns">
            <div class="column is-4" style="height:400px;overflow-y:auto">
              <ul id="example-1">
                <li v-for="image in images">
                  <img :src="image">
                </li>
              </ul>
            </div>
            <div class="column" style="text-align:left">
              <div class="field">
                <label class="label">Name</label>
                <div class="control">
                  <input class="input" type="text" placeholder="Text input">
                </div>
              </div>
              <div class="field">
                <label class="label">Price</label>
                <div class="control">
                  <input class="input" type="text" placeholder="Text input">
                </div>
              </div>
              <div class="field">
                <label class="label">Category</label>
                <div class="control">
                  <div class="select">
                    <select>
                      <option>Select a category</option>
                      <option>Fashion</option>
                      <option>Technology</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import navbar from './ui/Navbar'
import sidebar from './ui/Sidebar'
import axios from 'axios'
import ThreeDots from 'vue-loading-spinner/src/components/ThreeDots'

export default {
  name: 'add',
  components: {
      navbar,
      ThreeDots
  },
  data () {
    return {
      currentUser: {
          name: 'Temp',
      },
      link: this.$route.query.url,
      images: [],
      showLoader: true,
    }
  },
  mounted: function() {
    axios.post(`http://localhost:3000/scrape`, {
      link: this.link
    })
    .then(response => {

      var func = function(context, list) {
        console.log("Height: " + img.height + ", Width: " + img.width)
        context.images.push(list[i])
      };

      for (var i = 0; i < response.data.images_src.length; i++) {
        var img = new Image();
        img.name = response.data.images_src[i]
        img.onload = func(this,response.data.images_src);
        img.src = response.data.images_src[i]
      }

      this.showLoader = false;
  //    this.images.push.apply(this.images, response.data.images_datasrc)
    })
    .catch(e => {
      //console.log(e)
    })
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main-container {
  padding-right: 15%;
  padding-left: 15%;
}
.field {
  padding-top: 15px;
  padding-left: 30px;
}
.loading {
  border:none;
}
.loader-text {
  color: #00d3d1;
  padding-top: 30px;
  padding-bottom: 15px;
  font-weight: bold;
}
.link-form {
    margin-left: 200px;
    margin-right: 200px;
}
</style>
