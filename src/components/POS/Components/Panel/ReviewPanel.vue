<template>
<div class=" text-right" style="width:50px;" >
 <CustomReview
    :model="reviewInfoModel"
    v-on:click="showReviewForm"
    
/>
<ReviewDialogue
:model="reviewModel"
 v-on:ok="reviewSave" v-on:cancel="reviewCancel" ref="reviewdialogue" />
</div>
</template>
<script>
import ReviewDialogue from "../Dialogue/ReviewDialogue"
import CustomReview from "../Common/CustomReview"
  export default {
    components:{
      CustomReview:CustomReview,
      ReviewDialogue:ReviewDialogue
    },
    props:["model","data"],
    data: () => ({
      reviewData:null,
      reviewModel:{
          store:"pospublic",
          type:"posranking",
          collection:"posranking",
          populate:["customer"]
        }
    }),
    async mounted(){
      this.reviewData = await  this.$store.dispatch(this.model.store + "/rateInfo",{
             transactionID : this.data._id,
             type: this.model.type
         })
    },
    computed:{
        reviewInfoModel(){
            return this.reviewData ? {
                rate: this.reviewData.total > 0 ? this.reviewData.total / this.reviewData.count : 0,
                total:this.reviewData.count
            }:{
                rate:0,
                total:0
            }
        },
    },
    methods: {

    async reviewSave(params) {
       // eslint-disable-next-line no-console
       console.log(params)
    },
     reviewCancel() {
        this.$emit("closedialogue")
    },
    async showReviewForm(){  
       this.$emit("opendialogue")
        this.$refs.reviewdialogue.show({
            title: this.model.title,
            subtitle: this.model.subtitle,
            transactionID:this.data._id
        })
    },
     
    },
  }
</script>