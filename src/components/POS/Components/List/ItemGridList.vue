
<template>
  <div>
          <v-row>
            <v-col @click="itemClick(item)" v-for="(item,i) in items" :key="i" cols="12" md="2">
          
                <ItemBox v-if="item.display=='item'"  
                :checked="item.checked" 
                :label="item[scheme.title]" 
                :image="item[scheme.photo] ? imageUrl + item[scheme.photo]:null"
                />
                 <InfoBox v-if="item.display=='info'"   
                 :checked="item.checked" 
                 :label="item[scheme.title]" 
                 :color="item.color"
                />
              
            </v-col>
            <v-col @click="actionClick(item)" 
            v-for="(item,i) in actions"  cols="12" md="2"  :key="'a' +i">
              <ActionBox :color="item.color" :icon="item.icon" >
              </ActionBox>
            </v-col>
            
          </v-row>
          <v-row no-gutters="">
          
          <v-btn small @click="previous" v-if="hasPrevious" text>
            <v-icon>mdi-chevron-left</v-icon> back
          </v-btn>
          <v-spacer/>
         
          <v-btn small right @click="next" v-if="hasNext" text>
            next <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
     
          </v-row>
      </div>
</template>

<script>
import ItemBox from "../Common/ItemBox";
import InfoBox from "../Common/InfoBox";
import ActionBox from "../Common/ActionBox";
import constants from "../../../../common/constants";
export default {
  components:{
      ItemBox:ItemBox,
      InfoBox:InfoBox,
      ActionBox:ActionBox
  },
   async created() {
    
    await this.$store.dispatch(this.scheme.store + "/getItems", this.query);
    this.ready = true
  },
  props: ["model","size", "display","selected" ],
  watch: {
  
    extraQuery(){
         this.$store.dispatch(this.scheme.store + "/getItems", this.query);
      
      
    }
  },
  computed: {
    extraQuery() {
        return this.model.query
    },
    actions() {
        return this.model.actions
    },
    scheme() {
      return this.model.listData
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
      
      _params.query = this.extraQuery || {};
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
      let _collection = this.$store.getters[this.model.listData.store +  "/getCollection"]
 
      return _collection(this.model.collection)
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
    items() {
      if(this.storeItems){
        if(this.storeItems.rows){
          let _items = [...this.storeItems.rows]
          for(let _item of _items){
            if(this.display == "item"){
              _item.display = _item.photo ? "item" : "info"
            }
             if(this.display == "info"){
              _item.display =  "info"
            }

            _item.checked = false
            if(this.selected){
              if(this.selected.indexOf(_item._id) >= 0){
                _item.checked = true
              }
            }
          }
          return _items;
        }
      }
      return [];
    },
    hasPrevious() {
      return this.page > 1;
    },
    hasNext() {
      return this.total > this.page * this.size;
    }
  },
  methods: {
   
    toggleSearch() {
      this.searching = !this.searching;
    },

    refresh() {
      this.$store.dispatch(this.scheme.store + "/getItems", this.query);
    },
    reset() {
      let _newquery = { ...this.query };
      _newquery.page = 1;
      this.$store.dispatch(this.scheme.store + "/getItems", _newquery);
    },
   
   
    pageChange(value) {
      let _newquery = { ...this.query };
      _newquery.page += value;
      this.$store.dispatch(this.scheme.store + "/getItems", _newquery);
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
    actionClick(item){
      this.$emit("action", item);
    },
    itemClick(item){
      this.$emit("detail", item);
    }
  },
  data: () => ({
    searching: false,
    filter: {},
    ready : false
    
  })
};
</script>

<style scoped>

</style>