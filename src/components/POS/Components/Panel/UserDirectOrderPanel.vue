

<template>
  <v-flex class="d-flex justify-center">
    <div
      v-if="false"
      class="secondary"
      style="position:absolute; left:0; right:0; top:0; bottom:0;height:700px;"
    />
    <v-card class="shadow pa-3" width="550px" max-width="100%" v-if="model">
      <SimpleUserTitleBar
        v-on:changepassword="changePassword"
        v-on:updateuser="updateUser"
        v-on:logout="logout"
        :model="titlebarModel"
      />

    <DirectOrder :id="id" />
    
     
    </v-card>
    
   
  </v-flex>
</template>

<script>
import numeral from "numeral";
import DirectOrder from "./DirectOrder"
import calculateModel from "../../model/CalculateModel";
import UpdateCart from "../../model/UpdateCartModel";
import SimpleUserTitleBar from "../Common/SimpleUserTitleBar";
import constants from "../../../../common/constants";

export default {
  components: {
    DirectOrder,
    SimpleUserTitleBar,
  },
  watch: {},
  computed: {
    photoUrl() {
      return this.imageUrl + ((this.extrainfo ? this.extrainfo.photo : null) || this.model.photo)
    },
    cart() {
      let _collection = this.$store.getters["pospublic/getCollection"];
      return _collection("cartItems") || [];
    },
    criterias() {
      if (!this.model.criteria) {
        return null;
      } else {
        return this.model.criteria.data
          ? JSON.parse(this.model.criteria.data)
          : null;
      }
    },
    cartItems() {
      return this.cart ? this.cart[0].items : [];
    },
    id() {
      return this.$route.params.id;
    },
    price() {
      return numeral(this.model.unitPrice).format(constants.numberFormat);
    },
    amount() {
      return numeral(this.model.discountInfo.totalAmount * this.qty).format(
        constants.numberFormat
      );
    },
    sliderModel() {
      return {};
    },
    shop() {
      return this.$route.params.scheme;
    },
    imageUrl() {
      return constants.imageUrl;
    },
    customer() {
      return this.$store.state.pospublic.customer;
    },
    rateInfoModel() {
      return {
        uid: this.customer ? this.customer.customer : null,
        store: "pospublic",
        type: "positem",
        title: "Rate Our Service",
        subtitle:
          "If you love this service, please take a few seconds to rate your experience. It really helps!"
      };
    },
    reviewInfoModel() {
      return {
        uid: this.customer ? this.customer.customer : null,
        store: "pospublic",
        type: "positem",
        title: "Rate Our Service",
        subtitle:
          "If you love this service, please take a few seconds to rate your experience. It really helps!"
      };
    }
  },
  async created() {
    const _result = await this.$store.dispatch("pospublic/getItems", {
      nocache: true,
      populate: ["shop", "discount", "owner"],
      page: 1,
      pageSize: 1,
      query: { _id: this.$route.params.id },
      collection: "posshopitem"
    });
    let _item = _result.rows[0] ? { ..._result.rows[0] } : null;
    _item = _item ? calculateModel.calculate(_item) : null;
    this.model = {..._item};
    this.basicmodel = {..._item};
    // this.$store.dispatch("pospublic/clearItems")
  },
  props: {},
  data: () => ({
    titlebarModel: {
      store: "pospublic"
    },
    model: null,
    basicmodel:null,
    qty: 1,
    options: null,
    extrainfo: null
  }),
  methods: {
    async changeCriteria(params) {
     
      this.options = params.value
       const _find =  "^" + params.value.split(",").map(item=>{
        const _split = item.split(":")
        return _split[0] + ":(" + _split[1] + "|all)" 
      }).join(",")
       const _result = await this.$store.dispatch("pospublic/getItems", {
          nocache: true,
        //  populate: ["shop", "discount", "owner"],
          page: 1,
          pageSize: 1,
          query: { 
            shopItem: this.model._id , 
          deleteFlag: false,  
          value:  {'$regex': _find} },
          collection: "posextrainfo"
        });
        if(_result.total > 0){
          
          this.extrainfo = _result.rows[0]
          if(this.extrainfo.unitPrice){
            this.model.unitPrice = this.extrainfo.unitPrice
            this.model = calculateModel.calculate(this.model)
          }
        }
        else{
           this.extrainfo = null
           this.model = {...this.basicmodel}
        }
        
    },
    addQty(qty) {
      const _qty = qty + this.qty;
      if (_qty > 0) {
        this.qty = _qty;
      }
    },
    changePassword(params) {
      this.$emit("changepassword", params);
    },
    updateUser(params) {
      this.$emit("updateuser", params);
    },
    logout() {
      this.$emit("logout");
    },
    addItem(params) {
      params.options = this.options
      let _newcart = UpdateCart.add(params, [...this.cart]);

      this.$store.dispatch("pospublic/setItems", {
        data: _newcart,
        collection: "cartItems"
      });

      //this.$router.push("/pos/front/user/cart")
    },

    addCartItem(params) {
      this.addItem({
        item: this.model,
        qty: params.qty
      });
    },
    orderNow() {
      this.addItem({
        item: this.model,
        qty: this.qty
      });
      this.$router.push("/pos/front/user/cart");
    },
    addToCart() {
      this.addItem({
        item: this.model,
        qty: this.qty
      });
    },

    addCart() {
      this.$refs.addcart.show({
        id: this.model.name,
        title: "add cart item",
        subtitle: this.model.name,

        action: {
          label: "Add To Cart",
          name: "addcart",
          value: 1
        },
        item: { ...this.model }
      });
    },
    changeQty() {}
  }
};
</script>
<style>
.shadow {
  box-shadow: 2px 108px 136px -78px rgba(0, 0, 0, 0.7);
}
.addBtn {
  border: solid 1px #ccc;
  width: 36px;
  height: 36px;
  text-align: center;
}
</style>