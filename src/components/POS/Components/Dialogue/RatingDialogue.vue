

<template>
  <div v-if="model" class="text-center">
    <v-dialog persistent v-model="isShow" max-width="400">
     <v-card
   class="pa-2"
   
  >
    <v-card-title
     
    >
    <v-row>
        <v-col class="pt-0 pb-0" >
      {{model.title}}
        </v-col>
     
       <v-btn  @click="cancel" small icon>
           <v-icon small>
               mdi-close
           </v-icon>
       </v-btn>
        
    </v-row>
    </v-card-title>
    <v-card-text class="pb-0">
       {{model.subtitle}}
<CustomRatingPicker v-on:change="changeRate" :model="rate" value="rate" />
      <div class="text-center mt-3 mb-5 ">
        <v-rating
          v-model="rate"
          color="yellow darken-3"
          background-color="grey darken-1"
          empty-icon="$ratingFull"
          half-increments
          hover
        ></v-rating>
      </div>
    </v-card-text>
  <div class="text-center">
     <v-btn
      class="ml-1 mb-3"
      @click="ok"
        color="primary"
        text
      >
        save
      </v-btn>
  </div>
    <v-card-actions class="center">
   
     
    </v-card-actions>
  </v-card>
    </v-dialog>
  </div>
</template>
<script>
import CustomRatingPicker from "../Common/CustomRatingPicker";
export default {
  components: {
    CustomRatingPicker
  },
  computed: {
  },
  data() {
    return {
      
        rate: 0,
        model: null,
        isShow:false
    };
  },
  methods: {
    changeRate(params){
      this.rate = params.value;
    },
    show(params){
        this.model = params
        this.rate = params.rating ? params.rating.rank : 0
        this.isShow = true
    },
    ok() {
        this.isShow = false
        this.$emit("ok",{...this.model,rating:this.rate })
    },
    cancel() {
        this.isShow = false
        this.$emit("cancel")
    },
  }
};
</script>
<style >
</style>