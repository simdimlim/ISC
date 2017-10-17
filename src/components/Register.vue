<template>
  <div class="registertemp">
    <div class="login-wrapper columns">
      <div class="column is-8 is-hidden-mobile hero-banner">
        <section class="hero is-fullheight is-dark" style="background-color:#00d3d1">
          <div class="hero-body">
            <div class="container section" style="background-color: transparent;">
              <div class="has-text-right">
                <h1 class="title is-1">Integrated Shopping Cart</h1>
                <p class="title is-3" style="font-size: 16px">Please enter your details to create an account.</p>
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
                  <div class="login-form">
                    <h6 style="color:red;padding-bottom:10px" >{{errorMessage}}</h6>
                    <p class="control has-icon has-icon-right">
                      <input class="input" type="text" placeholder="First Name" v-model="account.fname">
                      <span class="icon user" style="height:inherit;padding-top:6px">
                        <i class="fa fa-user"></i>
                      </span>
                    </p>
                    <p class="control has-icon has-icon-right">
                      <input class="input" type="text" placeholder="Last Name" v-model="account.lname">
                      <span class="icon user" style="height:inherit;padding-top:6px">
                        <i class="fa fa-user"></i>
                      </span>
                    </p><br>
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
                    <p class="control has-icon has-icon-right">
                      <input class="input password-input" type="password" placeholder="Confirm Password" v-model="account.passwordConfirm">
                      <span class="icon user" style="height:inherit;padding-top:7px">
                        <i class="fa fa-lock"></i>
                      </span>
                    </p><br>
                    <p class="control login" style="text-align:center">
                        <button class="button login-btn" v-on:click="register" style="width:100%">Register Account</button>
                    </p>
                    <p class="control login" style="text-align:center">
                        <button class="button login-btn" v-on:click="back" style="width:100%">Back</button>
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
import firebase from 'firebase'

export default {
  name: 'register',
  data () {
    return {
      account: { email: '', password: '', fname: '', lname: '', passwordConfirm: '' },
      errorMessage: ''
    }
  },
  methods: {
    back () {
      this.$router.replace('login')
    },
    register () {
      // Make sure all input fields are filled
      if (this.account.email == '' || this.account.password == '' || this.account.fname == ''
        || this.account.lname == '' || this.account.passwordConfirm == '') {
        this.errorMessage = "Please fill all of the required boxes.";
        return;
      }
      // Make sure password and password confirm match
      if (this.account.password != this.account.passwordConfirm) {
        this.errorMessage = "Passwords do not match.";
        return;
      }
      // Check validity of email string
      var validateEmail = function (email) {
          var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return re.test(email);
      }
      if (!validateEmail(this.account.email)) {
        this.errorMessage = "Please enter a valid email.";
        return;
      }

      // Attempt to create new user
      firebase.auth().createUserWithEmailAndPassword(this.account.email, this.account.password).then(
        (user) => {
          var database = firebase.database();
          let userId = user.uid;
          // Set details for the user
          firebase.database().ref('users/' + userId).set({
            fname: this.account.fname,
            lname: this.account.lname,
          });
          this.$router.replace('home');
        },
        // Display appropriate error message
        (err) => {
          this.errorMessage = err.message;
        }
      );
    },
  },
}
</script>
