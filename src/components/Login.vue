<template>
  <div class="login">
    <div class="login-wrapper columns">
      <div class="column is-8 is-hidden-mobile hero-banner">
        <section class="hero is-fullheight is-dark">
          <div class="hero-body">
            <div class="container section" style="background-color: transparent;">
              <div class="has-text-right">
                <h1 class="title is-1">Login</h1> <br>
                <p class="title is-3">Please Enter Your Login Details</p>
              </div>
            </div>
          </div>
        </section>  
      </div>
      <div class="column is-4">
        <section class="hero is-fullheight">
          <div class="hero-heading">
            <div class="section has-text-centered">
              <img src="../assets/icon1.png">
              <p>ISC</p>
            </div>
          </div>
          <div class="hero-body">
            <div class="container">
              <div class="columns">
                <div class="column is-8 is-offset-2">
                  <h1 class="avatar has-text-centered section">
                    <img src="../assets/user.png">
                  </h1>
                  <div class="login-form">
                    <p class="control has-icon has-icon-right">
                      <input class="input email-input" type="text" placeholder="hello@world.org" v-model="account.email">
                      <span class="icon user">
                        <i class="fa fa-user"></i>
                      </span>
                    </p>
                    <p class="control has-icon has-icon-right">
                      <input class="input password-input" type="password" placeholder="●●●●●●●●●" v-model="account.password">
                      <span class="icon user">
                        <i class="fa fa-lock"></i>
                      </span>
                    </p>
                    <p class="control login">
                      <button class="button is-success is-outlined is-large is-fullwidth" :disabled="submitDisable" @click.prevent="login">Login</button>
                    </p>
                  </div>
<!--                   <div class="section forgot-password">
                    <p class="has-text-centered">
                      <a href="#">Forgot password</a>
                      <a href="#">Need help?</a>
                    </p>
                  </div> -->
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
export default {
  name: 'login',
  data () {
    return {
      account: { email: '', password: '' }
    }
  },
  methods: {
    login () {
      let url = 'http://localhost:3000/login'
      axios.post(url, this.account).then(response => {
        console.log('login success?')
        this.$router.push('/')
      }).catch(error => {
        console.log(error)
      })
    }
  },
  computed: {
    submitDisable () {
      if (this.account.email && this.account.password) {
        return false
      } else {
        return true
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
