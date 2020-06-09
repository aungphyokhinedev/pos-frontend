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
    <v-progress-linear  indeterminate v-if="loading" />
    <v-row no-gutters="" class="mt-1 mb-1" align-content="center" justify="center">
      <v-col v-if="!loading && !hasItems" cols="12">
         <span   class="ml-4">There is no item for current searching.</span>
      </v-col>
      <v-col class="d-flex align-center">
       

        <v-btn v-if="editable"
          class="ml-1"
          small
          @click="showEntryForm"
          tile
          text
          color="primary"
        >add New Item</v-btn>
        <v-btn  color="primary"  tile
        small
          text class="ml-1" v-if="!editable && hasItems">{{model.title}}</v-btn>

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
    <v-list  subheader>
      <template v-for="item in displayItems">
        <v-divider :key="'d'+item._id"></v-divider>
        <v-list-item :key="item._id">
          <v-list-item-avatar @click="showDetail(item)" :color="item[model.listData.color]?item[model.listData.color]:'primary'" v-if="!item[model.listData.logo]">
            <v-icon small dark >{{model.listData.icon}}</v-icon>
          </v-list-item-avatar>
          <v-list-item-avatar @click="showDetail(item)" style="border:solid 1px #aaa" v-if="item[model.listData.logo]">
            <v-img :src="imageUrl + item[model.listData.logo]" />
          </v-list-item-avatar>
          <v-list-item-content >
            <v-list-item-title  @click="showDetail(item)" v-text="item[model.listData.title]"></v-list-item-title>
            <v-list-item-subtitle v-text="item[model.listData.subtitle]"></v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn v-if="editable" icon>
              <v-icon color="grey lighten-1" @click="editData(item)">mdi-playlist-edit</v-icon>
            </v-btn>

            <ListAction v-on:refresh="refresh" :data="item" :model="listActionModel" />
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

  
   <ItemDetail v-on:refresh="refresh" :model="model.detailData" ref="detail" />
    <EntryForm 
   
    v-if="editable"
    :title="model.formData.title"
    :subtitle="model.formData.subtitle"
    :items="model.formData.items" 
    v-on:save="saveData" 
    ref="entry" />
 
  </v-card>
</template>
<script>
import constants from "../../../../common/constants";
import SearchInputBar from "../Common/SearchInputBar";
import EntryForm from "../Dialogue/EntryForm";
import ItemDetail from "../Dialogue/ItemDetail";
import ListAction from "../Common/ListAction"
export default {
  components: {
    SearchInputBar: SearchInputBar,
    EntryForm: EntryForm,
    ItemDetail:ItemDetail,
    ListAction:ListAction
  },
  async created() {
   
   // await this.$store.dispatch( this.model.store + "/getItems", this.query);
    this.ready = true
  },
  props: ["model" ],
  watch: {
    size() {
      let _newquery = { ...this.query };
      _newquery.pagination.page = 1;
      this.$store.dispatch(this.model.store + "/getItems", _newquery);
    }
  },
  methods: {
    toggleSearch() {
      this.searching = !this.searching;
    },
    editData(value) {
      this.$refs.entry.edit(value);
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
    async addItem(value) {
      value.collection = this.model.collection
      await this.$store.dispatch(this.model.store + "/addItem", value);
    },
    async updateItem(value) {
      value.collection = this.model.collection
      await this.$store.dispatch(this.model.store + "/updateItem", value);
    },
    showEntryForm() {
      this.$refs.entry.show();
    },
    showDetail(item) {
      this.$refs.detail.show(item);
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
    listActionModel() {
      return this.model.listData.actions ? 
      {
        items:this.model.listData.actions,
      }: null

    },
    loading() {
      return this.$store.state[this.model.store].loading
    }, 
    editable() {
      return this.model.formData != null
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
      return this.$store.state[this.model.store].store[this.model.collection]
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
          _items.push(this.model.listData.transform(_item))
        }
        return _items
      }
      else{
        return [...this.items]
      }
    },
    items() {
      return this.storeItems
        ? this.storeItems.rows
        : [];
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
    ready : false
    
  })
};
</script>