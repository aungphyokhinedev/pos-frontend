<template>
  <v-content>
   

    <v-container  fluid style="height:100%">
    <AlertPanel :model="alertModel" />
    

       <LoginPanel :model="loginModel" v-on:sociallogin="socialLogin" v-on:finish="login" :scheme="scheme" />
    
     
    </v-container>
  </v-content>
</template>

<script>
import AlertPanel from "../Components/Panel/AlertPanel";
import LoginPanel from "../Components/Panel/LoginPanel"
import allLoginScheme from "../model/AllLoginModel"
export default {
  components: {
    LoginPanel: LoginPanel,
    AlertPanel:AlertPanel
  },
  created() {
      this.$store.dispatch("pospublic/clearState");
      if(this.$route.params.id){
         this.$store.dispatch("poslogin/removeHistory",{_id: this.$route.params.id});
      }
  },
  computed: {
    loginModel() {
      return {type: this.loginType} 
    },
    loginType() {
        return this.$route.params.type;
    },
     alertModel(){
     return{store:"poslogin"} 
     },
    home() {
      if(this.loginType == "owner"){
        return "/pos/home/entry"
      }
      else{
        return "/pos/front/user/shop"
      }
    },
    scheme() {
      return allLoginScheme["user"]
    },
    loginData() {
      return this.$store.state.poslogin.data;
    },
    histories() {
      return this.$store.state.poslogin.histories;
    },
    error() {
      return this.$store.state.poslogin.error;
    },
    loading() {
      return this.$store.state.poslogin.loading;
    },
    returnUrl() {
       return this.$store.state.poslogin.returnUrl
    }
  },
  watch: {
    isLoggedIn() {
      if (this.isLoggedIn) {
        this.$router.push(this.home);
      }
    },
   
  },
  methods: {
    clear(){
       this.$store.dispatch("poslogin/clear");
    },
    afterLogin(){

      if(this.returnUrl){
        this.$router.push(this.returnUrl);
      }
      else{
        this.$router.push(this.home);
      }
      
    },
    async socialLogin(params) {
      if(params){
      
        this.afterLogin()
      }
    },
    async login(params) {
      await this.$store.dispatch("poslogin/setType", this.loginType);
      await this.$store.dispatch("poslogin/login",params);
      if(this.loginData){
        this.afterLogin()
      }
    }
  },
  data: () => ({
    
  })
};
</script>

<style >

</style>