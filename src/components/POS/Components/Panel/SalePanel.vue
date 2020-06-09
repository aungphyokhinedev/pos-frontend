
<template>
  <v-flex

  v-if="shop"
  v-shortkey="{
  textsearch: ['alt','s'], 
  scancode: ['alt','c'],
  scanuser: ['alt','u']
  }" 
  @shortkey="shortcut"
  >
   <SaleToolBar
   v-on:addcustomer="scanCustomer"
    v-on:drawerclick="drawerClick" :model="saleToolBarModel" />
    <v-flex>

      <custom-autocomplete
        :loading="loading"
        :items="positems"
        :search-input.sync="search"
        hide-no-data
        hide-details
        solo-inverted
        flat
        label="Add new item to cart?"
        collection="positem"
        store="posfrontend"
        :populate="['discount']"
        :findBy="['name','itemCode']"
        v-on:change="showItem"
         ref="select"
        
      />

      <v-row>
     
        <v-col>
          <v-btn
            @click="removeItems"
            color="primary"
            dark
            v-if="selectedIds.length > 0"
            small
            text
          >remove selected</v-btn>
        </v-col>
        <v-col class="text-right">
          <v-badge
            class="mr-3"
            v-if="savedItems.length > 0"
            color="secondary"
            :content="savedItems.length"
            overlap
          >
            <v-btn @click="savedItemsShow" color="primary" dark small text>saved items</v-btn>
          </v-badge>
        </v-col>
      </v-row>
      <v-divider v-if="selectedIds.length > 0" />
    
        <CustomDataTable
         v-if="showData"
          :model="cartModel"
          v-on:edit="editCartItem"
           v-on:select="selectCartItem"
           selectable="true"
           :display="display"
         />
       
       <CustomDataTable
         v-if="showSaved"
          :model="savedModel"
           v-on:edit="setSavedToCart"
           :display="display"
         />

     <v-row no-gutters="">
       <v-col>
        
         <v-btn @click="scanProductcode"  color="primary" class="mt-3 " text  small>
          <v-icon class="mr-1" small>mdi-camera-outline</v-icon>    Add New
         </v-btn>
       
       </v-col>
     </v-row>
      <SaleSummary  :model="summaryModel" />
      
      <v-row no-gutters>
        <v-col>
          <v-btn @click="saveItems" style="border-radius:0" large block>SAVE</v-btn>
        </v-col>
        <v-col>
          <v-btn @click="chargeSale" style="border-radius:0" large block color="primary" dark>Charge</v-btn>
        </v-col>
      </v-row>
    </v-flex>

     <BarcodeScanner key="pdcan" v-on:change="changeItemCode" ref="productcodescanner"   title="Scan item code" />
    <BarcodeScanner key="uscan" v-on:change="changeCustomer" ref="customercodescanner"  title="Scan user code" />

<SaleInvoicePrint :key="invoiceNo" :model="invoiceModel"  ref="invoicepanel"  />
  </v-flex>
</template>

<script>
import moment from "moment";
import SavedModelScheme from "../../model/SavedModel"
import SaleSummary from "./SaleSummary"
import SaleToolBar from "../../Components/Common/SaleToolBar"
import CartModelScheme from "../../model/CartModel"
import CustomAutocomplete from "../Common/CustomAutoComplete";
import CustomDataTable from "../Common/CustomDataTable";
import BarcodeScanner from "../Dialogue/BarcodeScanner";
import SaleInvoicePrint from "./SaleInvoicePrint";
import constants from "../../../../common/constants"
import numeral from "numeral";

export default {
  components: {
    BarcodeScanner: BarcodeScanner,
    SaleToolBar:SaleToolBar,
    CustomDataTable:CustomDataTable,
    CustomAutocomplete: CustomAutocomplete,
    SaleSummary:SaleSummary,
    SaleInvoicePrint:SaleInvoicePrint,
  },
  watch: {
    shop(){
      this.getInvoiceSetup()
    }
  },
  props:["display"],
  mounted(){
    toString
  },
  computed: {

    moment() {
      return moment;
    },
    inoiceSetup() {
      return this.$store.state.posfrontend.invoiceSetup;
    },
    customer() {
      return this.$store.state.posfrontend.customer;
    },
    shop() {
      return this.$store.state.posfrontend.shop;
    },
    user() {
      return this.$store.state.posfrontend.user;
    },
    selectedIds() {
      return this.selected.map(item => item._id);
    },
    savedItems() {
      let _items = []
      for(let _item of this.$store.state.posfrontend.savedItems){
        let _newitem = {..._item,
        displayAmt: numeral(_item.amount).format(constants.numberFormat)}
        _newitem.name = moment(_item.time).fromNow()
        _newitem.qty = _item.items.length
        _items.push(_newitem)
      }
      return _items;
    },
    cartModel() {
       let _model = {...this.cartModelScheme};
       _model.items = this.cartItems;
       _model.page = 1;
       _model.size = 10;
       return _model;
    },
    savedModel() {
      let _model = {...this.savedModelScheme};
       _model.items = this.savedItems;
       _model.page = 1;
       _model.size = 10;
       return _model;
    },
    cartItems() {
      let _items = [];
      let _index = 1;
      for (let _item of this.$store.state.posfrontend.cartItems) {
        _items.push({ ..._item, no: _index, title: _item.name + " x " +  _item.qty,
        displayAmt: numeral(_item.amount).format(constants.numberFormat),
        displayPrice: numeral(_item.unitPrice).format(constants.numberFormat)
        });
        _index++;
      }
      
      return _items;
    },
    summaryModel() {
      return {
        items: this.cartItems,
        tax: this.taxAmount,
        discount: this.discountAmount,
        total: this.totalAmount
    }
    },
    saleToolBarModel() {
      return {menu:{items:[{
        title:"menu"
      }]}} 
    },
    total() {
      return this.cartItems.length;
    },
    totalQty() {
      return this.cartItems.reduce((total, item) => {
        return total + parseInt(item.qty);
      }, 0);
    },
   amount() {
      return this.cartItems.reduce((total, item) => {
        return total + parseInt(item.amount);
      }, 0);
    },
    totalAmount() {
      return this.amount + this.taxAmount - this.discountAmount
    },
    taxAmount() {
      return this.calculateRate(this.amount,this.shop.tax)
    },
    discountAmount() {
      return this.calculateRate(this.amount,this.shop.discount)
    },
    
  },
  methods: { 
    getInvoiceSetup(){
       this.$store.dispatch("posfrontend/getInvoiceSetup", {shop:this.shop._id});
    },
    getInvoice(){
      return {
        invoiceno: this.invoiceNo,
        customer: this.customer ? {
          name:this.customer.name,
          id: this.customer.customerId
        } : null,
        shop: this.shop ? {
          name:this.shop.name,
          mobile: this.shop.mobile,
          address: this.shop.address
        }: null,
        user: this.user ? {
          name: this.user.fullName
        }: null,
        items: this.cartItems,
        discount:numeral(this.discountAmount).format(constants.numberFormat),
        tax:numeral(this.taxAmount).format(constants.numberFormat),
        totalQty: this.totalQty,
        total:this.total,
        totalAmount:numeral(this.totalAmount).format(constants.numberFormat),
        qr: this.invoiceQr
      }
    },
    calculateRate(amount,rule){
      if(!amount || !rule) return 0
      const _flatRate = rule.flatRate ? rule.flatRate : 0
      const _percentage  = rule.percentage ? rule.percentage : 0
      return _flatRate + (amount * (_percentage/100))

    },
    shortcut(event){
        switch (event.srcKey) {
        case 'textsearch':
           //this.searchFocus()
           break
            case 'scancode':
           this.scanProductcode()
           break
            case 'scanuser':
          this.scanCustomer()
           break
        }
    },

    drawerClick() {
      this.$emit("drawerclick")
    },
    async chargeSale(){
      this.invoiceNo = Date.now();
      let _saleData = {
        name: moment().format("LLLL"),
        remark: this.totalQty + " Items" + "/ Amount " +  this.totalAmount,
        tax:0,
        invoiceNumber: this.invoiceNo,
        adjustment:0,
        adjustmentRemark:"",
        total: this.totalAmount,
        items: [...this.cartItems], 

      }
      if(this.customer){
        _saleData.customer = this.customer._id
      }
      let _done = await this.$store.dispatch("posfrontend/sale", _saleData);
      let _invoice = await this.$store.dispatch("posfrontend/getInvoice", {id:_done._id});
      // eslint-disable-next-line no-console
      console.log("invoice data:",_invoice);
      if(_done){
        let _qr = {saleid:_done._id,invno: this.invoiceNo};
        this.invoiceQr= JSON.stringify(_qr)
        this.invoiceModel= this.getInvoice();
      //  this.$refs.invoicepanel.show( this.getInvoice())
       // setTimeout(()=>this.print(),1000);
       // this.invoiceModel= null;
        this.$store.dispatch("posfrontend/clearCartItems");
        this.$store.dispatch("posfrontend/clearCustomer");
        this.$router.push("/pos/sale/invoice/" + _done._id);
      }

    },
    savedItemsShow() {
     
      this.showSaved = !this.showSaved ;
      this.showData =  !this.showSaved;
    },
    scanCustomer() {
      this.$refs.customercodescanner.show("User QR Scanner");
    },
    scanProductcode() {
      this.$refs.productcodescanner.show("Item QR Scanner");
    },
    submit() {
      this.$store.dispatch("posfrontend/clearCartItems");
    },
    menuClick() {},
    setSavedToCart(item) {
      this.$store.dispatch("posfrontend/setSavedItems", item);
      this.showSaved = false;
      this.showData = true;
    },
    saveItems() {
   
      this.$store.dispatch("posfrontend/addSavedItem", [
        ...this.$store.state.posfrontend.cartItems
      ]);
      this.$store.dispatch("posfrontend/clearCartItems");
    },

    editCartItem(params) {
      params.updateFlag = true;
      this.$emit("showItem", params);
    },
    selectCartItem(items) {
      this.selected = items
    },
    showItem(params) {
      if (params.value && params.value._id) {
      
        this.$emit("showItem", params.value);
      }
    },
    async removeItems() {
      for (const item of this.selected) {
        await this.$store.dispatch("posfrontend/removeCartItem", item);
        this.selected = [];
      }
      this.$emit("removeItems", this.selectedIds);
    },
    changeItemCode(params) {
      const _json = JSON.parse(params);
      
      if(_json.code){
        this.$emit("changeItemCode", _json.code);
      }
      else{
        alert("Invalid QR")
      }
      
    },
    async changeCustomer(params) {
       const _json = JSON.parse(params);
        if(_json.eid){
        await this.$store.dispatch("posfrontend/getCustomer", {
        query:{customer: _json.eid}
      });
      }
      else{
        alert("Invalid QR")
      }
      
      
    },
    

  },
  data() {
    return {

      invoiceModel:null,
      invoiceQr: null,
      showSaved: false,
      model: {},
      loading: false,
      positems: [],
      select: true,
      search: null,
      showData: true,
      cartModelScheme:CartModelScheme,
      savedModelScheme: SavedModelScheme,
      selected: [],
      invoiceNo : null,
      menus: [{ title: "Saved Items", value: "showSaved" }]
    };
  }
};
</script>

<style scoped>
</style>