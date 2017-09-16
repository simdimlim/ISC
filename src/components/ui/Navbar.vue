<template lang="html">
  <nav class="nav has-shadow" >

    <div class="nav-left">
      <router-link class="nav-item is-brand" to="/"><b>ISC</b></router-link>
      <router-link class="nav-item is-tab" to="/">Dashboard</router-link>
      <div class="field search-bar-field">
        <input class="input search-bar" placeholder="Search items...">
          <a class="button add-item-btn"><i class="fa fa-search"></i></a>
      </div>
    </div>

    <div class="nav-right">
      <span class="nav-item">
        <a class="button add-item-btn"><i class="fa fa-plus"></i>&nbspAdd Item</a>
      </span>
      <span class="nav-item logout-btn">
        <a class="button">Logout</a>
      </span>
    </div>

  </nav>
</template>

<script>
export default {
  name: 'navbar'
}
</script>

<style scoped>
b {
    color: #00d1d3 !important;
    padding-left:10px;
}

.search-bar-field {
  padding-top: 10px;
  padding-left: 10px;
}

.search-bar {
    width: 30vw;
}

.add-item-btn {
  margin-right: 0px;
  background-color: #00d3d1;
  color: white;
  border: none;
}

.logout-btn {
    margin-right: 10px
}

.input.is-active, .input:active, .input:focus, .textarea.is-active, .textarea:active, .textarea:focus {
  border: #00d3d1 1px solid;
}

.nav-item a.is-tab:hover, a.nav-item.is-tab:hover {
  border-bottom: 1px solid #00d3d1;
}
</style>
