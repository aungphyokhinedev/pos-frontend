<template>
  <v-content>
    <v-container fluid>
 <v-progress-linear
 v-if="loading"
      indeterminate
      color="primary"
    ></v-progress-linear>
    <v-alert
      v-if="error"
      dense
      text
      type="error"
    >
    <v-row align="center" justify="space-between">
{{errorMsg}}
<v-icon class="mx-2" color="error" small @click="clearError()">
  close
</v-icon>
    </v-row>
      
    </v-alert>


 <v-card >
            <v-card-title>
              <span class="title1">Check Application's Rules</span>
              <v-spacer />
              <v-icon small>help_outline</v-icon>
              
            </v-card-title>

            <v-card-text>
              <v-col cols="12" style="padding:0">
             
                <AutoComplete
                label="Application"
                service="application"
                 v-bind:select="checkItem.application"
                 v-on:change="changeApplication"
                 />
                  <AutoComplete
                label="User"
                service="auth"
                searchBy="email"
                 v-bind:select="checkItem.user"
                 v-on:change="changeUser"
                 />
              
            
              
              </v-col>
              
              <v-row  align="center" justify="center">
                <v-btn color="primary" dark @click="check">Check Permission</v-btn>
              </v-row>
             
            </v-card-text>
          </v-card>

  
    <v-dialog
      v-model="dialog"
      width="400"
    >
    
      <v-card>
       

        <v-card-text>
            
 <v-list dense>
      <v-subheader>Permission Status</v-subheader>
      <v-list-item-group  color="primary">
        <v-list-item
          v-for="(item, i) in result"
          :key="i"
        >
         
          <v-list-item-content>
            <v-list-item-title v-text="item.service"></v-list-item-title>
            <v-list-item-subtitle>
               Read: {{item.read}},Create: {{item.create}},Update: {{item.update}},
               Delete: {{item.delete}},
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>


        </v-card-text>

       
      </v-card>
    </v-dialog>
 
      
      
    </v-container>
  </v-content>



</template>

<script>
import AutoComplete from '../components/AutoComplete';
export default {
  components: {
    'AutoComplete': AutoComplete,
  },
  computed: {
    loading() {
      return this.$store.state.user.loading;
    },
    error() {
      return this.$store.state.user.error;
    },
    result() {
       // let items = [];
        let result = this.$store.state.checkAppPermission.result;
      
        return result;
    },
   
  },
  watch: {
    error(){
      this.showError = true
    },
  },
  created() {
    this.$store.dispatch("checkAppPermission/clearState");
  
  },
  methods: {
    changeUser(value) {          
          this.checkItem.user = value;
      },
       changeService(value) {          
          this.checkItem.service = value;
      },
       changeApplication(value) {          
          this.checkItem.application = value;
      },
    async clearError() {
       this.$store.dispatch("checkAppPermission/clearState");
    },
   
   
    async check() {
      var data = {
        userid: this.checkItem.user._id,
        application: this.checkItem.application.name,
        service: "*"
      };
    
      // Dispatch the action to buy a TV
      await this.$store.dispatch("checkAppPermission/check",data);
      this.dialog = true;
    },

   
   

  },
  data: () => ({
      dialog: false,
      checkItem: {}
  })
  
};
</script>