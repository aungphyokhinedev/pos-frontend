<template>
<div>

     <v-text-field dense v-bind="$attrs" :counter="length" v-model="datamodel" @change="change"
              ></v-text-field>
</div>
</template>

<script>
export default {
    props:["model","value", "length"],
    created() {
      this.datamodel = this.model
    },
    computed:{
    },
    watch: {
      model(value) {
        this.datamodel = value
      }
    },
    methods:{
      change(){
        this.$emit("change", {name:this.value,value:this.datamodel});
      }

    },
    data: () => ({ 
      datamodel: null
    }),
   
  }
</script>
<style scoped>
</style>