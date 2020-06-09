

<template>
  <div>
      <v-toolbar dense=""    elevation="0">
        <v-btn @click="goHome"   fab icon>
        <v-icon small="">mdi-home-variant</v-icon>
      </v-btn>
          <v-toolbar-title >
        <span class="title mr-5">
          iPos&nbsp;
          <span class="font-weight-light">Cybernetics</span>
        </span>
      </v-toolbar-title>
        
     
    
      <v-spacer />
   
   <NotifyIcon v-if="false" class="ml-3" v-on:click="notiShow = !notiShow" :model="notiModel" />
     
      
    </v-toolbar>
    <v-toolbar 
    v-if="loginData || cartItems.length > 0"  dense=""  elevation="0">
      

  
      <v-spacer />
       <CustomCartCount class="ml-5 mr-3 mb-1"/>
  <v-btn class="mr-1" v-if="loginData" small="" @click="showDialogue"    icon>
        <v-icon small="">mdi-account</v-icon>
      </v-btn>
     

    </v-toolbar>
    
    <SocketIO v-if="socketModel" v-on:receive="receiveEvent" :model="socketModel" />
    <NotiListView v-on:click="notiClick" :model="notiListModel" />
    <SideNavigatorDialogue
      v-on:updateuser="updateUserForm"
      v-on:changepassword="changePasswordForm"
      v-on:logout="logout"
      ref="userdialogue"
    />
    <EntryForm
      :title="passwordChangeModel.title"
      :subtitle="passwordChangeModel.subtitle"
      :items="passwordChangeModel.items"
      v-on:save="changePassword"
      ref="changepasswordform"
    />
    <EntryForm
      :title="updateUserModel.title"
      :subtitle="updateUserModel.subtitle"
      :items="updateUserModel.items"
      v-on:save="updateUser"
      ref="updateuserform"
    />
  </div>
</template>

<script>
import CustomCartCount from "./CustomCartCount"
import SideNavigatorDialogue from "./SideNavigatorDialogue";
import EntryForm from "../Dialogue/EntryForm";
import { isMobile } from "mobile-device-detect";

import NotifyIcon from "./NotifyIcon";
import SocketIO from "./SocketIO";
import NotiListView from "./NotiListView";
import passwordChangeModel from "../../model/PasswordChangeModel";
import updateUserModel from "../../model/UpdateUserModel";
import sideNavigatorModel from "../../model/Customer/SideNavigatorModel";
import _ from "lodash";
export default {
  components: {
    NotifyIcon: NotifyIcon,
    SocketIO: SocketIO,
    NotiListView: NotiListView,
    CustomCartCount: CustomCartCount,
    SideNavigatorDialogue: SideNavigatorDialogue,
    EntryForm: EntryForm
  },
  props: ["model"],
  created() {
    this.getNoties();
  },
  methods: {
    changePassword(params) {
      this.$emit("changepassword", params);
    },
    updateUser(params) {
      this.$emit("updateuser", params);
    },
    updateUserForm() {
      this.$refs.updateuserform.edit(this.dialogueModel.data);
    },
    changePasswordForm() {
      this.$refs.changepasswordform.show();
    },

    logout() {
      this.$emit("logout");
    },
    showDialogue() {
      this.$emit("click");

      this.$refs.userdialogue.show(this.dialogueModel);
    },
    goHome(){
        this.$router.push("/pos/front/user/shop");
    },
    goCart() {
      this.$router.push("/pos/front/user/cart");
    },
    async notiClick(params) {
      await this.$store.dispatch("pospublic/updateItem", {
        nocache: true,
        collection: "posnoti",
        id: params._id,
        checked: true
      });

      this.getNoties();
      this.$router.push(
        "/pos/front/user/transactionstatus/orderStatus/" + params.id
      );
    },

    refresh: _.debounce(function() {
      this.getNoties();
    }, 500),
    receiveEvent() {
      this.refresh();
      //this.$store.dispatch("pospublic/addNotie", params.data)
    },
    async getNoties() {
      const _noties = await this.$store.dispatch("pospublic/getItems", {
        nocache: true,
        collection: "posnoti",
        page: 1,
        pageSize: 5,
        sort: "-createdAt",
        query: {
          checked: false
        }
      });

      if (_noties.total > 0) {
        this.notiItems = _noties;
      }
    }
  },

  computed: {
    cartItems() {
      let _collection = this.$store.getters["pospublic/getCollection"]
      return _collection("cartItems") || []
    },
     loginData() {
      return this.$store.state.poslogin.data;
    },
    account() {
      return this.$store.state.pospublic.account;
    },
    dialogueModel() {
      return {
        ...sideNavigatorModel,
        data: { ...this.account, customerId: this.customer.customerId }
      };
    },
    passwordChangeModel() {
      return passwordChangeModel;
    },
    updateUserModel() {
      return updateUserModel;
    },
    isMobile() {
      return isMobile;
    },
    notiListModel() {
      return {
        items: this.noties,
        show: this.notiShow,
        title: "Notifications"
      };
    },
    noties() {
      return this.notiItems.rows;
    },
    loading() {
      return this.$store.state[this.model.store].loading;
    },
    customer() {
      return this.$store.state.pospublic.customer;
    },
    notiModel() {
      return {
        total: this.notiItems ? this.notiItems.total : 0
      };
    },
    socketModel() {
      return this.customer
        ? {
            events: ["order-" + this.customer._id]
          }
        : null;
    }
  },
  data: () => ({
    notiItems: [],
    items: [],
    notiShow: false
  })
};
</script>