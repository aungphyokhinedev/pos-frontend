<template>
  <v-content>
    <v-container  fluid style="height:100%">
 
      <AlertPanel :model="alertModel" />
      <LoginPanel v-on:finish="login" :scheme="scheme" />
    
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
  },
  computed: {
    alertModel(){
     return{store:"possalelogin"} 
     },
    scheme() {
      return allLoginScheme["saleUser"]
    },
    store(){
      return this.scheme.store
    },
    loginData() {
      return this.$store.state[this.store].data;
    },
    histories() {
      return this.$store.state[this.store].histories;
    },
    error() {
      return this.$store.state[this.store].error;
    },
    loading() {
      return this.$store.state[this.store].loading;
    }
  },
  watch: {
    isLoggedIn() {
      if (this.isLoggedIn) {
        this.$router.push("/pos/home");
      }
    },
   
  },
  methods: {
    clear(){
       this.$store.dispatch(this.store + "/clear");
    },
    async login(params) {
      await this.$store.dispatch("poslogin/setType", "sale");
      await this.$store.dispatch(this.store + "/login", params);
      if(this.loginData){
        this.$router.push("/pos/sale");
      }
    }
  },
  data: () => ({
    
  })
};
</script>

<style >

</style>