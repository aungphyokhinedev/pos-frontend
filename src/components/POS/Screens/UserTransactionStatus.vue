

<template>    
<div>

        <UserCheckPanel :key="id" v-if="dataItem" :model="scheme" :data="dataItem" />

</div>
</template>

<script>
import allMappingModel from '../model/Customer/AllMappingModel'
import UserCheckPanel from "../Components/Panel/UserCheckPanel";
export default {
  components: {
    UserCheckPanel: UserCheckPanel,
  }, 
  async created() {

   this.refresh()
   
  },
  watch: {
   
    id(){
     this.refresh()
    }
  },
  methods: {
    async refresh(){
      await this.$store.dispatch( this.store + "/clearState");
   this.currentItem = await  this.$store.dispatch(this.store + "/getCurrentItem", {
        nocache: true,
        id: this.id,
        collection: this.scheme.collection,
    });
       if(this.scheme.extraItems){
           for(const _item of this.scheme.extraItems){
         
           const _extra = await  this.$store.dispatch(this.store + "/getCurrentItem", {
            nocache: true,
            id: this.currentItem[_item.id],
            collection: _item.collection,
           });
          
         
           const _data = {...this.extra}
           _data[_item.id] = _extra
           this.currentItem ={...this.currentItem,..._data}
         
      }
    }
    }
  
  },
  computed: {

    store() {
      return this.scheme.store
    },
    scheme() {
        return allMappingModel[this.$route.params.scheme];
    },
    id() {
        return this.$route.params.id;
    },
    allMappingModel() {
        return allMappingModel
    },
    dataItem() {
     return {...this.currentItem,...this.extra}
    },
  
    alertModel(){
     return{store:this.scheme.store} 
   }
   
  },
  props: {
    source: String
  },
  data: () => ({
    selected: {},
    extra: {},
    currentItem: null
  })
};
</script>