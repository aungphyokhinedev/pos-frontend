
<template>
<div>
      <AlertPanel :model="alertModel" />
 <SaleTitleBar  v-on:drawerclick="drawerClick" :model="titleBarModel"/>
    <SideNavigator 
    v-on:changepassword="changePassword"
v-on:updateuser="updateUser"
     v-on:logout="logout" 
        v-on:click="sideClick"
    :model="sideNavigatorModel" />
<v-content>
   

      <v-container fluid>
    
       <SaleUserReportPanel 
       v-if="page == 'all'"
        v-on:changeItemCode="changeItemCode" ref="transactionpanel" />
        <OrderChecking v-if="page == 'checking'" />
        <SaleMapping v-if="page == 'mapping'" />
        </v-container>

    </v-content>

    </div>
</template>

<script>
import { isMobile } from 'mobile-device-detect';
import SideNavigator from "../Components/Common/SideNavigator.vue";
import SaleTitleBar from "../Components/Common/SaleTitleBar.vue";
import SaleUserReportPanel from "../Components/Panel/SaleUserReportPanel";
import sideNavigatorModel from "../model/Sale/SideNavigatorModel"
import passwordChangeModel from "../model/PasswordChangeModel"
import updateUserModel from "../model/Sale/UpdateUserModel"
import OrderChecking from "./OrderChecking"
import SaleMapping from "./SaleMapping"
import AlertPanel from "../Components/Panel/AlertPanel"
export default {
   components: {
    SaleTitleBar:SaleTitleBar,
   SaleUserReportPanel:SaleUserReportPanel,
   SideNavigator:SideNavigator,
   OrderChecking:OrderChecking,
   AlertPanel:AlertPanel,
   SaleMapping:SaleMapping
   },
   watch:{
   loginData(value){
      if(!value){
         this.$router.push("/pos/sale/login");
      }
    },
  },
   methods:{
     sideClick() {
          
     },
       async changePassword(params){
        if(params.newPassword == params.confirmPassword){
       
          const result = await this.$store.dispatch("posfrontend/changePassword",params)
          if(result.success){
            //const type = this.$store.getters['poslogin/type']
           // this.$router.push("/pos/login/" + type + "/" + result.message._id);
          }
          else{
            alert(result.message)
          }
        }
        
      },
      async updateUser(params) {
        await this.$store.dispatch("posfrontend/updateUser",params)
        await this.$store.dispatch("posfrontend/getUser");
      },
    logout(){
      this.$store.dispatch("possalelogin/logout")
    },
    drawerClick() {
      this.drawerOn = !this.drawerOn
    },
     showSaleItem(params){
       this.$refs.productpanel.itemDetail(params)
     },
     async changeItemCode(params){
       const _items = await this.$store.dispatch("posfrontend/getItemByCode",{
         collection: "positem",
         query:{
           itemCode:params
           }
       });
       if(_items && _items.total > 0){
          this.$refs.productpanel.itemDetail(_items.rows[0])
       }
      
     }
   },
   created() {
     this.$store.dispatch("posfrontend/getUser")
   },
   computed:{
     page() {
        return this.$route.params.page;
    },
      loginData() {
      return this.$store.state.possalelogin.data;
    },
    user() {

      return this.$store.state.posfrontend.user;
    },
    titleBarModel(){
      return {
        store: "posfrontend"
      }
    },
     sideNavigatorModel() {
      return {
        ...sideNavigatorModel, 
        show: this.drawerOn,
        data: this.user,
        passwordChangeModel,
        updateUserModel
        }
    }
   },
  data() {
    return {
       alertModel: {
      store: "posfrontend",
     
    },
     drawerOn: !isMobile,
    };
  }
};
</script>

<style scoped>
</style>