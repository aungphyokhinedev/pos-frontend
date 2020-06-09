<template>
  <v-dialog v-model="dialog" max-width="400">
    <v-card v-if="customer" class="pt-12 pb-3">
      <v-row no-gutters="" class="text-center">
        <v-col>
          <div>
           

            <v-avatar  color="primary" size="80">
              <v-icon x-large dark v-if="!customer.photo">mdi-account</v-icon>
              <v-img
                v-if="customer.photo"
                :src="imageUrl + customer.photo"
              ></v-img>
            </v-avatar>
          </div>
          <div class="font-weight-bold mt-3">{{customer.name}}</div>
          <div >{{customer.customerId}}</div>
 <v-divider class="mt-5 mb-3" />
          <v-btn text @click="removeCustomer" color="primary" class="mb-2" >Remove</v-btn>
         
       
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
import constants from "../../../../common/constants";
export default {
  components:{
  },
  computed: {
    imageUrl() {
      return constants.imageUrl;
    },
     customer() {
      return this.$store.state.posfrontend.customer;
    },
  },
  methods: {
    
    removeCustomer() {
      this.$store.dispatch("posfrontend/clearCustomer")
      this.dialog = false;
      
    },
    show() {
      this.dialog = true;
    }
  },
  data: () => ({
    dialog: false,
  })
};
</script>