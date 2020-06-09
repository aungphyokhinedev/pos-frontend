


<template>

    <v-dialog   v-model="showDialogue" max-width="400">
  <v-card 
    :loading="loading"
   v-if="model"
  >
  <div class="pt-1"></div>
   <v-img
      v-if="model.logo"
      class="white--text align-end pa-1 mb-5"
      height="170px"
      :src="imageUrl + model.logo"
      gradient="to bottom left, #fff0, #0007"
    >
      <v-card-title>{{model.title}}  </v-card-title>
    </v-img>

   

    <v-card-title  v-if="!model.logo" class="pt-7">{{model.title}}

    </v-card-title>

    
    <v-card-text>
      <div  class="d-flex justify-space-between align-center mb-1"
      >
    
        <RatingPanel 
       
     style="max-width:250px;"
      v-on:opendialogue="close"
      v-on:closedialogue="open"
      :data="model"  :model="rateInfoModel" />
    
 <div class="d-flex align-end">       
<ReviewPanel
        style="max-width:50px;"
          v-on:opendialogue="close"
       v-on:closedialogue="open"
         :data="model"  :model="reviewInfoModel" />
          <CustomFavourite class="ml-2" :key="data._id" :model="favouriteModel" />
    </div>
         
      </div>
<div class="d-flex align-center">
      <div class="my-4 mt-0 mb-0 font-weight-bold ">
       {{model.subtitle}} 
      </div>
    
</div>
      <div class="mb-5" v-html="model.content"></div>
    
    </v-card-text>

 

 
  </v-card>
    </v-dialog>

</template>
<script>
import RatingPanel from "../Panel/RatingPanel"
import ReviewPanel from "../Panel/ReviewPanel"
import CustomFavourite from "../Common/CustomFavourite"
import constants from "../../../../common/constants";
  export default {
    components:{
      RatingPanel:RatingPanel,
      ReviewPanel:ReviewPanel,
      CustomFavourite:CustomFavourite
    },
    data: () => ({
      data: null,
      loading: false,
      selection: 1,
      showDialogue:false 
    }),
    computed:{
        imageUrl(){
            return constants.imageUrl
        },
        model(){
            return this.data;
        },
         customer(){
            return this.$store.state.pospublic.customer;
        },
        favouriteModel(){
        return{
          user: this.customer._id,
          store:"pospublic",
          type:"customerorderitem",
          transactionID: this.data._id
          } 
      },
        rateInfoModel() {
         if(!this.customer) return null
         return{
          uid: this.customer.customer,
          store:"pospublic",
          type:"positem",
          title: "Rate Our Service",
          subtitle: "If you love this service, please take a few seconds to rate your experience. It really helps!",
          }
          
      },
      reviewInfoModel(){
            if(!this.customer) return null
         return{
          uid: this.customer.customer,
          store:"pospublic",
          type:"positem",
          title: "Rate Our Service",
          subtitle: "If you love this service, please take a few seconds to rate your experience. It really helps!",
          }
      }
    },
    methods: {
       open(){
        this.showDialogue = true;
      },
      close(){
        this.showDialogue = false;
      },
      show(params){
     
          this.showDialogue = true;
          this.data = {...params}
          
      },
      reserve () {
        this.loading = true

        setTimeout(() => (this.loading = false), 2000)
      },
    },
  }
</script>