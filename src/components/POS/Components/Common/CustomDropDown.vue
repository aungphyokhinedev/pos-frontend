<template>
<div>
<v-combobox
          v-model="select"
          :items="items"
          :label="label"
          :multiple="multiple"
          @change="change"
        ></v-combobox>
</div>
</template>

<script>
export default {
    props:["model","value","items","label","multiple"],
    created() {
      this.select = this.model
    },
    computed:{
    },
    watch: {

    },
    methods:{
      change(){
        if(this.items.indexOf(this.select)>=0){
          this.$emit("change", {name:this.value,value:this.select});
        }
        
      }

    },
    data: () => ({ 
      select: null
    }),
   
  }
</script>
<style scoped>
</style>