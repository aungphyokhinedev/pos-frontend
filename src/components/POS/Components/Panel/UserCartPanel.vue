
<template>
  <v-flex>
    <div style="height:400px" class="d-flex align-center justify-center" v-if="emptyCart">
   <v-row style="max-width:180px">
    <v-col class="text-center">
    <img v-if="false" src="@/assets/emptybox.png" width="100px" />
    <div class="d-flex align-center flex-column">
      <v-icon x-large="">mdi-basket-outline</v-icon>
     <div class="text-center mb-2 mt-3 overline ">Your Cart is Empty</div>
     <v-btn @click="goHome" color="primary" outlined>
       Make new order
     </v-btn>
    </div>
       </v-col>
         </v-row>
    </div>
  
  <AlertDialogue  v-if="emptyCart && false" v-on:ok="goBack" :model="emptyCartInfo" />
<div v-if="!emptyCart" >

 <v-tabs

 v-model="tab"
    
    >
      <v-tab
        v-for="(item,index) in cart"
        :key="item._id"
      >
       Order {{ index + 1 }} <v-icon>mdi-chevron-right</v-icon>
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="item in cart"
        :key="item._id"
      >
        <v-card flat>
          <v-card-text class="font-weight-bold subtitle-1">
            <v-row>
            <span class="ml-3">{{ item.shop.name }}</span> <v-spacer/>
            <v-btn @click="removeOrder(item.shop)" small icon fab><v-icon >mdi-delete-circle</v-icon></v-btn>
            </v-row>
           
            </v-card-text>

         
  <v-flex>
       
 <v-row v-if="selected.length > 0">
        <v-col>
          <v-btn
            @click="removeItems"
            color="primary"
            dark
            
            small
            text
          >remove selected item[s] from cart</v-btn>
        </v-col>
 </v-row>
    <CustomDataTable
         v-if="showData"
          :model="cartModel"
           selectable="true"
           v-on:edit="editItem"
           :display="display"
           v-on:select="selectChange"
         />
    

      <SaleSummary :model="summaryModel" />
 
    </v-flex>
         
        </v-card>
      </v-tab-item>
    </v-tabs-items>
   <div class="text-center" style="max-width:600px;" >
      <v-row no-gutters>
        <v-col   class="d-flex justify-center mb-6">
          <v-btn @click="goBack"  tile large block>CANCEL</v-btn>
        </v-col >
         <v-col v-if="total == 0"  class="d-flex justify-center mb-6">
          <v-btn @click="goToHome" tile large block color="primary" dark>add new item</v-btn>
        </v-col>
        <v-col v-if="total > 0"  class="d-flex justify-center mb-6">
          <v-btn @click="orderConfirm" tile large block color="primary" dark>order confirm</v-btn>
        </v-col>
      </v-row>
    
      </div>

      <OrderUserInfoDialogue v-on:save="order" ref="orderuserinfo" />
   <AddToCartDialogue
   v-on:add="updateItem"
      ref="addcart"
    />
</div>
  </v-flex>
</template>

<script>
import AddToCartDialogue from "../Dialogue/AddToCartDialogue";
import moment from "moment";
import SaleSummary from "./SaleSummary"
import CartModelScheme from "../../model/Customer/CustomerCartModel"
import CalculateModel from "../../model/CalculateModel"
import UpdateCartModel from "../../model/UpdateCartModel"
import OrderUserInfoDialogue from "../Dialogue/OrderUserInfoDialogue"
import AlertDialogue from "../Dialogue/AlertDialogue"
import CustomDataTable from "../Common/CustomDataTable";
import constants from "../../../../common/constants"
import numeral from "numeral"
export default {
  components: {
    CustomDataTable:CustomDataTable,
    SaleSummary:SaleSummary,
    OrderUserInfoDialogue:OrderUserInfoDialogue,
    AlertDialogue:AlertDialogue,
    AddToCartDialogue:AddToCartDialogue
  },
  watch: {
    async tab(){
        this.getShop()
    }
  },
  created(){
     this.getShop()
  },
  props:["display"],
  mounted() {   
      
  }, 
  computed: {
    emptyCart() {
      return this.cart.length == 0
    },
    moment() {
      return moment;
    },
    summaryModel() {
     
      const _discount = this.shop ? CalculateModel.calculateRate(this.totalAmount,this.shop.discount) : 0
      const _tax = this.shop ? CalculateModel.calculateRate(this.totalAmount,this.shop.tax) : 0
      return {
        items: this.cartModel.items,
        tax:_tax,
        discount:_discount,
        total: this.totalAmount + _tax - _discount
        }
    },
    cartModel() {
       let _items = this.cartItems.map(item=>{

           const _selected = item.options ?
           item.options.split(",").map(option=>{
             const _values = option.split(":")
             return _values[1] == "all" ? null : option
           }).filter(child => child != null).join(", ")
           : null

           const _item  = CalculateModel.calculate(item);
           const _subinfo = ""  + 
           numeral(_item.unitPrice).format(constants.numberFormat)
            + (_item.discountInfo.totalDiscount > 0 ? " (" + numeral(_item.unitPrice -_item.discountInfo.totalDiscount).format(constants.numberFormat) + ") " : "") +  
            " x " + _item.qty + _item.unit +
             ", Total: " + numeral(item.qty * _item.discountInfo.totalAmount).format(constants.numberFormat);

           return {
           ...item, 
           title:_item.name ,
           subtitle: _subinfo,
           selected: _selected,
           discountAmt:numeral(_item.qty * _item.discountInfo.totalDiscount).format(constants.numberFormat),
           amount: _item.qty * _item.discountInfo.totalAmount,
           amountText : numeral(_item.qty * _item.discountInfo.totalAmount).format(constants.numberFormat)
           }});
       let _model = {...this.cartModelScheme};
       _model.items = _items;
       _model.page = 1;
       _model.size = 10;
       return _model; 
    },
    total() {
      return this.cartItems ? this.cartItems.length : 0
    },
    cart() {
      let _collection = this.$store.getters["pospublic/getCollection"]
      return _collection("cartItems") || []
    },
   
  cartItems(){
      return this.cart && this.cart[this.tab] ?this.cart[this.tab].items : []
    },
    totalQty() {
      return this.cartItems.reduce((total, item) => {
        return total + parseInt(item.qty);
      }, 0);
    },
    totalAmount() {
      return this.cartModel.items.reduce((total, item) => {
        return total + parseInt(item.amount);
      }, 0);
    },
    customer(){
       return this.$store.state.pospublic.customer;
     },
     account(){
       return this.$store.state.pospublic.account;
     }
  },
  methods: {
    goHome(){
      this.$router.push("/pos/front/user/shop");
    },
    async getShop(){
      const _shop = this.cart && this.cart[this.tab] ?this.cart[this.tab].shop : null
      if(_shop){
        const _shopdata =  await this.$store.dispatch("pospublic/getItems",{
          nocache: true,
          collection: "posshop",
          populate: ["discount","tax"],
          query:{
            _id: _shop._id 
          },
          page:1,
          pageSize:1
        })

        if(_shopdata.rows.length > 0){
           this.shop = _shopdata.rows[0]
        }
      
    }
    },
    updateItem(params){

      
      let _updateItem = this.cartItems.filter(item=>item._id == params.id)
  
     if(_updateItem && _updateItem[0]){
     
        let _newcart = UpdateCartModel.add({item:_updateItem[0],qty:params.qty},[...this.cart],true)
       
          this.$store.dispatch("pospublic/setItems", {
          data:_newcart,
          collection:"cartItems"
        });
      }
   
    },
    editItem(item){
    
      this.$refs.addcart.show({
                id: item._id,
                title:"update item qty",
                subtitle: item.name,
                 value: item.qty,
                action: {
                label: "Update QTy",
                name: "addcart",
                value: item.qty
                },
                item:{...this.model}
            });
    },
    goToHome(){

    },
      goBack() {
          this.$router.push("/pos/front/user/shop");
      },
      async order(params){
         this.$refs.orderuserinfo.close()
        const _params = {
           user: params,
           shop: this.cart[this.tab].shop._id,
           items: this.cartItems.map(item=>{
             return {
                _id:item._id,
                options: item.options,
                qty:item.qty
             }
             
           })
        }
        if(await  this.$store.dispatch("pospublic/orderItems",_params)){
            this.removeOrder(this.shop)
        }
        
      },
      
      orderConfirm() {
         this.$refs.orderuserinfo.show({
              name:this.customer.name,
              mobile:this.customer.mobile,
              address: this.customer.address,
              location: this.customer.location,
              photo: this.account.photo,
              customerId: this.customer.customerId
          });

       
       
      },
      selectChange(params) {
          this.selected = [...params]
      },
      removeOrder(shop){
         const _newcart = UpdateCartModel.removeOrder(shop,this.cart )
         this.$store.dispatch("pospublic/setItems", {data:_newcart, collection:"cartItems"});
      },
      removeItems() {
          let _ids = this.selected.map(item=>item._id);
          const _newcart = UpdateCartModel.remove(_ids,this.cart[this.tab].shop,this.cart )
         
          this.$store.dispatch("pospublic/setItems", {data:_newcart, collection:"cartItems"});
          //this.removeCartItems(_ids);
      },
     
  },
  data() {
    return {
      shop: null,
      tab: 0,

      showSaved: false,
      selected: [],
      model: {},
      loading: false,
      showData: true,
      cartModelScheme:CartModelScheme,
      emptyCartInfo:{
      persistent: true,
      show:true,
      title:'No order item',
      subtitle:"Firstly you need to add your cart to order the goods and services",
      type:'info',
      actions:{
        ok:{
          name:"Order Items",
        }
      }
    },

    };
  }
};
</script>

<style scoped>
</style>