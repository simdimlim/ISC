<template lang="html">
  <aside class="menu is-hidden-touch" style="text-align:left">

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
          <input class="input" type="number" placeholder="Min" style="height:30px;font-size:13px;box-shadow:none">
        </div>
        <div class="column" style="padding-left:0">
          <input class="input" type="number" placeholder="Max" style="height:30px;font-size:13px;box-shadow:none">
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
         Example
      </a>
    </ul>

  </aside>
</template>

<script>
export default {
  name: 'sidebar',
  data: function () {
    return {
      searchText: ''
    }
  }
}
</script>

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
