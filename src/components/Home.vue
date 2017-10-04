<template>
  <div class="home">
    <navbar />

      <div class="columns">
      <!-- make sidebar hide pls on window smaller -->
        <div class="column">
          <aside class="menu is-hidden-touch" style="text-align:left;margin-left:25px;margin-top:50px">

            <p class="menu-label" style="margin-left:1px">Search</p>

            <ul class="menu-list" style="padding-bottom:15px">
              <div class="field search-bar-field">
                <p class="control has-icons-left">
                  <input class="input search-bar" v-model="searchText" style="box-shadow:none;height:30px;font-size:13px" placeholder="Search items">
                  <span style="padding-top:6px" class="icon is-small is-left">
                        <i class="fa fa-search"></i>
                      </span>
                    </p>
              </div>
            </ul>

            <p class="menu-label">Filter</p>

            <ul class="menu-list">
              <li><a style="padding-left:0px;font-size:13px">Sort by Price</a></li>
              <div class="columns" style="margin-bottom:0px">
                <div class="column" style="padding-right:5px">
                  <input class="input" type="number" v-model="minPrice" placeholder="Min" style="height:30px;font-size:13px;box-shadow:none">
                </div>
                <div class="column" style="padding-left:0">
                  <input class="input" type="number" v-model="maxPrice" placeholder="Max" style="height:30px;font-size:13px;box-shadow:none">
                </div>
              </div>
              <li>
                <p style="padding-left:0px;font-size:13px;padding-top:10px;padding-bottom:8px">Sort by Category</p>
                <div class="select is-primary" style="height:30px;font-size:13px">
                  <select style="border: solid 1px #00d3d1">
                    <option>None</option>
                    <option>Option 2</option>
                    <option>Rick</option>
                    <option>And</option>
                    <option>Morty</option>
                  </select>
                </div>
              </li>
              <span class="checkbox" style="padding-left:0px;font-size:13px;padding-top:20px;padding-bottom:20px">
                <input type="checkbox">
                 Favourites Only
               </input>
             </span>
              <a class="button is-primary" style="height:30px;font-size:13px;background-color:#00d3d1">Apply</a>
              <br>
            </ul>

            <p class="menu-label">My Stores</p>

            <ul class="menu-list" style="font-size:13px">
              <a class="checkbox" style="padding-left: 0px">
                <input type="checkbox">
                 Amazon
              </a>
              <a class="checkbox" style="padding-left: 0px">
                <input type="checkbox">
                 Ebay
              </a>
              <a class="checkbox" style="padding-left: 0px">
                <input type="checkbox">
                 Coles
              </a>
            </ul>

          </aside>
        </div>
        <div class="column is-10" style="padding-left:30px">

    <section class="section" style="padding-top:20px;padding-left:0;padding-bottom:15px">

      <div class="container" style="padding-top:100px;width:auto;padding-right:268px" v-if="currentUser.name == ''">
        <three-dots></three-dots>
      </div>
      <div class="container" style="width:auto;" v-if="currentUser.name != ''">
        <div class="select is-pulled-right" style="z-index: 3;">
           <select v-on:change="sortBy" v-model="sort">
            <option>Last added</option>
            <option>First added</option>
            <option>Price low to high</option>
            <option>Price high to low</option>
           </select>
        </div>
        <p class="is-pulled-right" style="padding-right: 1%; padding-top: 0.5%;">Sort by: </p>
        <h1 class="title" style="color:rgb(82, 82, 82);font-weight:200; text-align:left">
          Hello {{currentUser.name}}
        </h1>
        <p class="subtitle" style="text-align:left">Welcome to your ISC!</p>
      </div>
    </section>
    <section class="section" style="padding-left:0;padding-top:0;height:700px" v-if="currentUser.name != ''">
      <div class="columns">
        <div v-for="image in filteredItems" v-model="currentUser.items" class="column is-3">
          <itemcard :title="image.title" :price="image.price" :img="image.img" :category="image.category" :timestamp="image.timestamp" :link="image.link" :favourite="image.favourite" :itemId="image.key"></itemcard>
        </div>
      </div>
    </section>
  </div>
</div>
</div>
</template>

<script>
import navbar from './ui/Navbar'
import itemcard from './ui/ItemCard'
import firebase from 'firebase'
import ThreeDots from 'vue-loading-spinner/src/components/ThreeDots'

export default {
  name: 'home',
  components: {
      navbar,
      itemcard,
      ThreeDots
  },
  data: function() {
    return {
      currentUser: {
          name: '',
          photo: '',
          items: []
      },
      myvar: '',
      sort: 'Last added',
      searchText: '',
      minPrice: '',
      maxPrice: '',
      category: '',
      favourite: '',
    }
  },
  created: function() {
    var userId = firebase.auth().currentUser.uid;
    var db = firebase.database();
    db.ref('/users/' + userId).once('value').then((snapshot) => {
      var username = (snapshot.val() && snapshot.val().fname) || '';
      this.currentUser.name = username;
    });
    var ref = db.ref('/users/' + userId + '/items').once("value", (snapshot) => {
      snapshot.forEach((child) => {
        var key = child.key;
        var value = child.val();
        value.key = key;
        console.log(value)
        this.currentUser.items.unshift(value);
      });
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
  },
  methods: {
    sortBy: function () {
      console.log('hey')
      if (this.sort == 'First added') this.currentUser.items.reverse();
      if (this.sort == 'Last added') this.currentUser.items.reverse();
    }
  },
  computed: {
    filteredItems: function () {
      // filters item list by search text (non case sensitive)
      var list = [];
      if (!this.searchText) {
        list = this.currentUser.items;
      }
      else {
        var i, len, item;
        len = this.currentUser.items.length;
        for (i = 0; i < len; i++) {
          item = this.currentUser.items[i].title.toUpperCase()
          if (item.indexOf(this.searchText.toUpperCase()) !== -1) {
            list.push(this.currentUser.items[i]);
          }
        }
      }
      // filters item list by min and max prices
      var newList = [];
      if (!this.minPrice && !this.maxPrice) {
        return list;
      } else {
        var i, len, item;
        len = list.length;
        for (i = 0; i < len; i++) {
          item = parseInt(list[i].price);
          // if only min price is empty
          if (!this.minPrice) {
            if (item <= this.maxPrice) {
              newList.push(list[i]);
            }
          } 
          // if only max price is empty
          else if (!this.maxPrice) {
            if (item >= this.minPrice) {
              newList.push(list[i]);
            }
          } else {
            if (item >= this.minPrice && item <= this.maxPrice) {
              newList.push(list[i]);
            }
          }
        }
        return newList;
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.menu-list a.is-active {
    background-color: #00d3d1;
}
.menu-list a:hover {
    color: #00d3d1;
}
.add-item-btn {
  margin-right: 0px;
  background-color: #00d3d1;
  color: white;
  border: none;
}
.menu-label {
  color: #00d3d1;
}
</style>
