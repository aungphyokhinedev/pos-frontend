<template>
  <div>
       <CustomAutoComplete 
       v-if="!data"
                  label="Select Criteria Scheme"
                 
                  collection="poscriteria"
                  v-bind:select="selectScheme"
                  v-on:change="changeScheme"
                 :findBy="['name']"
                 store="posadmin"
                />

     <div  v-if="data" class="mt-5 mb-5 d-flex flex-direction-row justify-space-between" >  
      <v-btn class="pa-0" @click="selectOptions" color="primary" small="" text>
        select scheme <v-icon small>mdi-chevron-down</v-icon>
      </v-btn>
       <v-btn @click="deleteOptions" color="primary" small="" outlined="" icon>
        <v-icon small>
           mdi-delete-outline
        </v-icon>
      </v-btn>
      
     </div>       
   <CriteriaEntry
   :key="data"
   class="mb-5 "
   v-if="data"
           :value="value"
                  :model="data"
                  v-on:change="changeValue"
           />


  </div>
</template>

<script>

import CriteriaEntry from "../Common/CriteriaEntry"
import CustomAutoComplete from "../Common/CustomAutoComplete"
export default {
  components: {
    CriteriaEntry,
    CustomAutoComplete
  },
  mounted() {
     if(this.model){
      
       this.data = this.model
     }

  },
  props:["model","value"],
  computed: {
   
  },
  watch: {
  },
  methods: {
     selectOptions(){
      this.data = null
    },
    deleteOptions(){
      this.data = null
      this.$emit("change", { name: this.value, value:null});
    },
   changeValue(value){
       this.$emit("change", value);
   },
   changeScheme(params){
    this.data = null
       if(params.value.data){
         this.data = params.value.data
        this.$emit("change", { name: this.value, value:params.value.data});
       }
      
   }
  },
  data: () => ({
      criterias:[],
      selectScheme: null,
      data: null
  })
};
</script>

<style lang="scss">
</style>