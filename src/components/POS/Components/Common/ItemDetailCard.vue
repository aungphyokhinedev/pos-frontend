<template>
  <v-card class="mx-auto pa-1 pt-0" max-width="400" tile>
    <v-img
      v-if="photo"
      class="white--text align-end mb-5"
      height="170px" 
      :src="photo"
      gradient="to bottom left, #fff0, #0007"
    >
      <v-card-title>{{title}}</v-card-title>
    </v-img>
    <div
    class="pt-5"
      style=""
      v-if="!photo"
    >
      <v-card-title >{{title}}</v-card-title>
    </div>
   <v-card-subtitle class="font-weight-bold pa-4 pb-0 pt-0">
       Price: {{data.discountInfo.priceText}}
        <span v-if="data.discountInfo.totalDiscount > 0">
       {{data.discountInfo.detail}} {{data.discountInfo.discountText}}
     </span>
     </v-card-subtitle>
    <v-card-subtitle class="pa-4 pb-0 pt-0">{{description}}</v-card-subtitle>
    <v-card-subtitle class="pa-4 pb-0 pt-0">
     <div >
       Qty: {{data.qty}} {{model.unit}}
     </div>
     
    
 
    <div class="font-weight-bold  pt-0">
      <v-row no-gutters>
        <v-col>Total Amount</v-col>
        
        <v-col class="text-right">{{data.discountInfo.totalText}}</v-col>
      </v-row>
    </div>
    </v-card-subtitle>
    <v-card-text class="mt-2 text--primary pb-0"></v-card-text>
   
    <CustomNumberSlider
      class="mt-7 ml-4 mr-4 pb-0 mb-0"
    
      min="1"
      max="9"
      :model="{name:'quantity',value:data.qty}"
      v-on:change="changeQty"
    />

    <div class="text-center mb-6">
      <v-btn @click="submit" color="primary" text>{{actionName}}</v-btn>
    </div>
  </v-card>
</template>

<script>

import CustomNumberSlider from "../../Components/Common/CustomNumberSlider";
import calculateModel from "../../model/CalculateModel"
export default { 
  components: {
    CustomNumberSlider: CustomNumberSlider
  },
  props: ["title", "subtitle", "description", "photo", "action", "model"],
  created() {
    if(this.model){
       this.data = calculateModel.calculate(this.model);
    }
  
  },
  computed: {
    actionName() {
      if (this.model.updateFlag) {
        return "Update Quantity";
      } else {
        return this.action.label;
      }
    },

  
  },
  watch: {
    qty() {
      return this.data.qty;
    },
    amount() {
      return this.data.amount;
    }
  },
  methods: {
  
    changeQty(params) {
      this.data = { ...this.data };
      this.data.qty = parseInt(params.value);
      this.data.amount =
        parseInt(this.data.qty) * parseInt(this.data.discountInfo.totalAmount);
    },
    submit() {
    
      this.$emit("action", this.data);
    }
  },
  data: () => ({
    data: {}
  })
};
</script>
<style scoped>
</style>