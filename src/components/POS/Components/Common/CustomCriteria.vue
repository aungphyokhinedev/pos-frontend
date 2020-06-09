

<template>
<div>

<v-chip
v-if="!small"
outlined=""

      @click:close="remove"
        >
        
          <div class="mr-2" v-if="type=='color'" 
          :style="'border-radius:5px; height:10px;width:10px;background-color:' + model.value " />
    
     {{type!='number' ?model.label : model.value}}
      
     
    </v-chip>
<v-chip

v-if="small"
outlined=""
small=""
      @click:close="remove"
        >
        
          <div class="mr-2" v-if="type=='color'" 
          :style="'border-radius:5px; height:10px;width:10px;background-color:' + model.value " />
    
     {{type!='number' ?model.label : model.value}}
      
     
    </v-chip>

</div>
</template>

<script>
export default {
  props: ["type", "model", "small", "close"],
  computed: {
  },
  methods: {
      remove(params){
          alert(JSON.stringify(params))
      }
  },
  watch: {},
  data() {
    return {};
  }
};
</script>
<style scoped>
</style>