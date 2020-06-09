
<template>
  <v-container fluid>
        
    <ItemGridList 
    :model="itemGridScheme" 
    v-on:detail="itemDetail"
    size="12"
    display="item"
     />

       <ItemGridList 
    :model="categoryGridScheme" 
    v-on:detail="categroyClick"
     v-on:action="actionClick"
     :selected="selectedCarts"
    size="4"
     display="info"
     />
         
          <SaleItemDetail 
          v-on:addToCart="addToCart"
          ref="itemdetail" :scheme="itemGridScheme.detailData"  />
        <BarcodeScanner title="Scan item code"  v-on:change="changeItemCode" ref="barcodescanner" />
    
        </v-container>
</template>

<script>
import BarcodeScanner from "../Dialogue/BarcodeScanner";
import ItemGridList from "../../Components/List/ItemGridList";
import SaleItemDetail from "../../Components/Dialogue/SaleItemDetail";
import itemGridScheme from "../../model/ItemGridModel"
import categoryGridScheme from "../../model/CategoryGridModel"
export default {
  components:{
      ItemGridList:ItemGridList,
      SaleItemDetail:SaleItemDetail,
      BarcodeScanner:BarcodeScanner
  },
  computed:{
    itemGridScheme() {
      return {...itemGridScheme,query : this.extraQuery}
    },
    categoryGridScheme() {
      return categoryGridScheme
    },
    extraQuery() {
      if(this.selectedCategory){
       
        return {category: this.selectedCategory}
      }
      return null
    },
    selectedCarts(){
      return this.selectedCategory ? [this.selectedCategory] : []
    }
  },
  methods:{
    itemDetail(item){
     
      this.$refs.itemdetail.show(item)
    },
    actionClick(item){
      if(item.value == "scan"){
        this.$refs.barcodescanner.show();
      }
    },
    categroyClick(item){
    
      if(this.selectedCategory == item._id){
       this.selectedCategory = null
       return
      }
       this.selectedCategory = item._id
      
    },
    addToCart(params){
        this.$store.dispatch("posfrontend/addCartItem", params);
    },
    changeItemCode(params) {
        const _json = JSON.parse(params);
      
      if(_json.code){
        this.$emit("changeItemCode", _json.code);
      }
      else{
        alert("Invalid QR")
      }
     
    }
  },
  data: () => ({
    selectedCategory: null,
    
  })
};
</script>

<style scoped>

</style>