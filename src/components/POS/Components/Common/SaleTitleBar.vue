

<template>
<v-row no-gutters="">
  <v-col>
   
 <v-app-bar

      app
      clipped-right
     elevation=1
    > 
      <v-app-bar-nav-icon @click.stop="drawerClick" />
        <v-toolbar-title v-if="isMobile"> <span >
            iPos&nbsp;
           
          </span></v-toolbar-title>
      <v-toolbar-title v-if="!isMobile"> <span class="title ml-3 mr-5">
            iPos&nbsp;
            <span class="font-weight-light">Cybernetics</span>
          </span></v-toolbar-title>
          <SocketIO v-if="socketModel" v-on:receive="receiveEvent" :model="socketModel"/>
          
      <v-spacer />
       <CustomArrowButton class="mr-5" v-on:click="goSale" title="GO TO SALE" color="secondary"  />
     <NotifyIcon v-on:click="notiShow = !notiShow"  :model="notiModel" />
  
    </v-app-bar>
    
       
          <NotiListView v-on:click="notiClick" :model="notiListModel" />
    
   
  </v-col>
     </v-row>
</template>
  
<script>
import { isMobile } from 'mobile-device-detect';
import CustomArrowButton from "./CustomArrowButton"
import NotiListView from "./NotiListView";
import NotifyIcon from "./NotifyIcon"
import SocketIO from "./SocketIO";
import _ from "lodash";
export default {
  components: {
    SocketIO:SocketIO,
    NotifyIcon:NotifyIcon,
    NotiListView:NotiListView,
    CustomArrowButton:CustomArrowButton
  },
    props:["model"],
    created(){
      this.getNoties()
    },
    
    methods: {
      goSale(){
this.$router.push("/pos/sale");
      },
      async notiClick(params) {
    
      await this.$store.dispatch("posfrontend/updateItem",{
        nocache: true,
        collection:"posnoti",
        id: params._id,
        checked: true,
       
      })
      await this.getNoties()
      this.$router.push("/pos/sale/transaction/checking/orderDetailCheck/" + params.id);
      
    },
   refresh: _.debounce(function() {
      this.getNoties();
    }, 500),
    receiveEvent(){
      this.refresh()
      //this.$store.dispatch("pospublic/addNotie", params.data)
    },
    async getNoties() {
      const _noties = await this.$store.dispatch("posfrontend/getItems",{
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
      
    },
    drawerClick(){
      this.$emit("drawerclick")
    },
  },
  computed: {
     notiListModel() {
      return {
        items: this.noties,
        show: this.notiShow,
        title: "Notifications"
      }
    },
     isMobile(){
      return isMobile
    },
    noties() {
      return this.notiItems.rows
    },
    notiModel() {
      return {
         total: this.notiItems ? this.notiItems.total : 0
      }
    },
    user() {
      return this.$store.state.posfrontend.user;
    },
    socketModel(){
      return this.user ? {
        events:[
          "order-" + this.user.shop
        ]
      } : null
    },
    loading() {
      return this.$store.state[this.model.store].loading;
    },
  },
    data: () => ({
        notiItems: [],
        items:[],
        notiShow: false
     
    }),
  }
</script>