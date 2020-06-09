

<template> 
  <v-app   id="inspire">
 <div >
  
    <UserTitleBar v-if="!simpleUI" v-on:drawerclick="drawerClick" :model="titleBarModel"/>
    <SideNavigator 

    v-if="customer && !simpleUI"
    v-on:changepassword="changePassword"
v-on:updateuser="updateUser"
        v-on:logout="logout" 
        v-on:click="sideClick" :model="sideNavigatorModel" />
  <AlertPanel :model="alertModel" />

    <v-content class="align-start" style="height:100%;" >
  
      <v-container v-if="ready" fluid>

        <AlertDialogue  v-if="!customer" v-on:ok="showCustomerEntry" :model="addUserInfo" />
   
      <EntryForm  ref="customerentry"
            :title="customerModel.formData.title"
            :subtitle="customerModel.formData.subtitle"
            :items="customerModel.formData.items"
            v-on:save="saveCustomer"
             v-on:close="closeCustomerForm" />
             <div  v-if="customer">
       <UserHomePanel v-if="page=='shop'"  />
       <UserOrderPanel v-if="page=='order'" />
        <UserTransactionPanel  v-if="page=='transaction'"/>
            <v-row   v-if="page=='cart'"
   no-gutters dense>
     <v-col  no-gutters class="d-none d-md-block pr-3" >
    <UserCartPanel display="table" />
     
    </v-col>
    <v-col  no-gutters class="d-md-none d-lg-none d-xl-none" >
    <UserCartPanel display="list" />
     
    </v-col>
    
  </v-row>
<UserDirectOrderPanel
 v-on:changepassword="changePassword"
   v-on:updateuser="updateUser"
    v-on:logout="logout"
 v-if="page=='do'" />
  <UserTransactionStatus :key="scheme" v-if="page=='transactionstatus'" />
<UserMapping v-if="page=='mapping'" />
       </div>
      </v-container>

    </v-content>

 </div>
  </v-app>
</template>

<script>
import SideNavigator from "../Components/Common/SideNavigator.vue";
import EntryForm from "../Components/Dialogue/EntryForm";
import AlertDialogue from "../Components/Dialogue/AlertDialogue";
import UserTitleBar from "../Components/Common/UserTitleBar";
import UserHomePanel from "../Components/Panel/UserHomePanel";
import UserOrderPanel from "../Components/Panel/UserOrderPanel";
import UserDirectOrderPanel from "../Components/Panel/UserDirectOrderPanel"
import UserCartPanel from "../Components/Panel/UserCartPanel";
import UserTransactionStatus from "./UserTransactionStatus";
import UserMapping from "./UserMapping";


import UserTransactionPanel from "../Components/Panel/UserTransactionPanel";
import { isMobile } from 'mobile-device-detect';
import AlertPanel from "../Components/Panel/AlertPanel";
import customerModel from "../model/CustomerModel";
import sideNavigatorModel from "../model/Customer/SideNavigatorModel"
import passwordChangeModel from "../model/PasswordChangeModel"
import updateUserModel from "../model/UpdateUserModel"
export default {
  components: {
    UserTitleBar: UserTitleBar,
    AlertPanel:AlertPanel,
    SideNavigator:SideNavigator,
    UserHomePanel:UserHomePanel,
    EntryForm:EntryForm,
    AlertDialogue:AlertDialogue,
    UserOrderPanel:UserOrderPanel,
    UserDirectOrderPanel:UserDirectOrderPanel,
    UserCartPanel:UserCartPanel,
    UserTransactionPanel:UserTransactionPanel,
    UserTransactionStatus:UserTransactionStatus,
    UserMapping:UserMapping
  },
  async created() {
    if(!this.loginData){ 
      const _url = this.$router.currentRoute.path
     
      await this.$store.dispatch("poslogin/setReturnUrl", _url)
      this.$router.push("/pos/login/user")
    }
    else{ 
     
      await this.$store.dispatch("poslogin/setReturnUrl", null)
      await this.$store.dispatch("pospublic/clearState");
      await this.$store.dispatch("pospublic/clearUser");
      await this.$store.dispatch("pospublic/getAccount");
      await this.$store.dispatch("pospublic/getCustomer");
      this.ready = true
    }
    
   
    
  },
  watch: {
    loginData(value){
      if(!value){
         this.$router.push("/pos/login/user");
      }
    },
   
  },
  methods: {
      async changePassword(params){
        if(params.newPassword == params.confirmPassword){
       
          const result = await this.$store.dispatch("poslogin/changePassword",params)
          if(result.success){
            const type = this.$store.getters['poslogin/type']
            this.$router.push("/pos/login/" + type + "/" + result.message._id);
          }
          else{
            alert(result.message)
          }
        }
        
      },
      async updateUser(params) {

        await this.$store.dispatch("poslogin/updateAccount",params)
        await this.$store.dispatch("pospublic/getAccount");
      },
    logout() {
     
      this.$store.dispatch("poslogin/logout");
       this.$store.dispatch("pospublic/clearAll");
    },
     sideClick(){
      this.drawerOn = isMobile ? false : this.drawerOn
    },
     drawerClick() {
      this.drawerOn = !this.drawerOn
    },
    async saveCustomer(params){
      if (!params._id) {
        params.customerId = Date.now()
        await this.$store.dispatch("pospublic/addCustomer", params);
      } else {
        await this.$store.dispatch("pospublic/updateCustomer", params);
      }
      this.$store.dispatch("pospublic/getCustomer");
    },
    closeCustomerForm(){
      this.addUserInfo.show =  !this.customer;
    },
    showCustomerEntry() {
      this.$refs.customerentry.show();
    }
  },
  computed: {
    loginData() {
      return this.$store.state.poslogin.data;
    },
     titleBarModel(){
      return {
        store: "pospublic"
      }
    },
    simpleUI(){
      if(this.page == "do"){
        return true
      }
      return false
    },
    page() {
        return this.$route.params.page;
    },
    scheme() {
        return this.$route.params.scheme;
    },
    customerModel(){
      return customerModel;
    },
    alertModel(){
     return{store:"pospublic"} 
     },
     customer(){
       return this.$store.state.pospublic.customer;
     },
     account(){
       return this.$store.state.pospublic.account;
     },
     sideNavigatorModel() {
      return {
        ...sideNavigatorModel, 
        show: this.drawerOn,
        data: {...this.account,customerId: this.customer.customerId},
        passwordChangeModel,
        updateUserModel
        }
    }
  },
  props: {
    source: String
  },
  data: () => ({
     drawerOn: !isMobile,
    ready:false,
    addUserInfo:{
      persistent: true,
      show:true,
      title:'Create User Info',
      subtitle:"Firstly you need to add your personal information to use the system. Please add your contact information correctly for later use.",
      type:'info',
      actions:{
        ok:{
          name:"Continue",
        }
      }
    }
  })
};
</script>