

<template>
  <v-row no-gutters>
    <v-col>
    
      <v-app-bar app clipped-right elevation="1">
        <v-app-bar-nav-icon @click.stop="drawerClick" />
        <v-toolbar-title v-if="isMobile"> <span >
            iPos&nbsp;
           
          </span></v-toolbar-title>
      <v-toolbar-title v-if="!isMobile"> <span class="title ml-3 mr-5">
            iPos&nbsp;
            <span class="font-weight-light">Cybernetics</span>
          </span></v-toolbar-title>
        <v-spacer />
       
           <CustomArrowButton class="mr-5" v-on:click="goCart" title="GO TO CART" color="secondary"  />
        
          <NotifyIcon v-on:click="notiShow = !notiShow" :model="notiModel" />
    
      </v-app-bar>

          <SocketIO v-if="socketModel" v-on:receive="receiveEvent" :model="socketModel"/>
    <NotiListView v-on:click="notiClick" :model="notiListModel" />
 
    </v-col>
     
  </v-row>
</template>

<script>
import { isMobile } from 'mobile-device-detect';
 import CustomArrowButton from "./CustomArrowButton"
import NotifyIcon from "./NotifyIcon";
import SocketIO from "./SocketIO";
import NotiListView from "./NotiListView";
import _ from "lodash";

export default {
  components: {
    NotifyIcon: NotifyIcon,
    SocketIO:SocketIO,
    NotiListView:NotiListView,
    CustomArrowButton:CustomArrowButton,

  },
  props: ["model"],
  created(){
    this.getNoties()
  },
  methods: {
    goCart(){
this.$router.push("/pos/front/user/cart");
    },
    async notiClick(params) {
      await this.$store.dispatch("pospublic/updateItem",{
        nocache: true,
        collection:"posnoti",
        id: params._id,
        checked: true
      })
      
      this.getNoties()
      this.$router.push("/pos/front/user/transactionstatus/orderStatus/" + params.id);
    },
    drawerClick() {
      this.$emit("drawerclick");
    },
    refresh: _.debounce(function() {
      this.getNoties();
    }, 500),
    receiveEvent(){
      this.refresh()
      //this.$store.dispatch("pospublic/addNotie", params.data)
    },
    async getNoties() {
      const _noties = await this.$store.dispatch("pospublic/getItems",{
        nocache: true,
        collection:"posnoti",
        page:1,
        pageSize: 5,
        sort:"-createdAt",
        query: {
          checked: false
        }
      })
 
      if(_noties.total > 0){
        this.notiItems = _noties
      } 
      
    }
  }, 

  computed: {
      isMobile(){
      return isMobile
    },
    notiListModel() {
      return {
        items: this.noties,
        show: this.notiShow,
        title: "Notifications"
      }
    },
    noties() {
      return this.notiItems.rows
    },
    loading() {
      return this.$store.state[this.model.store].loading;
    },
     customer(){
       return this.$store.state.pospublic.customer;
     },
    notiModel() {
      return {
        total: this.notiItems ? this.notiItems.total : 0
      };
    },
     socketModel(){
      return this.customer ? {
        events:[
          "order-" + this.customer._id
        ]
      } : null
    },
  },
  data: () => ({
    notiItems: [],
    items:[],
    notiShow: false
  })
};
</script>