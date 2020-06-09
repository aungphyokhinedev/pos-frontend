<template>
  <v-card v-if="ready" class="mx-auto elevation-0">
    <v-divider />
    <v-row no-gutters>  
      <v-col>
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
     
         
       
 <div v-if="hasItems" >
      <div 
      class="badge secondary"
      
      v-if="selectedItems.length > 0">
        {{selectedItems.length >= 3 ?selectedItems.length + "+":  selectedItems.length}}
      </div>
     
        <v-btn
         v-if="selectedItems.length > 0"
          class="ml-1"
          small
      
          tile
          text=""
          color="primary"
        >{{data.action.name}} {{selectedItems.length >0 ?  "+" + selectedItems.length:  ""}}
       
        </v-btn>
        <span class="body-2 font-weight-light ml-5" v-if="selectedItems.length == 0">
          No item is selected.</span>
          </div>
      
        <v-spacer />
        <v-btn
          v-if="hasItems"
          @click="refresh"
          color="primary"
          class="mr-2"
          small
          icon
        >
          <v-icon small>refresh</v-icon>
        </v-btn>
        <v-btn
          class="mr-2"
          @click="toggleSearch"
          v-if="hasItems"
          small
          color="primary"
          icon
        >
          <v-icon small>mdi-magnify</v-icon>
        </v-btn>  
      </v-col>
    </v-row>
    <v-list v-if="items" subheader>
      <template v-for="item in displayItems">
        <v-divider :key="'d'+item._id"></v-divider>
        <v-list-item :key="item._id">
          <v-list-item-avatar v-if="!item[model.listData.logo]">
            <v-icon small dark class="primary">{{model.listData.icon}}</v-icon>
          </v-list-item-avatar>
          <v-list-item-avatar style="border:solid 1px #aaa" v-if="item[model.listData.logo]">
            <v-img :src="imageUrl + item[model.listData.logo]" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title :style="!item.checked?'text-decoration:line-through;':null" @click="showDetail(item)" v-text="item._title"></v-list-item-title>
            <v-list-item-subtitle v-text="item._subtitle"></v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
          
              <v-btn  color="primary" outlined="" :disabled="!editable" @click="select(item)" icon>
                  <v-icon small v-if="!item.checked">
                      mdi-cart-off
                  </v-icon>
                  <v-icon small v-if="item.checked">
                      mdi-cart
                  </v-icon>
              </v-btn>
      
          </v-list-item-action>
        </v-list-item>
      </template>
    </v-list>

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

 <OrderDetailCheckDialogue ref="orderdetailcheck" />
  </v-card>
</template>
<script>
import constants from "../../../../common/constants";
import utility from "../../../../common/utility";
import SearchInputBar from "../Common/SearchInputBar";
import OrderDetailCheckDialogue from "../Dialogue/OrderDetailCheckDialogue";
export default {
  components: {
    SearchInputBar: SearchInputBar,
    OrderDetailCheckDialogue:OrderDetailCheckDialogue
  },
  async created() {
 
    await this.$store.dispatch(this.store + "/clearItems");
     await this.reload(this.query)
    this.ready = true
  },
  props: ["model","data","master","editable"],
  watch: {
    size() {
      let _newquery = { ...this.query };
      _newquery.pagination.page = 1;
      this.reload(_newquery)
    },
    selectedItems(value) {
        this.$emit("selectchange",value)
    }
  },
  methods: {
    async reload(query) {
      query.nocache = true;
       this.storeItems = await this.$store.dispatch(this.store + "/getItems", query);
        // eslint-disable-next-line no-console
        console.log(this.storeItems)
      this.storeItems.rows.map(item=>{
         if(item.status == "reject") {
           if(this.selectedItems.indexOf(item._id) < 0) {
             this.selectedItems.push(item._id)
           }
           
         }
       })
    },
    select(item){
    
      if(this.selectedItems.indexOf(item._id) < 0){
        this.selectedItems.push(item._id)
       
      }
      else{
        this.selectedItems.splice( this.selectedItems.indexOf(item._id), 1 );
      }
    },
    toggleSearch() {
      this.searching = !this.searching;
    },
    editData(value) {
      this.$refs.entry.edit(value);
    },
    refresh() {
      this.selectedItems = []
      this.reload(this.query)
    },
    reset() {
      let _newquery = { ...this.query };
      _newquery.page = 1;
      this.reload(_newquery)
    },

    async onAction() {
      let _values = {...this.data.action.params};
      _values = utility.setPrarmsData(_values,this.master)
      
      let _params = {
        ids: this.selectedItems, 
        values:_values,
        collection: this.model.collection
        };
      await this.$store.dispatch(this.store + "/mapItems", _params);
      
      this.refresh()
    },

    showEntryForm() {
      this.$refs.entry.show();
    },
    showDetail(params) {
      
      this.$refs.orderdetailcheck.show({
          logo: params.item.photo,
          title: params.item.name,
          content: params.shop.name + "<br/>" +
          params._subtitle
      });
    },
    pageChange(value) {
      let _newquery = { ...this.query };
      _newquery.page += value;
      this.reload(_newquery)
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
    store() {
        return this.model.store
    },
    title() {
      return this.data.title
    },
    action() {
      return this.data.action
    },
    imageUrl() {
      return constants.imageUrl;
    },
    query() {
      let _params = {};
      _params.collection = this.model.collection;
      _params.page = this.page;
      _params.pageSize = this.size;

      if(this.model.populate){
        _params.populate = this.model.populate
      }
      _params.query =  this.data.params?this.data.params:{};
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
   
    page() {
      return this.storeItems
        ? this.storeItems.page
        : 1;
    },
    total() {
      return this.storeItems
        ? this.storeItems.total
        : 0;
    },
    hasItems() {
      return this.total;
    },
     displayItems() {
     
      if(this.model.listData.transform instanceof Function){
         let _items = []
        for(let _item of this.items){   
          
           if(this.selectedItems.indexOf(_item._id) >= 0){
               _item.checked = false;
           }
           else{
                _item.checked = true;
           }
           _items.push(this.model.listData.transform(_item))
        }
        return _items
      }
      else{
        return [...this.items]
      }
    },
    items() {
    
      if(this.storeItems && this.storeItems.rows){
        let _rows = []
       
        for(var row of this.storeItems.rows){
          for(var id of this.selectedItems){
             if(row._id == id){
               row.checked = true;
             }
          }
          //clone item to prevent mutation
          _rows.push({...row})
        }
        return _rows
      }
      else{
        return []
      }
    },
    hasPrevious() {
      return this.page > 1;
    },
    hasNext() {
      return this.total > this.page * this.size;
    }
  },
  data: () => ({
    size: constants.defaultListSize,
    searching: true,
    filter: {},
    selectedItems:[],
    ready: false,
    storeItems: null
  })
};
</script>
<style scoped>
.badge{
  border-radius: 9px;
  width:18px;
  height: 18px;
  color:#fff;
  font-size: 10px;
  text-align: center;
  display:none;
}
</style>