<template>
  <v-content>
    <v-container fluid>
  <v-row >
     
               <v-col  class="col-md-12">
                 <v-card >
                      <v-card-text>
 <v-slider
          v-model="max"
          :label="testcount + ' Requests Count'"
        >
        </v-slider>
            <v-switch  v-model="parallel" label="Run Parallel"></v-switch>
               </v-card-text>
                </v-card >
               </v-col>
      </v-row >           
      <v-row >
         
               <v-col  class="col-md-6">
            

 <v-card >
              <v-alert color="primary" dense type="error">
                 
     Test with white listed correlationId to prevent locking.
    </v-alert>  
  
                <v-card-text>
                    <b>Validation Test</b>
                  <v-text-field
                  dense=""
                          v-model="cid"
                          append-icon="text_format"
                          label="Correlation ID"
                        ></v-text-field>
                        
                        <span v-if="testduration">Result TP/s {{testduration}}</span>
                       
                 
                </v-card-text>
              <div class="text-center">
                  <v-btn color="primary"  @click="verifyLoadTest">START TESTING</v-btn>
                 
                </div>
                <v-card-actions></v-card-actions>
              </v-card>
 </v-col>
  <v-col no-gutters=""  class="col-md-6">
         
<v-card  style="margin-bottom: 10px;">
               
  <v-alert color="primary" dense type="error">
           
      It will populate fake data in your database.
    </v-alert>
    
                <v-card-text>
                   <b>Entry Test</b><br/>
                
                         <span v-if="testduration">Result TP/s {{testduration}}</span>
                  
                </v-card-text>
                
   
                         <div class="text-center">
                  <v-btn color="primary"  @click="entryLoadTest">START TESTING</v-btn>
                 
                </div>
                <v-card-actions></v-card-actions>
              </v-card>
               </v-col>
 </v-row>
   
    </v-container>
  </v-content>
</template>

<script>
import faker from 'faker'
export default {
  computed: {

  },
  watch: {
    max(val) {
      this.testcount = val * 1000;
    }

  },
  created() {
   
  },
  methods: {
     async validateParallelTest() {
      var promises = [];
      var start = Date.now(); 
      for(var i=0;i<this.testcount;i++){
         promises.push(
             this.verify()
         );
         
      }
      await Promise.all(promises);
      var end = Date.now();
      var tps = this.testcount /( (end - start) / 1000);
    
      this.testduration = Math.round(tps);

    },
    verifyLoadTest() {
      if(this.parallel){
        this.validateParallelTest()
      }
      else{
        this.validateTest()
      }
    },
    entryLoadTest() {
      if(this.parallel){
        this.entryParallelTest()
      }
      else{
        this.entryTest()
      }
    },
    async entryParallelTest() {
      var promises = [];
      var start = Date.now(); 
      for(var i=0;i<this.testcount;i++){
         promises.push(
             this.create()
         );
         
      }
      await Promise.all(promises);
      var end = Date.now();
      var tps = this.testcount /( (end - start) / 1000);
    
      this.testduration = Math.round(tps);

    },
     verify() {
     return this.$store.dispatch("user/verify", {
         id:this.cid, 
         token: faker.random.number(),
         channel: 'load test'
         });

   },
   create() {
     return  this.$store
          .dispatch("user/createUser", {
            name: faker.name.findName(),
            correlationId: faker.random.uuid(),
            email: faker.internet.email()
          });
   },
   async entryTest() {
      var start = Date.now(); 
      for(var i=0;i<this.testcount;i++){
         await this.create();
         
      }

      var end = Date.now();
      var tps = this.testcount /( (end - start) / 1000);
    
      this.testduration = Math.round(tps);

    },
    async validateTest() {
      var start = Date.now(); 
      for(var i=0;i<this.testcount;i++){
         await this.verify();
         
      }

      var end = Date.now();
      var tps = this.testcount /( (end - start) / 1000);
    
      this.testduration = Math.round(tps);

    },
 
  },
  data: () => ({
    type:'entry',
    max:0,
    parallel: false,
    cid: null,
    testcount: 100,
    testduration: 0,
    load:0,
    tab: null,
  
  })
};
</script>