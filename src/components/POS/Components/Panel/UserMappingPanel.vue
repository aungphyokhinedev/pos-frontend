

<template>
  <div>
  
    <v-row  no-gutters>
      <v-col dense>
        <v-flex v-if="model">
         
          <v-list class="pt-3 pb-3 mb-3" subheader>
            <v-list-item>
              <v-list-item-avatar   @click="showItemDetail" v-if="!data[model.logo]">
                <v-icon small dark class="primary">{{model.icon}}</v-icon>
              </v-list-item-avatar>
              <v-list-item-avatar   @click="showItemDetail" style="border:solid 1px #aaa" v-if="data[model.logo]">
                <v-img :src="imageUrl + data[model.logo]" />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-text="data[model.title]"></v-list-item-title>
                <v-list-item-subtitle v-text="data[model.subtitle]"></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-divider />
          <CustomMenu v-on:change="menuChange" :model="menuModel" />
          <template v-for="item in childItems">

              <ChoiceList :key="item.value + data._id" 
              :model="allListModel[item.scheme]" 
              :data="item"
              :master="data"
              :editable="currentEntry.editable"
              v-if="currentEntry && currentEntry.value == item.value" />
          </template>
      
        </v-flex>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import constants from "../../../../common/constants";
import utility from "../../../../common/utility";
import allListModel from "../../model/Customer/AllListModel";
import CustomMenu from "../../Components/Common/CustomMenu";
import ChoiceList from "../../Components/List/ChoiceList";
export default {
  components: {
    ChoiceList: ChoiceList,
    CustomMenu:CustomMenu,
  },
  computed: {
    imageUrl() {
      return constants.imageUrl;
    },
    allListModel() {
        return allListModel
    },
    childItems() {
      let _items = []
    
      for(var item of this.model.lists.items){   
        let _newparms = {...item.params}; 
        _newparms = utility.setPrarmsData(_newparms, this.data);
        _items.push({...item,params:_newparms})    

      }
      
      return _items
    },
    menuModel() {
      return {items: this.childItems}
    }

  },
  created() {
    
  },
  props: ["model","data"],
  data: () => ({
    shops: [],
    entryshow: false,
    ready: false,
    currentEntry: null,
  }),
  methods: {
    showItemDetail() {
    },
    menuChange(value) {
      this.currentEntry = value;
    },
   
  }
};
</script>