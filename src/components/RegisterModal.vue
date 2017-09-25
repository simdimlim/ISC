<template>
   <transition name="modal">
      <div class="modal-mask" @click="close">
         <div class="modal-wrapper">
            <div class="modal-container" @click.stop>
               
               <div class="modal-body">
                  <label class="form-label">
                     <input class="form-control" type="text" placeholder="Name" v-model="registerName">
                  </label>
                  <label class="form-label">
                     <input class="form-control" type="text" placeholder="Email" v-model="registerEmail">
                  </label>
                  <label class="form-label">
                     <input class="form-control" type="password" placeholder="Password" v-model="registerPassword">
                  </label>
               </div>
               
               <div class="modal-footer text-right">
                  <button class="button register-btn" @click="submit()">
                     <!-- make this a submit button instead of just closing the modal -->
                     Register
                  </button>
               </div>
            </div>
         </div>
      </div>
   </transition>
</template>

<script>
export default {
   name: 'modal',
   data () {
      return {
         registerName: '',
         registerEmail: '',
         registerPassword: ''
      }
   },
   methods: {
      close: function() {
         this.$emit('close');
         this.registerName = '';
         this.registerEmail = '';
         this.registerPassword = '';
      },
      submit: function () {
         // Some submit logic goes here...
         this.close();
      }
   }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
   box-sizing: border-box;
}

.modal-mask {
   position: fixed;
   z-index: 9998;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   background-color: rgba(0, 0, 0, .5);
   transition: opacity .3s ease;
}

.modal-container {
   width: 400px;
   margin: 40px auto 0;
   padding: 20px 30px;
   background-color: #fff;
   border-radius: 2px;
   box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
   transition: all .3s ease;
   font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
   margin-top: 0;
   color: #00d3d1;
}

.modal-body {
   margin: 20px 0;
}

.text-right {
   text-align: right;
}

.form-label {
   display: block;
   margin-bottom: 1em;
}

.form-label > .form-control {
   margin-top: 0.5em;
}

.form-control {
   display: block;
   width: 100%;
   padding: 0.5em 1em;
   line-height: 1.5;
   border: 1px solid #ddd;
   font-size: 15px;
}

/*
* The following styles are auto-applied to elements with
* transition="modal" when their visibility is toggled
* by Vue.js.
*
* You can easily play with the modal transition by editing
* these styles.
*/

.modal-enter {
   opacity: 0;
}

.modal-leave-active {
   opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
   -webkit-transform: scale(1.1);
   transform: scale(1.1);
}

.register-btn {
   margin-right: 0px;
   background-color: #00d3d1;
   color: white;
   border: none;
   width: 100%;
}
</style>