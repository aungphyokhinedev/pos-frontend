
<template>
  <div >
      <div class="d-flex flex-wrap flex-direction-row" >
      
            <span v-for="(item,i) in model.items" :key="i">
            
                 <CustomCriteria   :type="item.type" :model="item" />
             </span>
      </div>
  
              </div>
</template>

<script>
import CustomCriteria from "./CustomCriteria"
export default {
props: ["model"],
components:{
    CustomCriteria
},
  data() {
    return {
    };
  }
};
</script>

<style scoped>

</style>