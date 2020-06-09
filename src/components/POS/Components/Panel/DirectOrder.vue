

<template>

    <div v-if="model">
      <v-img
        v-if="model.photo"
        class="white--text align-end"
        height="200px"
        max-width="100%"
        :src="photoUrl"
        gradient="to bottom left, #fff0, #0007"
      >
        <v-card-title class="ml-1 mb-3">{{model.name}}</v-card-title>
      </v-img>

      <v-card-title
        class="mb-3"
        style="border-top:solid 1px  #cccc;
    border-bottom:solid 1px  #cccc"
        v-if="!model.photo"
      >{{model.name}}</v-card-title>
      <div class="ma-4">
        <div class="ml-1 mr-1 mt-3">
          <div class="mb-2 mt-7 font-weight-bold subtitle-1">{{model.owner.companyName}}</div>
          <div class="body-2">{{model.shop.name}}</div>
          <div class="body-2" v-html="model.description"></div>

          <div class="mb-1 body-2">Price: {{price}} {{model.discountInfo.detail}}</div>
        </div>
       
        <v-row no-gutters class="mb-7 mt-3">
          <v-col class="pa-0" style="max-width:250px;">
            <RatingPanel style="max-width:250px;" :data="model" :model="rateInfoModel" />
          </v-col>
          <v-spacer />
          <v-col class="pa-0" style="max-width:50px;">
            <ReviewPanel
              style="max-width:50px; "
              class="mr-2"
              :data="model"
              :model="reviewInfoModel"
            />
          </v-col>
        </v-row>
      </div>

      <div v-if="model.options">
        <v-divider />
        <div class="ma-4 mt-7 font-weight-bold subtitle-1">Product Options</div>
        <CriteriaOption class="pa-5 pb-0 pt-0" v-on:change="changeCriteria" :model="model.options" />
      </div>
     
   
       
      <v-divider class="mt-7 mb-5" />
      <div class="d-flex flex-direction-column align-center justify-center">
      <v-progress-circular v-if="priceLoading"/>
      </div>
      <div v-if="!priceLoading" >
       <div  class="ml-5 mr-5 mt-5 "  v-if="criteriaInfoExist && false">
            <div class="overline mb-2">Your Options</div>
            <div class="d-flex align-center justify-space-between" >
      <CriteriaInfo :model="criteriaInfoModel"  />
      <v-btn v-if="false" icon>
             <v-icon>
                 mdi-image-outline
             </v-icon>
         </v-btn>
            </div>
        </div>
      <div class="ma-4">
        <v-row no-gutters>
          <v-col class="font-weight-bold subtitle-1">Total Amount</v-col>
          <v-col class="text-right">
            <div>
              <span class="font-weight-bold subtitle-1">{{amount}}</span>
              <span>/{{model.unit}}</span>
            </div>
          </v-col>
        </v-row>
      </div>
      </div>
      <v-divider class="mt-7" />
      <div class="d-flex flex-column align-center pa-3 mt-7 mb-10">
        <div v-if="model.disable" class="overline text-center mb-2">Cannot order this item</div>
        <div class="overline text-center mb-3">how many item do you want to order?</div>
        <v-row class="d-flex align-center">
          <v-btn @click="addQty(-1)" outlined tile icon>
            <v-icon>mdi-chevron-down</v-icon>
          </v-btn>
          <div class="d-flex justify-center align-center font-weight-bold addBtn">
            <div>{{qty}}</div>
          </div>
          <v-btn @click="addQty(1)" outlined tile icon>
            <v-icon>mdi-chevron-up</v-icon>
          </v-btn>
        </v-row>

        <v-btn
          :disabled="model.disable"
          @click="addToCart"
          class="mt-5 mb-2"
          block
          outlined
          large
        >Add to cart</v-btn>
        <v-btn
          :disabled="model.disable"
          @click="orderNow"
          dark
          block
          outlined
          large
          class="primary"
        >order it now</v-btn>
        <v-card-text></v-card-text>
      </div>
    </div>

</template>

<script>
import numeral from "numeral";
import calculateModel from "../../model/CalculateModel";
import UpdateCart from "../../model/UpdateCartModel";
import RatingPanel from "../Panel/RatingPanel";
import ReviewPanel from "../Panel/ReviewPanel";
import CriteriaOption from "../Common/CriteriaOption";
import CriteriaInfo from "../Common/CriteriaInfo";
import constants from "../../../../common/constants";
export default {
  components: {
    RatingPanel,
    ReviewPanel,
    CriteriaOption,
    CriteriaInfo
  },
  watch: {},
  computed: {
    criteriaInfoExist(){
        return this.criteriaInfoModel && this.criteriaInfoModel.items.length > 0
    },
    criteriaInfoModel(){
        if(!this.selectedValues){
            return null
        }
        return {
            items: this.selectedValues.filter(item=>item.value != "all").map(item=>{
                return {
                    type:item.type,
                    value:item.value,
                    label: item.label
                }
            }),
            photo: this.photoUrl
        }
    },
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
    price() {
      return numeral(this.model.unitPrice).format(constants.numberFormat);
    },
    amount() {
      return numeral(this.model.discountInfo.totalAmount * this.qty).format(
        constants.numberFormat
      );
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
      query: { _id: this.id },
      collection: "posshopitem"
    });
    let _item = _result.rows[0] ? { ..._result.rows[0] } : null;
    _item = _item ? calculateModel.calculate(_item) : null;
    this.model = {..._item};
    this.basicmodel = {..._item};
    // this.$store.dispatch("pospublic/clearItems")
  },
  props: ["id"],
  data: () => ({
    priceLoading: false,
    model: null,
    basicmodel:null,
    qty: 1,
    options: null,
    extrainfo: null,
    selectedValues: null
  }),
  methods: {
    async changeCriteria(params) {
      
      this.selectedValues = params.meta

      this.options = params.value
       const _find =  "^" + params.value.split(",").map(item=>{
        const _split = item.split(":")
        return _split[0] + ":(" + _split[1] + "|all)" 
      }).join(",")

      this.priceLoading = true
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

        this.priceLoading = false
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