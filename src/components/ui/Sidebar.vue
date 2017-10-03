<template lang="html">
  <aside class="menu" style="text-align:left">

    <p class="menu-label">Filter</p>

    <ul class="menu-list">
      <li><a style="padding-left:0px">Dashboard</a></li>
      <li><a style="padding-left:0px">Profile</a></li>
    </ul>

    <p class="menu-label">My Stores</p>

    <ul class="menu-list">
      <li><a style="padding-left:0px">Dashboard</a></li>
      <li><a style="padding-left:0px">Profile</a></li>
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
</style>
