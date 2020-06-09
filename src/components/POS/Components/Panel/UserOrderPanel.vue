

<template>
  <div >

    <v-row no-gutters>
      <v-col cols="12">
          <OrderItemList :model="currentListModel" />
       
      </v-col>
    </v-row>

  </div>
</template>

<script>

import customerShopItemListModel from "../../model/Customer/CustomerShopItemListModel"
import OrderItemList from "../../Components/List/OrderItemList";
export default {
  components: {
      OrderItemList:OrderItemList
  },
  watch:{
  },
  computed: {
    shop() {
        return this.$route.params.scheme;
    },
    currentListModel() {
       
        let _model = {...customerShopItemListModel }
        if(this.shop){
            _model.query = {shop:this.shop,disable:false}
            _model.public = true;
        }
        
        return _model;
    },
   
  },
  created() {
 
    // this.$store.dispatch("pospublic/clearItems")
  },
  props: {},
  data: () => ({
  }),
  methods: {
  }
};
</script>