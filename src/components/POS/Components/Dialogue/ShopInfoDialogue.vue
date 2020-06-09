<template>
    <v-dialog   v-model="data" max-width="400">
         <v-card
          :loading="loading"
   v-if="model"
    class="mx-auto pt-4 pb-4"
  >

    <v-list-item class="mb-4">
      <v-list-item-avatar color="primary">
          <v-icon  dark>mdi-home-outline</v-icon>
        <v-img v-if="model.shop.logo" :src="imageUrl + model.shop.logo"></v-img>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>{{model.shop.name}} </v-list-item-title>
        
        <v-list-item-subtitle>{{model.shop.address}}, {{model.shop.mobile}}</v-list-item-subtitle>
        
      </v-list-item-content>
    </v-list-item>

    <CustomLocationSelector
      v-on:change="changeLocation"
     :model="model.shop.location"
     value="location"
                />


 
    <div class="text-center ma-1 mb-3 mt-5">
      <v-btn
        v-if="!model.info"
        text
        color="deep-purple accent-4"
        @click="saveInfo"
      >
        Continue
      </v-btn>
      <v-btn
        v-if="model.info"
        text
        color="deep-purple accent-4"
        @click="close"
      >
        Close
      </v-btn>
   
    </div>
  </v-card>
    </v-dialog>

</template>
<script>
import CustomLocationSelector from "../Common/CustomLocationSelector"
import constants from "../../../../common/constants";
  export default {
    components:{
      CustomLocationSelector:CustomLocationSelector
    },
    data: () => ({
      model: null,
      data: null,
      loading: false,
      selection: 1,
    }),
    computed:{
        imageUrl(){
            return constants.imageUrl
        },
       

    },
    methods: {
      saveInfo(){
        this.$emit("save",this.model)
      },
      changeLocation(){

      },
      show(params){
     
          this.model = {...params}
          this.data = true;
      },
      close(){
          this.model = null
          this.data = false;
      },
      reserve () {
        this.loading = true

        setTimeout(() => (this.loading = false), 2000)
      },
    },
  }
</script>