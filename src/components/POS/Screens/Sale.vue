
<template>
<div> 
    <AlertPanel :model="alertModel" />
<SaleNavigationDrawer 
v-on:logout="logout" 
v-on:click="sideClick" 
:model="navigationDrawerModel" />
  <v-row 
   no-gutters dense>
  

    <v-col cols="8" class="d-none d-md-block pl-3 ml-12">
       <WorkSpaceTitleBar v-on:drawerclick="drawerShow"/>
       
      <v-flex class="pa-3">

       <ProductPanel v-on:changeItemCode="changeItemCode" ref="productpanel" />
      </v-flex> 
    </v-col>
     <v-col  no-gutters class="d-none d-md-block pr-3" >
    <SalePanel display="table" v-on:changeItemCode="changeItemCode" v-on:showItem="showSaleItem"/>
     
    </v-col>
    <v-col  no-gutters class="d-md-none d-lg-none d-xl-none pl-3 pr-3" >
    <SalePanel v-on:drawerclick="drawerClick" display="list" v-on:changeItemCode="changeItemCode" v-on:showItem="showSaleItem"/>
     
    </v-col>
    
  </v-row>

    </div>
</template>

<script>
import SaleNavigationDrawer from "../Components/Common/SaleNavigationDrawer" 
import WorkSpaceTitleBar from "../Components/Common/WorkSpaceTitleBar.vue";
import ProductPanel from "../Components/Panel/ProductPanel";
import SalePanel from "../Components/Panel/SalePanel.vue";
import AlertPanel from "../Components/Panel/AlertPanel"
import { isMobile } from 'mobile-device-detect';
import sideNavigatorModel from "../model/Sale/SideNavigatorModel"
export default {
   components: {
    WorkSpaceTitleBar:WorkSpaceTitleBar,
    ProductPanel:ProductPanel,
    SalePanel:SalePanel,
   SaleNavigationDrawer:SaleNavigationDrawer,
   AlertPanel:AlertPanel
   },
    created() {
     this.$store.dispatch("posfrontend/getUser")
     this.$store.dispatch("posfrontend/getShop")
   },
  watch:{
   loginData(value){
      if(!value){
         this.$router.push("/pos/sale/login");
      }
    },
  },
  
   computed:{

      sideDrawerShow(){
        return this.drawerShow
      },
      user() {
      return this.$store.state.posfrontend.user;
    },
    loginData() {
      return this.$store.state.possalelogin.data;
    },
     navigationDrawerModel(){
        return {
        ...sideNavigatorModel, 
        show: this.drawerShow,
        data: this.user,
        mini: true,
        }

     
     }
   },
   methods:{
     sideClick() {
       this.drawerShow = false || !isMobile
     },
     drawerClick(){
       this.drawerShow = true
       this.mini = false
     },
     showSaleItem(params){
       this.$refs.productpanel.itemDetail(params)
     },
     logout(){
       this.$store.dispatch("possalelogin/logout")
     },
     async changeItemCode(params){
       const _items = await this.$store.dispatch("posfrontend/getItemByCode",{
         collection: "positem",
         populate:["discount"],
         query:{
           itemCode:params
           }
       });
       if(_items.total > 0){
         
          this.$refs.productpanel.itemDetail(_items.rows[0])
       }
      
     }
   },
  data() {
    return {
      alertModel: {
      store: "posfrontend"
    },
     drawerMini: true,
     drawerShow: !isMobile,
    };
  }
};
</script>

<style scoped>
</style>