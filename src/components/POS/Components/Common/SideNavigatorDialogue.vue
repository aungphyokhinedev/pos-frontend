<template>
  <v-dialog v-model="dialog" max-width="400">
    <v-card v-if="model" class="pt-10 pb-10">
      <v-row no-gutters="" class="text-center">
        <v-col>
          <div>
       
            <div style="height:120px;" v-if="!avatar" @click="shuffleAvatar" >
            <barcode :size=120 style="width:120px;top:40px; position: absolute; left: 50%; margin-left: -60px;" :value="qr" 
                  hidelabel="true" 
                  />
            </div>
            <v-avatar v-if="avatar" @click="shuffleAvatar" color="primary" size="80">
              <v-icon x-large dark v-if="!model.data[model.title.photo]">{{model.title.icon}}</v-icon>
              <v-img
                v-if="model.data[model.title.photo]"
                :src="imageUrl + model.data[model.title.photo]"
              ></v-img>
            </v-avatar>
          </div>
          <div class="font-weight-bold ml-5 mt-2 mb-2">{{model.data[model.title.label]}}
            <v-btn  color="primary" class="mb-1"  icon small @click="updateUser">
            <v-icon>
              mdi-help-circle-outline
            </v-icon>
            </v-btn>
          </div>
<v-divider class="mb-1" />
          <v-btn  @click="changePassword" color="primary"   block text >Change Password</v-btn>
          <v-btn @click="logout" color="primary"  block text >Log Out</v-btn>
    <v-divider class="mt-1" />    
          <v-row no-gutters class="mt-3">
            <v-col>
              <div class="caption text-right">Privacy Policy .</div>
            </v-col>
            <v-col>
              <div class="caption text-left">Terms of Services</div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
import constants from "../../../../common/constants";
import barcode from "./CustomBarcodeGenerator"
export default {
  components:{
    barcode:barcode
  },
  computed: {
    imageUrl() {
      return constants.imageUrl;
    },
    qr(){
      return JSON.stringify({eid:this.model.data[this.model.title.qr]})
    }
  },
  methods: {
    shuffleAvatar() {

      this.avatar = !this.avatar
    },
    changePassword() {
      this.dialog = false;
      this.$emit("changepassword");
    },
    updateUser() {
      this.dialog = false;
      this.$emit("updateuser");
    },
    logout() {
      this.$emit("logout");
    },
    show(params) {
      this.dialog = true;
      this.model = params;
    }
  },
  data: () => ({
    dialog: false,
    model: null,
    avatar: true
  })
};
</script>