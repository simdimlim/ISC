<template>
  <div class="login">
    <div class="login-wrapper columns">
      <div class="column is-8 is-hidden-mobile hero-banner">
        <section class="hero is-fullheight is-dark" style="background-color:#00d3d1">
          <div class="hero-body">
            <div class="container section" style="background-color: transparent;">
              <div class="has-text-right">
                <h1 class="title is-1">Integrated Shopping Cart</h1>
                <p class="title is-3" style="font-size: 16px">Please enter your login details.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div class="column is-4">
        <section class="hero is-fullheight">
          <div class="hero-body">
            <div class="container">
              <div class="columns">
                <div class="column is-8 is-offset-2">
                  <div v-if="loading" style="color:#00d3d1">
                    Logging In...
                  </div>
                  <div class="login-form" v-if="!loading">
                    <h6 style="color:red;padding-bottom:10px" >{{errorMessage}}</h6>
                    <p class="control has-icon has-icon-right">
                      <input class="input email-input" type="text" placeholder="Email" v-model="account.email">
                      <span class="icon user" style="height:inherit;padding-top:6px">
                        <i class="fa fa-envelope-o"></i>
                      </span>
                    </p>
                    <p class="control has-icon has-icon-right">
                      <input class="input password-input" type="password" placeholder="Password" v-model="account.password" v-on:keyup.enter="login">
                      <span class="icon user" style="height:inherit;padding-top:7px">
                        <i class="fa fa-lock"></i>
                      </span>
                    </p>
                    <p class="control login" style="text-align:center">
                      <button class="button login-btn" v-on:click="login" style="width:100%">Login</button>
                      <br>or<br>
                        <button class="button login-btn" v-on:click="register" style="width:100%">Register</button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>

  </div>
</template>

<script>
import "bulma/bulma.sass"
import axios from 'axios'
import firebase from 'firebase'
import ThreeDots from 'vue-loading-spinner/src/components/ThreeDots'

export default {
  name: 'login',
  components: {
    ThreeDots
  },
  data () {
    return {
      account: { email: '', password: '' },
      errorMessage: '',
      loading: false
    }
  },
  methods: {
    login () {
      this.loading = true;
      // Attempt to authorise email and password
      firebase.auth().signInWithEmailAndPassword(this.account.email, this.account.password).then(
        // Log the user in
        (user) => { this.$router.push('home'); },
        // Display an error message
        (err) => { this.errorMessage = err.message; }
      );
    },
    register () {
      this.$router.replace('register');
    }
  }
}
</script>
