

<template>
  <div  >
    <LoadingBar v-if="!ready" />
    <v-row v-if="ready" no-gutters>
      <v-col dense>
     

        <ItemList  :key="scheme + customer._id"  :model="listModel"  />
    
      </v-col>
      
    </v-row>
  </div>

</template>

<script>
import constants from "../../../../common/constants";
import Transaction from "../../model/Customer/AllListModel"
import ItemList from "../../Components/List/ItemList";
import LoadingBar from ".././Common/LoadingBar";
export default {
  components: {
    LoadingBar: LoadingBar,
    ItemList: ItemList,
  },
  computed: {
    scheme() {
        return this.$route.params.scheme;
    },
       customer(){
       return this.$store.state.pospublic.customer;
     },
    menuModel() {
    return {
      items: [
        { icon: "mdi-comment-check-outline", title: "Purchase Information", value: "1", list:"purchaseList" },
        { icon: "mdi-clipboard-list-outline", title: "Purchase Detail Information", value: "2", list:"purchaseDetailList" },
        { icon: "mdi-clipboard-list-outline", title: "Order Information", value: "3", list:"orderList" },
        { icon: "mdi-clipboard-list-outline", title: "Order Detail Information", value: "4", list:"orderDetailList" },
      ]
    }
    },
   listModel() {
        let _model = Transaction[this.scheme];
        if(_model && _model.query instanceof Function){
         
          _model.query =  _model.query(this.model);
        }
        
        return _model;
    },
    baseUrl() {
      return constants.baseUrl;
    }
  },
  async created() {
    await this.$store.dispatch("pospublic/clearState");
    await this.$store.dispatch("pospublic/getUser");
    this.ready = true;
  },
  props: {
    source: String
  },
  data: () => ({
    ready: false,
    currentEntry: null,
  }),
  methods: {
    menuChange(value) {
      this.currentEntry = value;
    },
  }
};
</script>


