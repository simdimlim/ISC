<template>
  <div class="registertemp">
    <div class="columns" style="margin-top:100px">
      <div class="column is-4 is-offset-4">
    <div class="login-form">
      <p class="control has-icon has-icon-right">
        <input class="input" type="text" placeholder="Full Name" v-model="account.name">
        <span class="icon user" style="height:inherit;padding-top:6px">
          <i class="fa fa-user"></i>
        </span>
      </p>
      <p class="control has-icon has-icon-right">
        <input class="input email-input" type="text" placeholder="Email" v-model="account.email">
        <span class="icon user" style="height:inherit;padding-top:6px">
          <i class="fa fa-envelope-o"></i>
        </span>
      </p>
      <p class="control has-icon has-icon-right">
        <input class="input password-input" type="password" placeholder="Password" v-model="account.password">
        <span class="icon user" style="height:inherit;padding-top:7px">
          <i class="fa fa-lock"></i>
        </span>
      </p>
      <p class="control login" style="text-align:center">
          <button class="button login-btn" v-on:click="register" style="width:100%">Register Account</button>
      </p>
    </div>
  </div>
  </div>
  </div>
</template>

<script>
import "bulma/bulma.sass"
import firebase from 'firebase'

export default {
  name: 'registertemp',
  data () {
    return {
      account: { email: '', password: '', name: '', }
    }
  },
  methods: {
    register () {
      firebase.auth().createUserWithEmailAndPassword(this.account.email, this.account.password).then(
        (user) => {
          alert ("Creating user with " + this.account.email + " "+ this.account.password)
          this.$router.replace('home')
        },
        (err) => {
          alert('Oops. ' + err.message)
        }
      );
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
