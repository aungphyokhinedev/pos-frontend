

<template>
<div>
     <SocketIO v-if="socketModel" v-on:receive="receiveEvent" :model="socketModel"/>
      <NotifyIcon v-on:click="notiShow = !notiShow"  :model="notiModel" />
   <NotiListView v-on:click="notiClick" :model="notiListModel" />
</div>
</template>
  
<script>
import { isMobile } from 'mobile-device-detect';
import NotiListView from "./NotiListView";
import NotifyIcon from "./NotifyIcon"
import SocketIO from "./SocketIO";
import _ from "lodash";
export default {
  components: {
    SocketIO:SocketIO,
    NotifyIcon:NotifyIcon,
    NotiListView:NotiListView,
  },
    props:["model"],
    created(){
      this.getNoties()
    },
    
    methods: {
      async notiClick(params) {
    
      await this.$store.dispatch(this.model.store + "/updateItem",{
        nocache: true,
        collection: this.model.collection, //"posnoti",
        id: params._id,
        checked: true,
       
      })
      await this.getNoties()
      this.$emit("noticlick",params.id)
      //this.$router.push("/pos/sale/transaction/checking/orderDetailCheck/" + params.id);
      
    },
   refresh: _.debounce(function() {
      this.getNoties();
    }, 500),
    receiveEvent(){
      this.refresh()
      //this.$store.dispatch("pospublic/addNotie", params.data)
    },
    async getNoties() {
      const _noties = await this.$store.dispatch(this.model.store + "/getItems",{
        nocache: true,
        collection:this.model.collection,
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
    socketModel(){
      return this.user ? {
        events: this.model.events ///[ "order-" + this.user.shop ]
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