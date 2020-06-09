

<template>
  <div >

    <v-row  no-gutters>
      <v-col>
     
        <CustomMapView
        v-if="searchType == 'map'"
          class="mb-2"
          value="location"
          v-on:change="changeLocation"
          :height="mapHeight"
           block
          :model="mapModel"
        />
        <v-row  no-gutters="" v-if="searchType == 'shop'" class="align-center">
          <v-col>
        <custom-autocomplete
        
        :loading="loading"
        :items="[]"
        :search-input.sync="search"
        hide-no-data
        hide-details
        solo-inverted
        flat
        label="Find shop by name?"
        collection="posshop"
        store="pospublic"
        :findBy="['name']"
        v-on:change="showShop"
 
      />
      </v-col>
      <v-btn v-if="total > 0" @click="scanShop"
         dark class=" ml-3 primary" small="" fab icon outlined="">
        <v-icon  small="">mdi-camera</v-icon>
      </v-btn>
      </v-row>
      <v-row v-if="searchType == 'map'" class="d-flex justify-space-between" no-gutters="">
      <div>
      <v-btn color="primary" text>Search in {{this.distance}} km</v-btn>
  <v-btn @click="distance--" :disabled="distance <= 1" color="primary" class="mt-1 mr-2" small icon>
    <v-icon>
      mdi-chevron-down
    </v-icon>
  </v-btn>
     <v-btn @click="distance++" :disabled="distance >= 5" color="primary" class="mt-1" small icon>
    <v-icon>
      mdi-chevron-up
    </v-icon>
  </v-btn>
     </div>
    
     <div>
           <v-btn color="primary" v-if="total == 0" text>No item</v-btn>
      <v-btn color="primary" v-if="total > 0" text>{{total}} Items</v-btn>
     </div>
        </v-row>

          <div  v-if="total == 0 && searchType == 'shop'" class="d-flex align-center mt-12 flex-column">
      <v-icon x-large="">mdi-home-variant</v-icon>
     <div class="text-center  mt-3 overline ">No near shop is found.</div>
     <div class="text-center mb-2 mt-1 overline ">You can find shop by moving map or type shop name or scan shop's QR.</div>
     <v-btn @click="scanShop" color="primary" outlined>
       Scan shop QR
     </v-btn>
    </div>

      <CustomItemList 
      v-on:detail="shopDeatil"
      v-on:action="goToShop"
      class="mt-2 mb-0"  :model="mapItemsModel" />
      <v-divider v-if="total > 0"  v-intersect="onEnd"/>
      <v-flex  v-intersect="onEnd" class="text-center">
        <v-btn class="mt-5" color="primary" v-if="hasNext" @click="nextPage" text>
          More Items
        </v-btn>
      </v-flex>
      
      </v-col>
    </v-row>
<BottomFixedButton v-if="searchType == 'shop'" v-on:click="searchBy('map')" icon="mdi-map" />
<BottomFixedButton v-if="searchType == 'map'" v-on:click="searchBy('shop')" icon="mdi-home-variant" />
  <AddOrderDialogue ref="addcart" />
  <BarcodeScanner key="pdcan" v-on:change="changeQr" ref="shopcodescanner"   title="Scan shop code" />
  <ShopDeatilDialogue v-on:order="orderItem" ref="shopdialogue" />
  </div>
</template>
 
<script>
import _ from "lodash";
import BarcodeScanner from "../Dialogue/BarcodeScanner";
import ShopDeatilDialogue from "../Dialogue/ShopDetailDialogue";
import CustomAutocomplete from "../Common/CustomAutoComplete";
import CustomMapView from "../../Components/Common/CustomMapView";
import CustomItemList from "../../Components/Common/CustomItemList";
import BottomFixedButton from "../../Components/Common/BottomFixedButton"
import AddOrderDialogue from "../Dialogue/AddOrderDialogue";
export default {
  components: {
    CustomMapView: CustomMapView,
    CustomItemList:CustomItemList,
    BottomFixedButton:BottomFixedButton,
    CustomAutocomplete:CustomAutocomplete,
    ShopDeatilDialogue:ShopDeatilDialogue,
    BarcodeScanner:BarcodeScanner,
    AddOrderDialogue
  },
  watch:{
    distance(value){
      this.coverage = value * 1000;
      this.changeLocation(this.location)
    }
  },
  computed: {
    mapHeight() {
      if(this.total == 0 ){
        return window.innerHeight - 150;
      }
    
      return null;
    },
    mapItemsModel() {
      return {
        key:"_id",
        title:"name",
        subtitle:"address",
        logo:"logo",
        icon:"mdi-home-variant-outline",
        items:this.storeItems
      }
    },
    mapModel(){
      return {
        markers:this.markers || [], 
        selected: this.selectedShop,
        current: {position:this.location?{
          lat: this.location.value.coordinates[1],
          lng: this.location.value.coordinates[0],
        }:null,coverage: this.coverage}
        }
    },
    markers(){
     
      return this.storeItems.map(item=>{ 
        if(item)
        return {
          key:item._id,
         label: item.description,
          position:
          {lat:item.location.coordinates[1],lng:item.location.coordinates[0]}}
        })
    },
    loading() {
      return  this.$store.state.pospublic.loading
    },
    hasNext() {
      return this.storeData ? this.storeData.hasNext : false
    },
    total() {
      return this.storeData ? this.storeData.rows.length : 0
    },
    page() {
      return this.storeData ? this.storeData.page : 1
    },
    storeItems() {
      return this.storeData ? this.storeData.rows : []
    },
    query() {
      return {
        collection: "posshop",
        page:1,
        nocache: true,
        pageSize:this.size,
        query: {
          location: {
            $near: {
              $geometry: {
                type: "Point",
                coordinates: this.location.value.coordinates
              },
              $maxDistance: this.coverage
            }
          }
        }
      }
    }
  },
  created() {
 
     //this.$store.dispatch("pospublic/clearItems")
  },
  props: {},
  data: () => ({
    showSlider: false,
    distance: 1,
    selectedShop: null,
    location: null,
    size: 5,
    coverage: 1000,
    storeData: null,
    searchType: 'map',
     search: null,
    
  }),
  methods: {
    scanShop() {
      this.$refs.shopcodescanner.show("Shop QR Scanner");
    },
    changeQr(params){
      const _json = JSON.parse(params)
      if(_json.sid){
        this.changeShopCode(_json);
      }
      else if(_json.pid){
        this.addToCart(_json)
      }
      else if(_json.saleid && _json.invno){
        this.claimInvoice(_json)
      }
    },
    async claimInvoice(params) {
      const _result = await this.$store.dispatch("pospublic/claimInvoice", 
       {
         id:params.saleid,
         invoiceNumber:params.invno
       });
       if(_result){
         alert("Invoice claiming success")
       }
       else{
         alert("Invoice claiming fail")
       }
   
    },
    addToCart(params) {
     
      this.$refs.addcart.show({
        id: params.pid,
      });
    },

    
    async changeShopCode(params){
     

      if(params.sid){
        const _result = await this.$store.dispatch("pospublic/findItems", 
       {
         collection: "posshop",
          page:1,
          pageSize:1,
          nocache: true,
          query:{
            _id: params.sid
          }
       });
   
       if(_result.rows.length > 0){
       
         this.goToShop(_result.rows[0]);
       }
      }
       else{
         alert("Invalid QR")
       }

    },
    showShop(params){

        this.goToShop(params.value)
      
       
      //  this.$router.push("/pos/front/user/order/" + params.value._id);
    },
    searchBy(params) {
      this.searchType = params
    },
    orderItem(params){
      this.$router.push("/pos/front/user/order/" + params._id);
    },
    goToShop(shop) {
     if(shop){
       this.$refs.shopdialogue.show({
        _id:shop._id,
        title:shop.name,
        subtitle:shop.description,
        logo:shop.logo,
        content: "<div>" + shop.address +"</div>"
        +"<div>" + shop.mobile +"</div>"
      });
     }
      
     // alert(JSON.stringify(shop))
     // this.$router.push("/pos/front/user/order/" + shop._id);
    },
    shopDeatil(shop) {
      this.selectedShop = {...shop}
     
    },
    nextPage: _.debounce(function() {
      
      this.fetchNextPage();
    }, 500),
    async fetchNextPage(){
      let _query = {...this.query, page: this.page + 1}
            const _result = await this.$store.dispatch("pospublic/findItems", 
            _query);
            let _newData = {...this.storeData,hasNext:_result.hasNext,page:_result.page}
            let _newItems = [...this.storeData.rows].concat(_result.rows)
            _newData.rows = _newItems
            this.storeData = _newData
    },
    async onEnd (entries) {
        if(entries[0].isIntersecting){
        
          if(this.hasNext && this.location){

            this.nextPage()

          }
        }
    },
    async changeMap(params) {
      this.location = params;
      this.selectedShop = null;
      this.storeData = await this.$store.dispatch("pospublic/findItems", 
      this.query);
      
    },
    changeLocation: _.debounce(function(params) {
      
      this.changeMap(params);
    }, 200)
  }
};
</script>
<style >
.slider .v-messages{
  display: none !important;
}
.slider .v-input__slot{
  margin-bottom: 0;
}
</style>