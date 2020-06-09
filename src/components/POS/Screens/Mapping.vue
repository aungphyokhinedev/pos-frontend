

<template>    
<div>

        <MappingPanel v-if="currentItem" :model="scheme" :data="currentItem" />
</div>
</template>

<script>
import allMappingModel from '../model/AllMappingModel'
import MappingPanel from "../Components/Panel/MappingPanel";
export default {
  components: {
    MappingPanel: MappingPanel,
  },
  async mounted() {
   await this.$store.dispatch( this.store + "/clearState");
   await  this.$store.dispatch(this.store + "/getCurrentItem", {
        id: this.id,
        collection: this.scheme.collection
    });
  },
  watch: {
  },
  methods: {
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
    currentItem() {
      return this.$store.state[this.store].currentItem;
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
  })
};
</script>