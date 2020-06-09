

<template>
<div >

 <div>
           <v-icon  class="ml-3" v-if="model.total == 0">mdi-bell-outline</v-icon>
      
       </div>
       <div>  <v-badge
       overlap=""
      class="mr-3"
          color="deep-purple accent-4"
          :content="model.total"
          v-if="model.total > 0"
        >
       
          <v-icon class="ml-3 mr-1 mt-1" @click="iconClick">mdi-bell-outline</v-icon>
       
        </v-badge>
  </div>
    </div>
</template>

<script>
export default {
    props:["model"],
    methods:{
        iconClick() {
            this.$emit("click")
        }
    }
  }
</script>
<style scoped>
</style>