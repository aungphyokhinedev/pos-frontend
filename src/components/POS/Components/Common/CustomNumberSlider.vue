<template>
<div>
  
<v-row  no-gutters="">
         <v-col >
        <v-subheader v-if="label" class="pl-0 pl-2 pr-2 pb-0 mb-0">{{label}}</v-subheader>
        <v-slider
     
       class="mt-0"
        color="primary"
        :max="max"
        :min="min"
        v-if="sliderMode"
        dense
      thumb-size="25"
          v-model="slider"
          thumb-label="always"
        ></v-slider>
         <v-text-field 
         
          v-if="!sliderMode"
         dense
        color="primary"
         placeholder="Total Quantity"
         type="number"
          class="pt-0 mt-0 pl-2 pr-2"
          v-model="slider"></v-text-field>
      </v-col>
    
      
    </v-row>
</div>
</template>

<script>
export default {
    props:["model","label", "min","max"],
    created() {
     
      this.slider = this.model.value || 1
    },

    computed:{
  sliderEnable(){
      return this.$store.state.poscommon.settings ?
      this.$store.state.poscommon.settings.saleSliderEnable :
      null
    },
    sliderMode(){
      return this.showSlider && this.sliderEnable
    }
    },
    watch: {
      slider(){
        if(this.slider >= this.max){
          this.showSlider = false
        }
        this.$emit("change", {name: this.model.name,value:this.slider});
      }
    },
    methods:{
  sliderShuffle(){
      this.$store.dispatch("poscommon/setSettings", {
        name: "saleSliderEnable",
        value: !this.sliderEnable
      });

    },
    },
    data: () => ({ 
      slider: null,
      showSlider: true
    }),
   
  }
</script>
<style scoped>
</style>