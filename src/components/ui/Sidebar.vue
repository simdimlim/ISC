<template lang="html">
  <aside class="menu" style="text-align:left">

    <p class="menu-label">General</p>

    <ul class="menu-list">
      <li><a>Dashboard</a></li>
      <li><a>Profile</a></li>
    </ul>

    <p class="menu-label">My Lists</p>

    <ul class="menu-list">
      <li><a class="is-active">Gift List</a>
        <ul>
          <li><a>Public</a></li>
          <li><a>Private</a></li>
        </ul>
      </li>
      <li><a>My Events</a></li>
      <li><a>Fund List</a></li>
    </ul>

    <p class="menu-label">Transactions</p>

    <ul class="menu-list">
      <li><a>Payments</a></li>
      <li><a>Transfers</a></li>
      <li><a>Balance</a></li>
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
