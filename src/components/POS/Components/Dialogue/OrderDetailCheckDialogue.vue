


<template>

    <v-dialog   v-model="showDialogue" max-width="400">
  <v-card 
    :loading="loading"
   v-if="model"
  >
    <v-img 
    v-if="model.logo"
      height="200"
      :src="imageUrl + model.logo"
    ></v-img>

    <v-card-title class="pt-7">{{model.title}}</v-card-title>
    <v-card-text>

      <div class="my-4  mb-0">
       {{model.subtitle}}
      </div>

      <div class="mb-5" v-html="model.content"></div>
    </v-card-text>

 

 
  </v-card>
    </v-dialog>

</template>
<script>
import constants from "../../../../common/constants";
  export default {
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
        }

    },
    methods: {
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