<template>
  <div class="home">
    <navbar />
    <div class="columns">
      <div class="column">
        <aside class="menu is-hidden-touch" style="text-align:left;margin-left:25px;margin-top:29px">
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
            <li class="filter-radio">
              <input type="radio" name="answer" v-model="itemType" value="unfulfilled">
                Unfulfilled Items
              </input>
            </li>
            <li class="filter-radio">
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
                <input class="input filter-price" type="number" v-model="minPrice" placeholder="Min">
              </div>
              <div class="column" style="padding-left:0">
                <input class="input filter-price" type="number" v-model="maxPrice" placeholder="Max">
              </div>
            </div>
            <li>
              <p style="padding-left:0px;font-size:13px;padding-top:10px;padding-bottom:8px">By Category</p>
              <div class="select is-primary" style="height:30px;font-size:13px;width:100%">
                <select v-model="category" style="border: solid 1px #00d3d1;width:100%">
                  <option disabled value="">None</option>
                  <option v-for="c in categories">{{ c }}</option>
                </select>
              </div>
            </li>
            <span class="checkbox" style="padding-left:0px;font-size:13px;padding-top:20px;padding-bottom:20px" >
              <input type="checkbox" v-model="showFaves">
                Favourites Only
              </input>
            </span>
            <a class="button is-primary" v-on:click="" style="height:30px;font-size:13px;background-color:#00d3d1">Reset Filters</a>
            <br>
          </ul>
          <p class="menu-label">My Stores</p>
          <ul class="menu-list" style="font-size:13px;height:150px;overflow:auto">
            <li v-for="store in myStores" style="padding-bottom:10px">
              <input type="checkbox" v-model="selectedStores" v-bind:value="store" style="padding-left: 0px">
               {{ store }}
            </li>
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
              <select v-on:change="sortBy" v-model="sort" style="font-weight:100">
                <option>Popularity</option>
                <option>First added</option>
                <option>Last added</option>
                <option>Price low to high</option>
                <option>Price high to low</option>
              </select>
            </div>
            <p class="is-pulled-right" style="padding-right: 1%; padding-top: 0.5%;font-weight:100">Sort by: </p>
            <h1 class="title num-items">
              {{ filteredItems.length }} items from {{ numStoresFilteredList }} retailers
            </h1>
          </div>
        </section>
        <section class="section" style="padding-left:0;padding-top:0;" v-if="currentUser.name != ''">
          <section class="section" v-if="filteredItems.length == 0" style="text-align:left;padding-left:0;padding-top:10px;color:darkgrey">No items.</section>
            <paginate name="items" :list="filteredItems" :per="8" class="columns is-multiline">
              <div v-for="item in paginated('items')" v-model="currentUser.items" class="column is-3">
                <itemcard :title="item.title" :price="item.price" :img="item.img" :category="item.category" :timestamp="item.timestamp" :host="item.host" :link="item.link" :favourite="item.favourite" :itemId="item.key"
                  :purchased="item.purchased"></itemcard>
              </div>
            </paginate>
            <div v-if="filteredItems.length > 8">
              <paginate-links for="items" :limit="3"></paginate-links>
              <paginate-links for="items" :simple="{
                next: 'Next »',
                prev: '« Back'
              }"></paginate-links>
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
      sort: 'Popularity',
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
        'Health & Beauty',
        'Toys & Media',
        'Collectables',
        'Other'
      ],
      itemType: 'unfulfilled',
      category: '',
      purchased: '',
      selectedStores: [],
      showFaves: false,
      originalList: [],
      paginate: ['items']
    }
  },
  created: function() {
    // Get current user ID and reference to database
    var userId = firebase.auth().currentUser.uid;
    var db = firebase.database();

    // Get the name for the current user
    db.ref('/users/' + userId).once('value').then((snapshot) => {
      var username = (snapshot.val() && snapshot.val().fname) || '';
      this.currentUser.name = username;
    });

    // Get the current user's items
    var ref = db.ref('/users/' + userId + '/items').on("value", (snapshot) => {
      this.currentUser.items = [];
      snapshot.forEach((child) => {
        var item = child.val();
        item.key = child.key;
        item.host = this.extractStoreName(item.link)
        this.currentUser.items.unshift(item);
        this.originalList.push(item);
      });

    }, function (errorObject) {
    });
  },
  methods: {
    popularitySort: function(list) {
      var storeList = [];
      var itemsLen = list.length;

      // items will be sorted.
      if (itemsLen != 0) {
        this.sort = 'Popularity'
      // items will not be sorted, this.currentUser.items.length is empty.
      } else {
        this.sort = 'Last added';
      };

      // Calculate store's popularity for every stores by number of appearances
      for (var i = 0; i < itemsLen; i++) {
        var inserted = false;
        if (list[i].link) {
          var storeName = this.extractStoreName(list[i].link);
          for (var j = 0; j < storeList.length; j++) {
            if (storeList[j].name == storeName) {
              storeList[j].rate++;
              inserted = true;
            };
          };
          if (!inserted) storeList.push({name:storeName, rate:1});
        };
      };

      // Calculate overall popularity (clicks + store's popularity)
      for (var i = 0; i < itemsLen; i++) {
        var storeName = this.extractStoreName(list[i].link);
        var popularity = list[i].clicks;
        for (var j = 0; j < storeList.length; j++) {
          if (storeList[j].name == storeName) popularity += storeList[j].rate;
        };
      };

      // Sort the items by overall popularity (clicks + store's popularity)
      list.sort(function(a, b) {return b.clicks - a.clicks});
      return list;
    },

    sortBy: function () {
      // Copy across the original list which is sorted by date
      if (this.sort == 'First added') {
        this.currentUser.items = this.originalList.slice();
      }
      // Copy across the original list and reverse
      if (this.sort == 'Last added') {
        this.currentUser.items = this.originalList.slice();
        this.currentUser.items.reverse();
      }
      // Sorts based on price
      if (this.sort == 'Price low to high') {
        this.currentUser.items.sort(function(a, b) {
            return parseFloat(a.price) - parseFloat(b.price);
        });
      }
      if (this.sort == 'Price high to low') {
        this.currentUser.items.sort(function(a, b) {
            return parseFloat(b.price) - parseFloat(a.price);
        });
      }
    },
    extractHostname: function (url) {
      var hostname;
      //find & remove protocol (http, ftp, etc.) and get hostname

      if (url.indexOf("://") > -1) {
          hostname = url.split('/')[2];
      } else {
          hostname = url.split('/')[0];
      }

      //find & remove port number
      hostname = hostname.split(':')[0];
      //find & remove "?"
      hostname = hostname.split('?')[0];

      return hostname;
    },
    // http://au.boohoo.com/lace-up-running-trainers-with-speckled-sole/MZZ75779.html
    // https://www.jbhifi.com.au/computers-tablets/laptops/dell/dell-inspiron-z510835au-11-3000-2-in-1-laptop/954158/
    extractStoreName: function (url) {
      var name = this.extractHostname(url);
      var splitArr = name.split('.');
      var arrLen = splitArr.length;

      //extracting the root domain here
      //if there is a subdomain
      if (arrLen > 2) {
          name = splitArr[arrLen - 2] + '.' + splitArr[arrLen - 1];
          //check to see if it's using a Country Code Top Level Domain (ccTLD) (i.e. ".me.uk")
          if (splitArr[arrLen - 1].length == 2 && splitArr[arrLen - 1].length == 2) {
              //this is using a ccTLD
              name = splitArr[arrLen - 3] + '.' + name;
          }
      }
      return name;

    },
    resetFilters: function () {
      this.minPrice = '';
      this.maxPrice = '';
      this.category = '';
      this.showFaves = false;
      this.itemType = 'unfulfilled';
    },
    // filters item list by search text (non case sensitive)
    filterSearch: function (list, itemList) {
      if (!this.searchText) {
        list = itemList;
      } else {
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
    },
    filterStores: function (list) {
      var newList = [];
      var storeListLength = this.selectedStores.length
      if (this.selectedStores.length == 0) {
        return list;
      } else {
        var i, j, len, storeLink, listLink;
        len = list.length;
        for (i = 0; i < storeListLength; i++) {
          storeLink = this.selectedStores[i];
          for (j = 0; j < len; j ++) {
            listLink = list[j].link;
            if (!listLink) {
              continue;
            } else {
              if (this.extractStoreName(listLink) === storeLink) {
                newList.push(list[j]);
              }
            }
          }
        }
        return newList;
      }

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
      list = this.filterStores(list);
      if (this.sort == 'Popularity') list = this.popularitySort(list);
      return list;
    },
    // return list of stores user has items from
    myStores: function () {
      var storeList = [];
      var i, len, itemStore;
      len = this.currentUser.items.length;
      for (i = 0; i < len; i++) {
        if (!this.currentUser.items[i].link) {
          continue;
        }
        itemStore = this.extractStoreName(this.currentUser.items[i].link)
        // checks if already in list
        if (storeList.indexOf(itemStore) < 0) {
          storeList.push(itemStore)
        }
      }
      return storeList;
    },
    // returns number of stores in filtered list
    numStoresFilteredList: function () {
      var storeList = [];
      var i, len, itemStore;
      len = this.filteredItems.length;
      for (i = 0; i < len; i++) {
        if (!this.filteredItems[i].link) {
          continue;
        }
        itemStore = this.extractStoreName(this.filteredItems[i].link)
        // checks if already in list
        if (storeList.indexOf(itemStore) < 0) {
          storeList.push(itemStore);
        }
      }
      return storeList.length;
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

.filter-price {
  height: 30px;
  font-size: 13px;
  box-shadow: none;
}

.filter-radio {
  padding-bottom:10px;
}

.num-items {
  color: #313131;
  font-weight: 200;
  text-align: left;
  font-size: 15px;
  padding-top: 9px;
  padding-bottom: 15px;
}
</style>
