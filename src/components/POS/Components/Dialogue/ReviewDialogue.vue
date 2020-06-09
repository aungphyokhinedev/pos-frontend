

<template>
  <div v-if="model" class="text-center">
   
    <v-dialog  v-model="isShow" max-width="500">
     <v-card
    class="pa-3 pl-0 pr-9"
   
  >

<div  class="overline pa-7">Customer Reviews</div>
 <div class="ml-7 mt-0 mb-10 body-2 font-weight-medium grey--text"  v-if="items.length == 0">
        This item has no review yet. You can be the first reviewer.
      </div>

    <v-list v-if="items.length > 0" class=" mb-12" dense="" >
      <template v-for="(item) in items">
        <v-subheader
          v-if="item.header"
          :key="item.header"
          v-text="item.header"
        ></v-subheader>

       
        <template>
        <v-list-item
        
          :key="item._id"
      
        >
          <v-list-item-avatar>
            <v-img v-if="item.avatar" :src="imageUrl + item.avatar"></v-img>
            <v-icon class="primary" dark v-if="!item.avatar">mdi-account</v-icon>

          </v-list-item-avatar>

          <v-list-item-content  >
           
            <v-list-item-subtitle  v-html="item.title"></v-list-item-subtitle>
            <v-flex class="caption" v-html="item.subtitle"></v-flex>
          </v-list-item-content>
        </v-list-item>
      
        </template>
      </template>
    </v-list>
     <v-flex v-if="items.length > 0"  v-intersect="onEnd"/>
   
   
    <!--
     <v-btn  @click="addReview"  style="position:absolute;right:15px; bottom:20px;" class="mx-2" fab dark color="primary">
      <v-icon  dark>mdi-message</v-icon>
    </v-btn>
-->
  </v-card>
    </v-dialog>
     <v-dialog persistent v-model="addingReview" max-width="400">
     <v-card
   class="pa-3"
   
  >

   
    <v-card-title
     
    >
    <v-row>
        <v-col class="pt-0 pb-0" >
      <DialogueTitle title="Add Your Review" subtitle="Put your review about our service" />
        </v-col>
       <v-btn  @click="closeAddReview" small icon>
           <v-icon small>
               mdi-close
           </v-icon>
       </v-btn>
        
    </v-row>
    </v-card-title>
    <v-card-text class="mt-0 pt-0 pb-0">
<v-textarea  label="Your Review" counter="150" v-model="reviewData" ></v-textarea>
    </v-card-text>
  
    <v-card-actions class="center mt-0 pt-0">
   
      <v-btn
      class=" ml-1 mb-5"
      @click="saveAddReview"
        color="primary"
        text
      >
        Save Review
      </v-btn>
    </v-card-actions>
  </v-card>
    </v-dialog>
  </div>
</template>
<script>
import DialogueTitle from "../Common/DialogueTitle";
import constants from "../../../../common/constants"
export default {
  components: {
    DialogueTitle:DialogueTitle
  },
  created(){
    
  },
   watch: {

    size() {
      this.getReviews();
    },
    currentReview(value){
      if(value) this.reviewData = value.review
    }
  },
  computed: {
      loginData() {
      return this.$store.state.poslogin.data;
    },
    customer(){
       return this.$store.state.pospublic.customer;
     },
    imageUrl() {
      return constants.imageUrl
    },
    items() {
      return this.reviews.map(review =>{
        return {
           title: "<span class='text--primary'>" + (review.customer ? review.customer.name  : null )+ "</span>",
           subtitle:review.review,
           avatar: review.customer ?  review.customer.photo  : null,
        }
       

      });
    },
    storeItems() {
      return this.$store.state[this.model.store].store[this.model.collection]
    },  
    query() {
      let _params = {};
      _params.nocache = true;
      _params.collection = this.model.collection;
      _params.page = this.page;
      _params.pageSize = this.size;
      _params.public = true;
      if(this.model.populate){
        _params.populate = this.model.populate
      }
     

      _params.query = this.model.query || {};
      _params.query = { transactionID: this.data.transactionID };

      
      return _params;
    },
  },
  props:["model"],
  data() {
    return {
      page:1,
      reviews: [],
       size: 5,
        data:null,
        reviewData: null,
        rate: 0,
        addingReview:false,
        isShow:false,
        total:0,
        currentReview: null
        
    };
  },
  methods: {
    next(){
      this.page++;
      this.getReviews()
    },
    onEnd(entries){
       if(entries[0].isIntersecting){
  
         this.next()
        }
    },
    async getUserReview() {
      let _query = {...this.query,page:1,pageSize:1}
      _query.query.customer = this.customer._id
      const _result = await this.$store.dispatch(this.model.store + "/getItems", _query);
     this.currentReview = _result.rows[0]
    
    },
    async getReviews() {

      const _result = await this.$store.dispatch(this.model.store + "/getItems", this.query);
      let _reviews = [...this.reviews];
      const _ids = _reviews.map(review=>review._id)
      _result.rows.map(review=>{
        if(_ids.indexOf(review._id) < 0){
          this.reviews.push({...review})
        }
      })
      this.total = _result.total;
     
    },
    async saveAddReview(){
      let _result = null
      if(this.currentReview && this.currentReview._id){
        _result = await  this.$store.dispatch(this.model.store + "/updateItem",{
             nocache:true,
             id: this.currentReview._id,
             review: this.reviewData,
              collection:"posranking"
            })
      }
      else{
        _result = await  this.$store.dispatch(this.model.store + "/addReview",{
             nocache:true,
             transactionID : this.data.transactionID,
             type: this.model.type,
             review: this.reviewData,
            
            })
      }
      
      if(_result){
         this.page = 1
         this.reviews = []
         await this.getReviews()
         this.isShow = true
         this.addingReview = false
      }
      
    },
    closeAddReview(){
      this.isShow = this.total > 0
      this.addingReview = false
    },
    addReview(){
    
        if(!this.loginData){
            alert("Please login to write a review")
            return
        }
      this.getUserReview()
      this.isShow = false
      this.addingReview = true
    },
    async show(params){
        
        this.data = params
        this.currentReview =  null
        this.reviewData = null
        this.reviews = []
        this.page = 1
        await this.getReviews()
        
        if(this.total == 0) {
          //this.addReview()
          this.isShow = true
        }
        else{
          this.isShow = true
        }
        
    },
   
  }
};
</script>
<style >
</style>