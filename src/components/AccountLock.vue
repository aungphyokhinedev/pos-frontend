<template>
  <v-content>
    <v-container fluid>
      <v-progress-linear v-if="loading1" indeterminate color="primary"></v-progress-linear>
      <v-alert v-if="error" dense text type="error">
        <v-row align="center" justify="space-between">
          {{error}}
          <v-icon class="mx-2" color="error" small @click="clear()">close</v-icon>
        </v-row>
      </v-alert>
      <v-alert v-if="success" dense text type="info">
        <v-row align="center" justify="space-between">
          {{success}}
          <v-icon class="mx-2" color="info" small @click="clear()">close</v-icon>
        </v-row>
      </v-alert>
    
 
      <v-card>
        <v-card-title>
          <span class="title1">Lock Getting</span>
          <v-spacer />
          <v-icon small>help_outline</v-icon>
       
        </v-card-title>

        <v-card-text>
          <v-col cols="12" style="padding:0">
            <v-text-field
              dense
              v-model="getLockData.resources"
              label="Resources"
              append-icon="text_format"
              :counter="50"
            ></v-text-field>
            <v-text-field
              dense
              v-model="getLockData.duration"
              type="number"
              label="Duration"
              append-icon="text_format"
              :counter="50"
            ></v-text-field>
           
          </v-col>

          <v-row align="center" justify="center">
            <v-btn color="primary" dark @click="getLock">Get Lock</v-btn>
           
          </v-row>
        
        </v-card-text>
      </v-card>
        <v-alert v-if="getdata"   dense text type="error">
        <v-row align="center" justify="space-between">
          {{getdata}}
          <v-icon class="mx-2" color="info" small @click="clear()">close</v-icon>
        </v-row>
      </v-alert>
    <v-progress-linear v-if="loading2" indeterminate color="primary"></v-progress-linear>
          <v-card style="margin-top:5px;">
        <v-card-title>
          <span class="title1">Lock Checking</span>
          <v-spacer />
          <v-icon small>help_outline</v-icon>
       
        </v-card-title>

         <v-card-text>
          <v-col cols="12" style="padding:0">
            <v-text-field
              dense
              v-model="checkLockData.resources"
              label="Resources"
              append-icon="text_format"
              :counter="50"
            ></v-text-field>
          
           
          </v-col>

          <v-row align="center" justify="center">
             <v-btn color="primary" dark @click="checkLock">Check Lock</v-btn>
          </v-row>
       
        </v-card-text>
      </v-card>
       <v-alert v-if="checkdata" dense text type="error">
        <v-row align="center" justify="space-between">
          {{checkdata}}
          <v-icon class="mx-2" color="info" small @click="clear()">close</v-icon>
        </v-row>
      </v-alert>
  
   
    </v-container>
  </v-content>
</template>

<script>
export default {
  computed: {
    loading() {
      return this.$store.state.accountlock.loading;
    },
    success() {
      return this.$store.state.accountlock.success;
    },
    error() {
      return this.$store.state.accountlock.error;
    },
    getdata() {
      return this.$store.state.accountlock.getdata;
    },
    checkdata() {
      return this.$store.state.accountlock.checkdata;
    },
  },
  watch: {
    error() {
      this.showError = true;
    }
  },
  created() {
    this.$store.dispatch("accountlock/clearState");
  },
  methods: {
    async clear() {
      this.$store.dispatch("accountlock/clearState");
    },
    async getLock() {
        this.loading1 = true;
        await this.$store.dispatch("accountlock/getLock", this.getLockData)
         this.loading1 = false;
    },
    async checkLock() {
         this.loading2 = true;
        await this.$store.dispatch("accountlock/checkLock", this.checkLockData)
         this.loading2 = false;
    },
    
  },
  data: () => ({
      getLockData: {},
      checkLockData: {},
      loading1: false,
      loading2: false
  })
};
</script>