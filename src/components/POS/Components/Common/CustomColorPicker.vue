<template>
  <v-row no-gutters class="mb-4 ml-8 mr-8 mt-5">
    <v-col v-for="(item,i) in colors" :key="i" sm="2" class="mb-2">
      <v-btn  @click="select(i)" class="mx-2 elevation-1 border-outline"  
      fab :dark="tinycolor(item.value).isDark()" small :color="item.value">
        <v-icon v-if="current == i" 
        >mdi-check</v-icon>
      </v-btn>
      
    </v-col>
 <v-col sm="2" class="mb-2">
      <v-btn :dark="isDark" :style="'background-color:' + (customColor ?  customColor :'transparent') + ';'"
        @click="newColor" outlined="" class="mx-2 elevation-0"   fab icon small>
        <v-icon >{{customColor ?'mdi-check' :'mdi-plus'}}</v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import tinycolor from "tinycolor2"
export default {
  props: ["model", "value"],
  created() {
    if(this.model){
      let found = false
       for(var i = 0; i < this.colors.length; i++){
           if(this.colors[i].value == this.model){
               this.current = i
               found = true
           }
       }
       if(!found){
         this.customColor = this.model
       }
    }  
  },
  computed: {
    tinycolor(){
      return tinycolor
    },
    isDark(){
      if(this.customColor){
        return tinycolor(this.customColor).isDark();
      }
      else{
        return false
      }
      
    }
  },
  watch: {
    current(value){
        this.$emit("change", { name: this.value, value: this.colors[value].value });
    }
  },
  methods: {
    select(i) {
      this.customColor = null
      this.current = i
    },
    newColor(){
      let _color = prompt("Please put your custom color code (eg. #340005)");
   
      if(tinycolor(_color).isValid){
        this.customColor = _color
        this.current = null
        this.$emit("change", { name: this.value, value: _color });
      }
      else{
        alert("Invalid color code")
      }
    }
  },
  data: () => ({
    customColor: null,
    datamodel: null,
    current: null,
    colors: [
      //{ value: "secondary", checked: false },
      { value: "#d81b60", checked: false },
      { value: "#3f51b5", checked: false },
      { value: "#1976d2", checked: false },
      { value: "#673ab7", checked: false },
      { value: "#fb8c00", checked: false },
      { value: "#d32f2f", checked: false },
      { value: "#546e7a", checked: false },
      { value: "#00796b", checked: false },
      { value: "#afb42b", checked: false },
      { value: "#000000", checked: false },
      { value: "#ffffff", checked: false }
    ]
  })
};
</script>
<style scoped>

</style>