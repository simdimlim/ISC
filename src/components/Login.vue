<template>
  <div class="login">

    <h1 class="title">Login</h1>
    <h2 class="subtitle"><a href="http://fontawesome.io/">Please enter your login details</a></h2>
    <div class="tile is-ancestor">

      <div class="tile is-parent is-3">
        <article class="tile is-child box">
          <h1 class="title">Login</h1>
          <h2 class="subtitle"><a href="http://fontawesome.io/">Please enter your login details</a></h2>
          <div class="block">
            <p class="control has-icon">
              <input class="input" type="email" placeholder="Email">
              <span class="icon is-small">
                <i class="fa fa-envelope"></i>
              </span>
            </p>
            <p class="control has-icon">
              <input class="input" type="password" placeholder="Password">
              <span class="icon is-small">
                <i class="fa fa-lock"></i>
              </span>
            </p>
            <p class="control">
              <button class="button is-success">
                Login
              </button>
            </p>
          </div>
        </article>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
