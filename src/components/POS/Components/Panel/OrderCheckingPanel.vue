

<template>
  <div>

    <v-row no-gutters>
      <v-col dense>
        <v-flex v-if="model">
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
            <CheckList
              :key="item.value + data._id"
              :model="allListModel[item.scheme]"
              :data="item"
              :master="data"
              :editable="data.status == 'pending'"
              v-on:selectchange="selectChange"
              v-if="currentEntry && currentEntry.value == item.value"
            />
          </template>
        </v-flex>
      </v-col>
    </v-row>
    <OrderUserInfoDialogue ref="orderuserinfo" />

    <v-row v-if="displayData.status == 'pending'" no-gutters>
      <v-col>
        <v-btn @click="process('reject')" large tile block>Reject</v-btn>
      </v-col>
      <v-col>
        <v-btn @click="process('approve')" large class="primary" tile block>Approve</v-btn>
      </v-col>
    </v-row>

<BottomFixedButton v-if="displayData.status != 'pending'" v-on:click="addInfo()" icon="mdi-forum" />
    <AlertDialogue v-on:ok="okClick" :model="alertModel" />
  </div>
</template>

<script>
import constants from "../../../../common/constants";
import utility from "../../../../common/utility";
import allListModel from "../../model/Sale/AllListModel";
import CheckList from "../../Components/List/CheckList";
import OrderUserInfoDialogue from "../Dialogue/OrderUserInfoDialogue";
import AlertDialogue from "../Dialogue/AlertDialogue"
import BottomFixedButton from "../../Components/Common/BottomFixedButton"
export default {
  components: {
    CheckList: CheckList,
    OrderUserInfoDialogue: OrderUserInfoDialogue,
    AlertDialogue:AlertDialogue,
    BottomFixedButton
  },
  computed: {
    
    displayData() {
      let _data = { ...this.data };
      if (this.model.transform) {
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
    addInfo(){

    },
    selectChange(ids) {
      this.rejectIds = ids;
    },
    call(number) {
      window.location = "tel:" + number;
    },
    async process(status) {
       if(confirm("Are you sure to " + status + "?")){
        const _result = await this.$store.dispatch("posfrontend/orderProcess",{
            rejectIds: this.rejectIds,
            _id: this.data._id,
            status
        })
        if(_result){
          this.alertModel.type = "success"
          this.alertModel.title = "Processing done";
          this.alertModel.subtitle = "Order " + status + " done";
          this.alertModel.show = true;        

        }
       }
    },
    okClick(params){
      if(params.type == "success"){
        this.$router.go(-1)
      }

    },
    showUserInfo() {
      this.$refs.orderuserinfo.show({ ...this.data, info: true });
    },
    showItemDetail() {}
  }
};
</script>