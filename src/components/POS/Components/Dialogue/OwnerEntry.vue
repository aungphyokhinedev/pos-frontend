<template>
  <div class="text-center">
    <v-dialog v-model="dialog" max-width="400" persistent>
      <v-card class="mx-auto" outlined>
         <v-flex class="mt-5 mr-5" style="text-align:right">
           <v-btn @click="close()" icon small>
            
            <v-icon x-small  >mdi-close</v-icon>
             </v-btn>
         </v-flex>
        <v-flex v-if="!isFinish" class="ma-8 mt-0">
          <v-row no-gutters="">
            
            <v-col class="flex">
              <v-row class="align-center">
                
     
    <v-col>
     <DialogueTitle title="Say something about your business"
     subtitle="Add owner's information" />
             
               </v-col>
              </v-row>
              <CustomTextField
                v-if="step == 1"
                v-model="owner.name"
                append-icon="mdi-account-outline"
                label="Name"
              ></CustomTextField>
              <CustomTextField
                v-if="step == 2"
                v-model="owner.companyName"
                append-icon="mdi-comma-box-outline"
                label="Company Name"
              ></CustomTextField>

              <CustomTextField
                v-if="step == 3"
                v-model="owner.mobile"
                append-icon="mdi-phone-outline"
                label="Mobile No."
              ></CustomTextField>
              <CustomTextField
                v-if="step == 4"
                v-model="owner.email"
                append-icon="mdi-email-open-outline"
                label="Email"
              ></CustomTextField>
               <CustomTextField
                v-if="step == 5"
                v-model="owner.description"
                append-icon="mdi-comment-processing-outline"
                 label="Description"
              ></CustomTextField>
              <v-row>
                <v-col class="d-flex justify-center">
                  <v-btn  v-if="hasPrevious" text @click="previous">Previous</v-btn>
                  <v-btn  color="primary" text @click="next">Continue</v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-flex>

        <v-flex class="ma-8 mt-0" v-if="isFinish">
             <DialogueTitle title="Say something about your business"
     subtitle="Upload your company logo" />
          
         
         <PhotoUpload :file="companyLogo" v-on:change="changeLogo"/>
          <v-row>
            <v-col class="d-flex justify-center">
              <v-btn color="primary" text @click="finish">Save & Finish</v-btn>
            </v-col>
          </v-row>
        </v-flex>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import DialogueTitle from "../Common/DialogueTitle";
import CustomTextField from "../Common/CustomTextField";
import PhotoUpload from "../Common/PhotoUpload";
export default {
  components: {
    CustomTextField: CustomTextField,
    DialogueTitle:DialogueTitle,
    PhotoUpload:PhotoUpload
  },
  computed: {
      hasPrevious() {
          return this.step > 1;
      },
      isFinish() {
          return this.step == this.endstep;
      },
      companyLogo() {
        return this.owner ? this.owner.logo: null
      },
      
  },
  data() {
    return {
      step: 1,
      endstep: 5,
      owner: {},
      dialog: false,
    };
  },
  methods: {
    next() {
      this.step += 1;
    },
    previous() {
      this.step -= 1;
    },
    show() {
      this.dialog = true;
    },
    close() {
      this.step = 1
      this.dialog = false;
    },
    edit(value) {
      this.dialog = true;
      this.owner = value;
    },
    changeLogo(value){
      this.owner = {...this.owner, logo: value}
    },
    finish(){
      this.dialog = false;
      this.step = 1;
      this.$emit('save', this.owner)
    }
  }
};
</script>
<style >
.v-stepper__content {
  border-left: none;
}
</style>