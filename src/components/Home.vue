<template>
  <div class="home">
    <navbar />
    <div class="columns" style="">
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
          <ul class="menu-list" style="font-size:13px;padding-bottom:10px">
            <li style="padding-bottom:10px">
              <input type="radio" name="answer" v-model="itemType" value="unfulfilled">
                Unfulfilled Items
              </input>
            </li>
            <li style="padding-bottom:10px">
              <input type="radio" name="answer" v-model="itemType" value="fulfilled">
                Fulfilled Items
              </input>
            </li>
            <li>
              <input type="radio" name="answer" v-model="itemType" value="all">
                All
              </input>
            </li>
          </ul>
          <ul class="menu-list">
            <li><a style="padding-left:0px;font-size:13px">By Price</a></li>
            <div class="columns" style="margin-bottom:0px">
              <div class="column" style="padding-right:5px">
                <input class="input" type="number" v-model="minPrice" placeholder="Min" style="height:30px;font-size:13px;box-shadow:none">
              </div>
              <div class="column" style="padding-left:0">
                <input class="input" type="number" v-model="maxPrice" placeholder="Max" style="height:30px;font-size:13px;box-shadow:none">
              </div>
            </div>
            <li>
              <p style="padding-left:0px;font-size:13px;padding-top:10px;padding-bottom:8px">By Category</p>
              <div class="select is-primary" style="height:30px;font-size:13px">
                <select v-model="category" style="border: solid 1px #00d3d1">
                  <option>None</option>
                  <option v-for="c in categories">{{ c }}</option>
                </select>
              </div>
            </li>
            <span class="checkbox" style="padding-left:0px;font-size:13px;padding-top:20px;padding-bottom:20px" >
              <input type="checkbox" v-model="showFaves">
                Favourites Only
              </input>
            </span>
            <a class="button is-primary" v-on:click="resetFilters" style="height:30px;font-size:13px;background-color:#00d3d1">Reset Filters</a>
            <br>
          </ul>
          <p class="menu-label">My Stores</p>
          <ul class="menu-list" style="font-size:13px">
            <a class="checkbox" style="padding-left: 0px">
              <input type="checkbox">
               Example
            </a>
          </ul>
        </aside>
      </div>
      <div class="column is-10" style="padding-left:30px;padding-right:30px">
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
            <h1 class="title" style="color:#313131;font-weight:200; text-align:left">
              Hello {{currentUser.name}}
            </h1>
            <p class="subtitle" style="text-align:left">Welcome to your ISC!</p>
          </div>
        </section>
        <section class="section" style="padding-left:0;padding-top:0;height:700px" v-if="currentUser.name != ''">
          <section class="section" v-if="filteredItems.length == 0" style="text-align:left;padding-left:0;padding-top:10px;color:darkgrey">No items.</section>
          <div class="columns is-multiline">
            <div v-for="image in filteredItems" v-model="currentUser.items" class="column is-3">
              <itemcard :title="image.title" :price="image.price" :img="image.img" :category="image.category" :timestamp="image.timestamp" :link="image.link" :favourite="image.favourite" :itemId="image.key"
              :purchased="image.purchased"></itemcard>
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
      categories: [
        'Fashion',
        'Technology',
        'Electronics',
        'Motors',
        'Home & Garden',
        'Sports',
        'Health, Beauty & Baby',
        'Toys & Media',
        'Collectables',
        'Other'
      ],
      itemType: 'unfulfilled',
      category: '',
      purchased: '',
      showFaves: false
    }
  },
  created: function() {
    var userId = firebase.auth().currentUser.uid;
    var db = firebase.database();
    db.ref('/users/' + userId).once('value').then((snapshot) => {
      var username = (snapshot.val() && snapshot.val().fname) || '';
      this.currentUser.name = username;
    });
    var ref = db.ref('/users/' + userId + '/items').on("value", (snapshot) => {
      this.currentUser.items = []
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
    },
    extractHostname: function (url) {
      var hostname;
      //find & remove protocol (http, ftp, etc.) and get hostname

      if (url.indexOf("://") > -1) {
          hostname = url.split('/')[2];
      }
      else {
          hostname = url.split('/')[0];
      }

      //find & remove port number
      hostname = hostname.split(':')[0];
      //find & remove "?"
      hostname = hostname.split('?')[0];

      return hostname;
    },
    resetFilters: function () {
      this.minPrice = '';
      this.maxPrice = '';
      this.category = '';
      this.showFaves = false;
      this.itemType = 'Unfulfilled Items';
    },
    // filters item list by search text (non case sensitive)
    filterSearch: function (list, itemList) {
      if (!this.searchText) {
        list = itemList;
      }
      else {
        var i, len, item;
        len = itemList.length;
        for (i = 0; i < len; i++) {
          item = itemList[i].title.toUpperCase()
          if (item.indexOf(this.searchText.toUpperCase()) !== -1) {
            list.push(itemList[i]);
          }
        }
      }
      return list;
    },
    filterFavourites: function (list) {
      if (this.showFaves) {
        var i, len;
        var newList = [];
        len = list.length;
        for (i = 0; i < len; i++) {
           if (list[i].favourite) {
             newList.push(list[i]);
          }
        }
        return newList;
      } else {
        return list;
      }
    },
    // filters item list by min and max prices
    filterPrice: function (list) {
      console.log('h')
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
    },
    // filters item list by categories
    filterCategory: function (list) {
      var newList = [];
      if (!this.category || this.category == 'None') {
        return list;
      } else {
        var i, len, itemCat;
        len = list.length;
        for (i = 0; i < len; i++) {
          itemCat = list[i].category;
          if (itemCat === this.category) {
            newList.push(list[i]);
          }
        }
        return newList;
      }
    },
    // Filter by item type
    filterItemType: function (list) {
      var newList = [];
      var len = list.length;
      for (var i = 0; i < len; i++) {
        var purchased = list[i].purchased;
        if (this.itemType === 'unfulfilled' && !purchased) {
          newList.push(list[i]);
        } else if (this.itemType === 'fulfilled' && purchased) {
          newList.push(list[i]);
        } else if (this.itemType === 'all') {
          newList.push(list[i]);
        }
      }
      return newList;
    }
  },
  computed: {
    // return list of items with all filters applied
    filteredItems: function () {
      var list = [];
      list = this.filterSearch(list, this.currentUser.items);
      list = this.filterFavourites(list);
      list = this.filterPrice(list);
      list = this.filterCategory(list);
      list = this.filterItemType(list);
      return list;
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

.select:not(.is-multiple)::after {
    border: 1px solid #00d3d1;
    border-right: 0;
    border-top: 0;
    content: " ";
    display: block;
    height: 0.5em;
    pointer-events: none;
    position: absolute;
    transform: rotate(-45deg);
    width: 0.5em;
    margin-top: -0.375em;
    right: 1.125em;
    top: 50%;
    z-index: 4;
}

.input:focus, .input.is-focused, .input:active, .input.is-active, .textarea:focus, .textarea.is-focused, .textarea:active, .textarea.is-active {
    border-color: #00d3d1;
    box-shadow: 0 0 0 0.125em rgba(0, 209, 178, 0.25);
}
</style>
