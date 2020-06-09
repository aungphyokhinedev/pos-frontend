


<template>
<div style="width:400px;" >
         <CustomRating
       
        :model="ratingModel"
         v-on:click="showRatingForm" />
<RatingDialogue  v-on:ok="rateSave" v-on:cancel="rateCancel" ref="ratingdialogue1" />
 <EntryForm 
    title="Rate Our Service"
    subtitle="If you love this service, please take a few seconds to rate your experience. It really helps!"
    :items="rateModel" 
    v-on:save="rateSave" 
    ref="ratingdialogue" />
   
</div>
</template>
<script>
import RatingDialogue from "../Dialogue/RatingDialogue"
import EntryForm from "../Dialogue/EntryForm"
import CustomRating from "../Common/CustomRating"
  export default {
    components:{
      CustomRating:CustomRating,
      RatingDialogue:RatingDialogue,
      EntryForm
    },
    props:["model","data"],
    data: () => ({
      ratingData:null,
      rateModel:[
           {
          index: 1,
          type: "ratepicker",
          label: "Rate Service",
          icon: "mdi-home-outline",
          value: "rank",
          counter: 50,
          required: true
        },
           {
          index: 2,
          type: "text",
          label: "Review",
          icon: "mdi-comment-processing-outline",
          value: "review",
          counter: 50,
          required: true
        },
      ]
    }),
    async created(){
     
         this.getRateInfo()
    },
    watch:{
       async id(){
           this.getRateInfo()
        }
    },
    computed:{
         loginData() {
      return this.$store.state.poslogin.data;
    },
        id(){
            return this.data._id
        },
        ratingModel(){
            return this.ratingData ? {
                rate: this.ratingData.total > 0 ? this.ratingData.total / this.ratingData.count : 0,
                total:this.ratingData.count
            }:{
                rate:0,
                total:0
            }
        },
    },
    methods: {
    async getRateInfo(){
        this.ratingData = await  this.$store.dispatch(this.model.store + "/rateInfo",{
             transactionID : this.data._id,
             type: this.model.type
         })
    },
    async rateSave(params) {
        this.$emit("closedialogue")
        if(params._id){
            await  this.$store.dispatch(this.model.store + "/updateItem",{
             nocache:true,
             id:params._id,
             rank: params.rank,
             review: params.review,
             collection:"posranking",
             
            })
        }
        else{
            await  this.$store.dispatch(this.model.store + "/addItem",{
             nocache:true,
             type: this.model.type,
             transactionID : this.data._id,
             rank: params.rank,
             review: params.review,
             collection:"posranking",
             
            })
        }
        
        this.getRateInfo()
        
    },
     rateCancel() {
        this.$emit("closedialogue")
    },
    
    async showRatingForm(){
       if(!this.loginData){
           alert("Please login to give rating.")
           return
       }
        const _rateInfo = await  this.$store.dispatch(this.model.store + "/findItems",{
             nocache:true,
             collection:"posranking",
             query: {transactionID : this.data._id,
             type: this.model.type,
             uid: this.model.uid}
           
        })
       this.$emit("opendialogue")
        const _rate = _rateInfo.rows.length > 0 ? _rateInfo.rows[0] : null
        if(_rate){
            this.$refs.ratingdialogue.edit(_rate)
        }
        else{
            this.$refs.ratingdialogue.show()
        }
/*
        this.$refs.ratingdialogue.show({
            title: this.model.title,
            subtitle: this.model.subtitle,
            rating: _rate,
            _id: _rate ? _rate._id: null,
            transactionID:this.data._id
        })
        */
    },
     
    },
  }
</script>