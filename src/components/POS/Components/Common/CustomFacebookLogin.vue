
<template>
  <v-row no-gutters>
    <v-col>
      <v-btn color="primary" @click="login" outlined block>{{model.title}}</v-btn>
    </v-col>
  </v-row>
</template>

<script>
//import facebookLogin from 'facebook-login-vuejs'
export default {
  props: ["model"],
  components: {
    // facebookLogin
  },
  computed: {},
  mounted() {},
  methods: {
    async logInWithFacebook() {
      await this.loadFacebookSDK(document, "script", "facebook-jssdk");
      await this.initFacebook();
      window.FB.logout();
      window.FB.login(
        function(response) {
          if (response.authResponse) {
            this.$emit("login", {
              token: response.authResponse.accessToken,
              provider: "facebook"
            });
            // Now you can redirect the user or do an AJAX request to
            // a PHP script that grabs the signed request from the cookie.
          } else {
            alert("User cancelled login or did not fully authorize.");
          }
        }.bind(this)
      );
      return false;
    },
    async initFacebook() {
      window.fbAsyncInit = function() {
        window.FB.init({
          appId: "590726715082417", //You will need to change this
          cookie: true, // This is important, it's not enabled by default
          version: "v13.0"
        });
      };
    },
    async loadFacebookSDK(d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    },

    async login() {
      this.logInWithFacebook();
    }
  },
  watch: {},
  data() {
    return {
      isConnected: false,
      name: "",
      email: "",
      personalID: "",
      picture: "",
      FB: undefined
    };
  }
};
</script>
<style scoped>
</style>