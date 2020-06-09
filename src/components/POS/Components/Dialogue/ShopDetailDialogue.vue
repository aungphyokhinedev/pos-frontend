


<template>
<div >
    <v-dialog   v-model="showDialogue" max-width="400">
  <v-card 
  class="pt-5  pb-0"
    :loading="loading"
   v-if="model"
  >

  <div class="pl-3 pr-3">

  <v-list-item>
      <v-list-item-avatar v-if="false" >
           <v-icon class="primary"  v-if="!data.logo" small dark >mdi-home</v-icon>
            <v-img 
            
    v-if="data.logo"
     
      :src="imageUrl + data.logo"
    ></v-img>
      </v-list-item-avatar>
      <v-list-item-content>
        <div class="d-flex align-center pl-1">
        <v-list-item-title class="title">{{data.title}}  </v-list-item-title>
     <CustomFavourite :key="data._id" :model="favouriteModel" />
        </div>
      </v-list-item-content>
    </v-list-item>

<v-card-text class="pl-5 pb-0 pt-0 text--secondary" v-html="data.subtitle + '<br/>' + data.content">
      
    </v-card-text>
    <CustomReview v-if="false" />
<v-card-text class="pb-0 pt-2">
    <v-row
    class="d-flex align-center"
    no-gutters=""
     
      >

      <RatingPanel 
     
      style="max-width:250px;"
      v-on:opendialogue="close"
      v-on:closedialogue="open"
       :data="data"  :model="rateInfoModel" />
     
        <v-spacer/>
       
       

        
      </v-row>

</v-card-text>
  </div>

    <v-card-text class="pb-3">
   
    <v-row
        
  
      >
      <v-col class="text-center pt-5 pb-5">
  
      <v-btn @click="goShop" text color="primary">
        Go Shopping
      </v-btn>
      </v-col>
      </v-row>
</v-card-text>

   
  </v-card>
    </v-dialog>

</div>
</template>
<script>
import RatingPanel from "../Panel/RatingPanel"
import CustomReview from "../Common/CustomReview"
import CustomFavourite from "../Common/CustomFavourite"
import constants from "../../../../common/constants";
  export default {
    components:{
      CustomReview:CustomReview,
      RatingPanel:RatingPanel,
      CustomFavourite:CustomFavourite
    },
    data: () => ({
      data: null,
      loading: false,
      selection: 1,
      showDialogue:false,
      ratingData:null,
     
    }),
     mounted(){
      
         
    },
    computed:{
      favouriteModel(){
        return{
          user: this.customer._id,
          store:"pospublic",
          type:"customershop",
          transactionID: this.data._id
          } 
      },
        rateInfoModel() {
         if(!this.customer) return null
         return{
          uid: this.customer.customer,
          store:"pospublic",
          type:"posshop",
          title: "Rate Our Shop",
          subtitle: "If you enjoy using services of our shop, please take a few seconds to rate your experience. It really helps!",
          } 
      },
        imageUrl(){
            return constants.imageUrl
        },
        model(){
            return this.data;
        },
         customer(){
            return this.$store.state.pospublic.customer;
        },
    },
    methods: {
      open(){
        this.showDialogue = true;
      },
      close(){
        this.showDialogue = false;
      },
      goShop(){
          this.$emit("order",this.data)
      },
      async show(params){
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