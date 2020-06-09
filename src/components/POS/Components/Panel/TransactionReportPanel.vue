

<template>
  <div style="height:500px">
    <LoadingBar v-if="!ready" />

    <v-row v-if="ready" no-gutters>
      <v-col dense>
      
         <ItemList :key="scheme + customer._id"  :model="listModel"  />
      </v-col>

    </v-row>
  </div>
</template>

<script>
import constants from "../../../../common/constants";
import Transaction from "../../model/Transaction"
import ItemList from "../../Components/List/ItemList";
import LoadingBar from ".././Common/LoadingBar";

export default {
  components: {
    LoadingBar: LoadingBar,
    ItemList: ItemList,
  },
  props:["model"],
  computed: {
    scheme() {
        return this.$route.params.scheme;
    },
    listModel() {
        let _model = Transaction[this.scheme];
        if(_model && _model.query instanceof Function){
         
          _model.query =  _model.query(this.model);
        }
        
        return _model;
    },
     customer(){
       return this.$store.state.pospublic.customer;
     },
    baseUrl() {
      return constants.baseUrl;
    }
  },
  async created() {

    this.ready = true;
  },

  data: () => ({
    ready: false,
    
    currentEntry: null,

  }),
  methods: {
  }
};
</script>