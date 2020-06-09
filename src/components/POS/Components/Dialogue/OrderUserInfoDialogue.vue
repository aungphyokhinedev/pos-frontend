<template>
<div>
    <v-dialog   v-model="data" max-width="400">
         <v-card
          :loading="loading"
   v-if="model"
    class="mx-auto pt-4 pb-4"
  >

    <v-list-item class="mb-4">
      <v-list-item-avatar color="primary">
          <v-icon  dark>mdi-account-outline</v-icon>
        <v-img v-if="model.photo" :src="imageUrl + model.photo"></v-img>
      </v-list-item-avatar>
      <v-list-item-content @click="editInfo">
        <v-list-item-title>{{model.name}} {{customer?"-"+customer.customerId : null}}</v-list-item-title>
        
        <v-list-item-subtitle>{{model.address}}, {{model.mobile}}</v-list-item-subtitle>
        
      </v-list-item-content>
    </v-list-item>

    <CustomLocationSelector
      v-on:change="changeLocation"
     :model="model.location"
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
     <EntryForm 
    title="Order Location"
    subtitle="Put your order location info"
    :items="orderLocationInputs" 
    v-on:save="saveData" 
    v-on:close="closeInput"
    ref="entry" />
</div>
</template>
<script>
import CustomLocationSelector from "../Common/CustomLocationSelector"
import EntryForm from "./EntryForm"
import constants from "../../../../common/constants";
  export default {
    components:{
      CustomLocationSelector:CustomLocationSelector,
      EntryForm:EntryForm
    },
    data: () => ({
      model: null,
      data: null,
      loading: false,
      selection: 1,
      customer: null,
      orderLocationInputs:[
          {
          index: 1,
          type: "text",
          label: "Mobile No.",
          icon: "mdi-phone-outline",
          value: "mobile",
          counter: 15,
          required: true,
          rules: [
            { rule: constants.mobileRule, message: "Invalid Mobile Number" }
          ]
        },
        {
          index:2,
          type: "text",
          label: "Order Address",
          icon: "mdi-home-outline",
          value: "address",
          counter: 50,
          required: true
        },

      ]
    }),
    created(){
     
    },
    computed:{
        imageUrl(){
            return constants.imageUrl
        },
       

    },
    methods: {
      async getCustomerInfo(){
         const _result = await this.$store.dispatch("posfrontend/getCustomer",{
           query:{_id: this.model.customer},
            nocache: true,
        })
        this.customer = _result;
      },
      saveData(params) {
        this.data = true
        this.model = {...params}
         this.$emit("change",params)
      },
      closeInput(){
        this.data = true
      },
      editInfo() {
        this.data = false;
        this.$refs.entry.edit(this.model)
      },
      saveInfo(){
        this.$emit("save",this.model)
      },
      changeLocation(params){
         let _data = {...this.model, location: params.value}
         this.model = _data
         this.$emit("change",_data)
      },
      show(params){
     
          this.model = {...params}
          this.getCustomerInfo()
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