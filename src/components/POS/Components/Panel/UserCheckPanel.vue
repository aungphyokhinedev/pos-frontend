

<template>

  <div v-if="displayData">
    <v-row no-gutters>
      <v-col dense>  
        <v-flex v-if="model && data">
          <v-list class="pt-3 pb-3 mb-3" subheader>
            <v-list-item>
              <v-list-item-avatar @click="showUserInfo" v-if="!displayData[model.logo]">
                <v-icon small dark class="primary">{{model.icon}}</v-icon>
              </v-list-item-avatar>
              <v-list-item-avatar
                @click="showUserInfo"
                style="border:solid 1px #aaa"
                v-if="displayData[model.logo]"
              >
                <v-img :src="imageUrl + displayData[model.logo]" />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-text="displayData[model.title]"></v-list-item-title>
                <v-list-item-subtitle v-html="displayData[model.subtitle]"></v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-icon v-if="displayData[model.mobile]">
                <v-btn class="mt-2" @click="call(displayData[model.mobile])" icon>
                  <v-icon>mdi-phone</v-icon>
                </v-btn>
              </v-list-item-icon>
            </v-list-item>
          </v-list>

          <v-divider />
       
          <template v-for="item in childItems">
            <StatusList
              :key="item.value + data._id"
              :model="allListModel[item.scheme]"
              :data="item"
              :master="data"
              :editable="data.status == 'done'"
              v-on:selectchange="selectChange"
              v-if="currentEntry && currentEntry.value == item.value"
            />
          </template>
        </v-flex>
      </v-col>
    </v-row>
    <ShopInfoDialogue ref="shopinfo" />


    <AlertDialogue v-on:ok="okClick" :model="alertModel" />
  </div>
</template>

<script>
import constants from "../../../../common/constants";
import utility from "../../../../common/utility";
import allListModel from "../../model/Customer/AllListModel";
import StatusList from "../../Components/List/StatusList";
import ShopInfoDialogue from "../Dialogue/ShopInfoDialogue";
import AlertDialogue from "../Dialogue/AlertDialogue"
export default {
  components: {
    StatusList: StatusList,
    ShopInfoDialogue: ShopInfoDialogue,
    AlertDialogue:AlertDialogue
  },
  computed: {
    
    displayData() {
      let _data = { ...this.data };
      if (this.model.transform && _data) {
        
        _data = this.model.transform(_data);
      }
      return _data;
    },
    imageUrl() {
      return constants.imageUrl;
    },
    allListModel() {
      return allListModel;
    },
    childItems() {
      let _items = [];

      for (var item of this.model.lists.items) {
        let _newparms = { ...item.params };
        _newparms = utility.setPrarmsData(_newparms, this.data);
        _items.push({ ...item, params: _newparms });
      }

      return _items;
    },
    currentEntry() {
      return this.childItems[0];
    }
  },
  created() {},
  props: ["model", "data"],
  data: () => ({
    shops: [],
    entryshow: false,
    ready: false,
    rejectIds: [],
     alertModel:{
        persistent: true,
        show: false,
        title:'',
        subtitle:'',
        type:'info',
        actions:{
          ok:{
            name:"Close",
          }
        }
      
    },
  }),
  methods: {
    selectChange(ids) {
      this.rejectIds = ids;
    },
    call(number) {
      window.location = "tel:" + number;
    },
 
    okClick(params){
      if(params.type == "success"){
        this.$router.go(-1)
      }

    },
    showUserInfo() {
      this.$refs.shopinfo.show({ ...this.data, info: true });
    },
    showItemDetail() {}
  }
};
</script>