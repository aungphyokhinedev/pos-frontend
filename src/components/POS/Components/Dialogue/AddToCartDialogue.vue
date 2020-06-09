

<template>
  <div v-if="model" class="text-center">
    <v-dialog :key="model.id"  v-model="showDialogue" max-width="400">
      <v-card  class="mx-auto pa-5" outlined>
         <v-list-item two-line>
      <v-list-item-content>
        <div class="overline mb-1 ">{{model.title}}</div>
        <v-list-item-subtitle><p class="font-weight-bold subtitle-1">{{model.subtitle}}</p></v-list-item-subtitle>
      </v-list-item-content>

    
    </v-list-item>
<v-list-item>
   
       <CustomNumberSlider 
       v-on:change="changeQty"
        min=1 max=9 :model="sliderModel" style="width:100%" />
  </v-list-item>
       <div class="text-center mb-2">
              <v-btn  @click="save" color="primary" text>{{model.action.label}}</v-btn>
              
            </div>
       
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import CustomNumberSlider from "../Common/CustomNumberSlider"
export default {
  components: {
      CustomNumberSlider:CustomNumberSlider
  },
  computed: {
     sliderModel() {
       return {name:"qty",value:(this.model ? this.model.value : 1)}
     },
      qty() {
          return this.model && this.model.qty ? this.model.qty : 0
      },
      logo(){
          if(this.model.type=="info"){
            return "mdi-information-variant"
          }
          else{
              return "mdi-information-variant"
          }
      },
      label(){
          if(this.model.type=="info"){
            return "information"
          }
          else if(this.model.type=="success"){
              return "information"
          }
          else{
              return "warning"
          }
      }
  },
  data() {
    return {
        model: null,
       
        showDialogue : false
    };
  },
  methods: {
    changeQty(params){
    
        this.model = {...this.model, qty:params.value }
    },
    show(params) {
        this.showDialogue = true
        this.model = {...params}
     
        this.$emit("ok")
    },
    save() {
        this.showDialogue = false
        this.$emit("add", this.model)
    },
  }
};
</script>
<style >

</style>