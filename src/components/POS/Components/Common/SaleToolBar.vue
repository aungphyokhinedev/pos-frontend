
 
<template>
<div>
   <v-app-bar  style="background-color:transparent" elevation="0" dense>
     
         <v-app-bar-nav-icon  v-if="isMobile" @click.stop="drawerClick" />
    <v-toolbar-title v-if="isMobile"> <span >
            iPos&nbsp;
           
          </span></v-toolbar-title>
        
      <v-menu v-if="!isMobile">
        <template  v-slot:activator="{ on }">
          
          <v-flex v-on="on">Menu</v-flex>
        </template>

        <v-list dense="">
          <v-list-item v-for="(item, i) in menuModel.items" :key="i" @click="menuClick(item)">
            <v-list-item-title><v-icon  class="mr-2">{{item.icon}}</v-icon>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
   <v-spacer/>
           <CustomArrowButton v-on="on" v-if="isMobile" class="mr-7" v-on:click="goTransaction"  title="TRANSACTIONS" color="secondary"  />
      
      <v-btn v-if="!customer" @click="addCustomer" small icon>
         <v-icon >mdi-account-plus</v-icon>
      </v-btn>
      <v-btn v-if="customer" @click="showCustomer" small icon>
        <v-icon  color="primary">mdi-account</v-icon>
        
      </v-btn>
     
    </v-app-bar>
    <CustomerInfoDialogue ref="customerinfo" />
</div>
</template>

<script>
import { isMobile } from 'mobile-device-detect';
import CustomArrowButton from "./CustomArrowButton"
import CustomerInfoDialogue from "../Dialogue/CustomerInfoDialogue"
import transactionMenuModel from "../../model/Sale/TransactionMenuModel"
export default {
  components:{
    CustomerInfoDialogue:CustomerInfoDialogue,
    CustomArrowButton:CustomArrowButton,

  },
  props: ["model"], 
  computed: {
    isMobile() {
      return isMobile
    },
     user() {
      return this.$store.state.posfrontend.user;
    },
     customer() {
      return this.$store.state.posfrontend.customer;
    },
     menuModel() {
      return {
      items: transactionMenuModel.items({uid:this.user._id})
    }
     },
   notiModel() {
     return this.user ? {
       collection: "posnoti",
       store: "posfrontend",
      events:[ "order-" + this.user.shop ]
     } : null
    }
     
  },
  methods: {
    goTransaction(){
this.$router.push("/pos/sale/transaction/all")
    },
      menuClick(item){
           this.$store.dispatch("posfrontend/setTransactionMenu", item);
           this.$router.push("/pos/sale/transaction/all")
      },
      showCustomer() {
        this.$refs.customerinfo.show();
      },
      addCustomer() {
        this.$emit("addcustomer")
        
      },
      drawerClick(){
        this.$emit("drawerclick")
      }
  },
  watch: {},
  data() {
    return {};
  }
};
</script>
<style scoped>
</style>