

<template>
  <v-app id="inspire">
    <LoadingBar v-if="!ready" />
  
    <div v-if="ready">
  
      <AlertPanel :model="alertModel" />
      <AlertDialogue v-if="!owner" v-on:ok="showOwnerEntry" :model="addBusinessInfo" />
      <EntryForm
        ref="ownerentry"
        :title="ownerModel.formData.title"
        :subtitle="ownerModel.formData.subtitle"
        :items="ownerModel.formData.items"
        v-on:save="saveData"
        v-on:close="closeOwnerForm"
      />
      <div v-if="owner ">
        <HomeTitleBar v-on:drawerclick="drawerClick" :model="titleBarModel" />

        <SideNavigator 
        v-on:changepassword="changePassword"
v-on:updateuser="updateUser"
        v-on:logout="logout" 
        v-on:click="sideClick" :model="sideBarModel" />

        <v-content class="align-start" style="height:100%;">
          <v-container fluid>
           
            <AdminHome 
            v-if="page == 'entry'"
            v-on:edituser="showOwnerEntry" 
            :model="alertModel" />
            <Mapping v-if="page=='mapping'" />

            <SummaryPanel  v-if="page == 'summary'" />
            <ProductSetup v-if="page == 'productsetup'" />
          </v-container>
        </v-content>

        <div style="position:fixed; right:20px; bottom:20px;">
          <v-btn color="primary" fab dark>
            <v-icon>mdi-help</v-icon>
          </v-btn>
        </div> 
      </div>
    
    </div>
  </v-app>
</template>

<script>
import SummaryPanel from "../Components/Panel/SummaryPanel";
import Mapping from "./Mapping"
import AlertDialogue from "../Components/Dialogue/AlertDialogue";
import EntryForm from "../Components/Dialogue/EntryForm.vue";
import ownerModel from "../model/OwnerModel";
import sideNavigatorModel from "../model/Admin/SideNavigatorModel";
import SideNavigator from "../Components/Common/SideNavigator.vue";
import HomeTitleBar from "../Components/Common/HomeTitleBar.vue";
import AdminHome from "../Components/Panel/AdminHome";
import AlertPanel from "../Components/Panel/AlertPanel";
import LoadingBar from "../Components/Common/LoadingBar";
import { isMobile } from 'mobile-device-detect';
import passwordChangeModel from "../model/PasswordChangeModel"
import updateUserModel from "../model/UpdateUserModel"
import ProductSetup from "../Components/Panel/ProductSetup"
export default {
  components: {
    Mapping,
    SideNavigator,
    HomeTitleBar,
    AdminHome,
    AlertPanel,
    AlertDialogue,
    EntryForm,
    LoadingBar,
    SummaryPanel,
    ProductSetup
  },
  async created() {
    if(!this.login){
      this.$router.push("/pos/login/owner");
    }
    await this.$store.dispatch("posadmin/clearState");
    await this.$store.dispatch("posadmin/clearItems");
    await this.$store.dispatch("posadmin/clearUser");
    await this.$store.dispatch("posadmin/getAccount");
    await this.$store.dispatch("posadmin/getOwner");
    this.ready = true;
  
  },
  watch: {
    login(value){
      if(!value){
         this.$router.push("/pos/login/owner");
      }
    }
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
        await this.$store.dispatch("posadmin/getAccount");
      },
    logout() {
      this.$store.dispatch("poslogin/logout");
    },
    sideClick(){
      this.drawerOn = isMobile ? false : this.drawerOn
    },
    drawerClick() {
      this.drawerOn = !this.drawerOn
    },
    closeOwnerForm() {
      this.addBusinessInfo.show = !this.owner;
    },
    showOwnerEntry() {
      if (!this.owner) {
        this.$refs.ownerentry.show();
      } else {
        this.$refs.ownerentry.edit(this.owner);
      }
    },
    async saveData(value) {
      if (!value._id) {
        await this.$store.dispatch("posadmin/addOwner", value);
      } else {
        await this.$store.dispatch("posadmin/updateOwner", value);
      }
      this.$store.dispatch("posadmin/getOwner");
    },
    async setUpCurrency(){
       const currencies = [
         {name:"Myanmar Kyat",code:"MMK",sign:"K"},
         {name:"US Dollar",code:"USD",sign:"$"},
         {name:"Singapore Dollar",code:"SGD",sign:"S$"},
         ]
        for(let cur of currencies){
          await this.$store.dispatch("posadmin/addItem", {
            collection:"poscurrency",
            ...cur
          });
        }
       
    }
  },
  computed: {
    login(){
      return  this.$store.getters['poslogin/login'];
    },
    page() {
        return this.$route.params.page;
    },
 
    titleBarModel(){
      return {
        store: "posadmin"
      }
    },
    ownerModel() {
      return ownerModel;
    },
    owner() {
      return this.$store.state.posadmin.owner;
    },
    account() {
      return this.$store.state.posadmin.account;
    },
    sideBarModel() {
      return {
        ...sideNavigatorModel,
       show: this.drawerOn,
        data: this.account,
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
    ready: false,
    alertModel: {
      store: "posadmin"
    },
    addBusinessInfo: {
      persistent: true,
      show: true,
      title: "Create Business Info",
      subtitle:
        "Firstly you need to add your business information to use the system. Please add owner's business information and then create a new shop to sell your goods and services.",
      type: "info",
      actions: {
        ok: {
          name: "Continue"
        }
      }
    }
  })
};
</script>