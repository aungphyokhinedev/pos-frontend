<template>
<div class="text-center mt-5 mb-3">
    <v-rating
          v-model="rate"
          color="yellow darken-3"
          background-color="grey darken-1"
          empty-icon="$ratingFull"
          half-increments
          hover
          size="20"
        ></v-rating>
</div>
</template>

<script>
export default {
    props:["model","value","label"],
    created() {
     this.rate = this.model
      
    },
    computed:{
    },
    watch: {
        rate(value){
            
            this.$emit("change", {name:this.value,value})
        }
    },
    methods:{
    },
    data: () => ({ 
      rate:null,
    }),
   
  }
</script>
<style scoped>
</style>