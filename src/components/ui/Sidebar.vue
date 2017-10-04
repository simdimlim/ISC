<template lang="html">
  <aside class="menu" style="text-align:left">

    <p class="menu-label">Navigation</p>

    <ul class="menu-list">
      <div class="columns">
        <div class="column is-9">
          <div class="field search-bar-field">
            <input class="input search-bar" placeholder="Search items...">
          </div>
        </div>
        <div class="column is-3">
          <a class="button add-item-btn"><i class="fa fa-search"></i></a>
        </div>
      </div>
      <br>
    </ul>

    <p class="menu-label">Filter</p>

    <ul class="menu-list">
      <li><a style="padding-left:0px">Sort by Price</a></li>
      <div class="columns">
        <div class="column">
          <input class="input" type="number" placeholder="Min $">
        </div>
        <div class="column">
          <input class="input" type="number" placeholder="Max $">
        </div>
      </div>
      <li>
        <a style="padding-left:0px">Sort by Category</a>
        <div class="select is-primary">
          <select>
            <option>None</option>
            <option>Option 2</option>
            <option>Rick</option>
            <option>And</option>
            <option>Morty</option>
          </select>
        </div>
      </li>
      <br>
      <a class="checkbox" style="padding-left: 0px">
        <input type="checkbox">
         Favourites
      </a>
      <a class="button is-primary">Apply</a>
      <br>
    </ul>

    <p class="menu-label">My Stores</p>

    <ul class="menu-list">
      <li><a style="padding-left:0px">Stores</a></li>
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
</template>

<script>
export default {
  name: 'sidebar'
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
</style>
