<template>
  <v-card ref="parent" v-if="ready" class="mx-auto elevation-0">
    <v-row no-gutters>

      <v-col cols=12>
        <SearchInputBar
          :show="searching"
          v-on:change="changeSearch"
          v-on:clear="clearSearch"
          :sortItems="model.sortData.items"
        />
      </v-col>
    </v-row>

    <v-row align-content="center" justify="center">
      <v-col class="d-flex align-center">
        <span v-if="!hasItems" class="ml-4">There is no item for current searching.</span>

        <v-btn v-if="editable" class="ml-1" small text color="primary">Total Items [{{total}}]</v-btn>
        <v-btn color="primary" tile small text class="ml-1" v-if="!editable">{{model.title}}</v-btn>

        <v-spacer />
        <v-btn v-if="hasItems" @click="refresh" color="primary" class="mr-2" small icon>
          <v-icon small>refresh</v-icon>
        </v-btn>
         <CustomCartCount class="mr-2 ml-2"/>
         
        
      </v-col>
    </v-row>
  
   
    <v-list  subheader>
      <template v-for="item in displayItems">
        <v-divider :key="'d'+item._id"></v-divider>
        <v-list-item class="pa-0" :key="item._id">
          <v-list-item-avatar class="ma-3" size="75" tile v-if="!item[model.listData.logo]">
            <v-icon small dark class="primary">{{model.listData.icon}}</v-icon>
          </v-list-item-avatar>
          <v-list-item-avatar class="ma-3" size="75" tile style="border:solid 1px #aaa" v-if="item[model.listData.logo]">
            <v-img :src="imageUrl + item[model.listData.logo]" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title  @click="showDetail(item)" v-text="item._title"></v-list-item-title>
            <v-list-item-subtitle v-html="item._subtitle"></v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn dark class="primary" v-if="editable" icon>
              <v-icon class="mb-1" small   @click="addToCart(item)">mdi-basket-outline</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </template>
    </v-list>
    <v-divider />
    <v-row v-if="total>0" align-content="center" justify="center" class="mb-12">
      <v-col>
        <v-btn v-if="hasPrevious" color="primary" @click="previous" tile text small>
          <v-icon>mdi-chevron-left</v-icon>back
        </v-btn>
      </v-col>
      <v-col>
        <v-row no-gutters>
          <v-col style="text-align:center" class="body-2">total: {{total}} page: {{page}}</v-col>
        </v-row>
      </v-col>
      <v-col style="text-align:right">
        <v-btn v-if="hasNext" color="primary" @click="next" tile text small>
          next
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>

      </v-col>
    
    </v-row>
  <OrderItemDetailDialogue  ref="itemdeatil" />
    <ItemDetail :model="model.detailData" ref="detail" />
    <AddToCartDialogue
      v-on:add="addCartItem"
      ref="addcarts"
    />
    <AddOrderDialogue ref="addcart" />
  </v-card>
</template>
<script>
import UpdateCart from "../../model/UpdateCartModel"
import constants from "../../../../common/constants";
import SearchInputBar from "../Common/SearchInputBar";
import AddToCartDialogue from "../Dialogue/AddToCartDialogue";
import AddOrderDialogue from "../Dialogue/AddOrderDialogue";
import ItemDetail from "../Dialogue/ItemDetail";
import CustomCartCount from "../Common/CustomCartCount"
import OrderItemDetailDialogue from "../Dialogue/OrderItemDetailDialogue";
export default {
  components: {
    SearchInputBar,
    AddToCartDialogue,
    ItemDetail,
    OrderItemDetailDialogue,
    CustomCartCount,
    AddOrderDialogue
  },
  async created() {
   // this.$store.dispatch(this.model.store + "/clearItems");
    //   await this.$store.dispatch( this.model.store + "/getItems", this.query);
    this.ready = true;
  },
  props: ["model"],
  watch: {
    size() {
      let _newquery = { ...this.query };
      _newquery.pagination.page = 1;
      this.$store.dispatch(this.model.store + "/getItems", _newquery);
    }
  },
  mounted() {
  },
  methods: {
    goToCart() {
       this.$router.push("/pos/front/user/cart");
    },
    toggleSearch() {
      this.searching = !this.searching;
    },
    
    refresh() {
      this.$store.dispatch(this.model.store + "/getItems", this.query);
    },
    reset() {
      let _newquery = { ...this.query };
      _newquery.page = 1;
      this.$store.dispatch(this.model.store + "/getItems", _newquery);
    },
    async saveData(value) {
      if (value._id) {
        await this.updateItem(value);
      } else {
        await this.addItem(value);
      }
      this.reset();
    },
     addItem(params){
        let _newcart = UpdateCart.add(params,[...this.cart])
   
     
      this.$store.dispatch("pospublic/setItems", {
        data:_newcart,
        collection:"cartItems"
      });

      // this.$router.push("/pos/front/user/cart")
    },
     
    addCartItem(params){
        this.addItem({
            item:params.item,
            qty: params.qty
        })

    },
   
    addToCart(params) {
     
      this.$refs.addcart.show({
        id: params._id,
      });
    },
    showDetail(params) {
   
      this.$refs.itemdeatil.show({
        _id:params._id,
        title: params.name,
        subtitle: params.shop.name,
        logo: params.photo,
        content: params._content,
        action: {
          label:"Add To Cart"
        }
      });
      //this.$refs.detail.show(item);
    },
    pageChange(value) {
      let _newquery = { ...this.query };
      _newquery.page += value;
      this.$store.dispatch(this.model.store + "/getItems", _newquery);
    },
    previous() {
      this.pageChange(-1);
    },
    next() {
      this.pageChange(1);
    },
    changeSearch(value) {
      this.filter = value;
      this.reset();
    },
    clearSearch() {},
    
  },
  computed: {
   
     cart() {
      let _collection = this.$store.getters[ "pospublic/getCollection"]
      return _collection("cartItems") || []
    },
    cartCount() {
      if(!this.cartItems) return 0
      return  this.cartItems.reduce((total,cart)=>{
       
        return total + (cart.items ? cart.items.length : 0)
      },0)
     // return this.cartItems ? this.cartItems.length : 0
    },
    cartItems() {
      let _collection = this.$store.getters[this.model.store +  "/getCollection"]
      return _collection("cartItems") || []
    },
    editable() {
      return this.model.formData != null;
    },
    imageUrl() {
      return constants.imageUrl;
    },
    query() {
      let _params = {};
      _params.collection = this.model.collection;
      _params.page = this.page;
      _params.pageSize = this.size;
      _params.public = this.model.public;
      if (this.model.populate) {
        _params.populate = this.model.populate;
      }

      _params.query = this.model.query || {};
      if (this.filter.dates) {
        _params.query = { createdAt: this.filter.dates };
      }
       _params.query.deleteFlag = false;
       
      _params.sort = this.filter.sort ? this.filter.sort : null;
      if (this.filter.search) {
        _params.search = this.filter.search;
        _params.searchFields = this.model.searchData.items;
      }
      return _params;
    },
     storeItems() {
      let _collection = this.$store.getters[this.model.store +  "/getCollection"]
      return _collection(this.model.collection)
    },
    page() {
      return this.storeItems ? this.storeItems.page : 1;
    },
    total() {
      return this.storeItems ? this.storeItems.total : 0;
    },
    hasItems() {
      return this.total;
    },
     displayItems() {
     
      if(this.model.listData.transform instanceof Function){
         let _items = []
        for(let _item of this.items){   
          _items.push(this.model.listData.transform(_item))
        }
        return _items
      }
      else{
        return [...this.items]
      }
    },
    items() {
      return this.storeItems ? this.storeItems.rows : [];
    },
    hasPrevious() {
      return this.page > 1;
    },
    hasNext() {
      return this.total > this.page * this.size;
    }
  },
  data: () => ({
    window: {},
    size: constants.defaultListSize,
    searching: true,
    filter: {},
    ready: false,
    showOderForm: false,
  })
};
</script>