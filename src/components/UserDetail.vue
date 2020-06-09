<template>
  <v-content>
    <v-container fluid>
     
<v-row>
         
        <v-col class=" col-md-8" >
            <v-card  class="pa-2" tile>
                     <v-card-title>
       
                <v-flex class="body-2">{{user.name}} <b>{{user.email}}</b></v-flex>
               
               
                       </v-card-title>
              <v-col>
             
              <div v-if="!qrdata.qr || !qrdata.secret">Encryption Error!</div>
            
              </v-col>
           
     
              <v-row align="center" justify="center">
                <img v-if="qrdata.qr && qrdata.secret" v-bind:src="qrdata.qr" />
              </v-row>
  
            <div v-if="qrdata.qr && qrdata.secret" class="text-center">
              <v-btn text @click="sendQR" large color="primary">SEND QR</v-btn>
            </div>
           
             </v-card>
        </v-col>
    
  <v-dialog v-model="dialog" max-width="350px">
 
      <v-card >
        <v-card-title>
          Token Verification
        </v-card-title>
        <v-card-text>
  <div  >{{qrdata.name}}</div>
              
                    <v-text-field
                    dense
                      v-model="verifyItem.token"
                      append-icon="text_format"
                      label="OTP Token"
                    ></v-text-field>
                 <v-btn style="margin-bottom:10px;" class="col-md-12" dark @click="verifycheck"  color="primary">
      verify token
    </v-btn>
    <v-flex v-if="verifyResult">
               <v-alert   v-if="verifyResult.valid" type="success">
      {{verifyResult.msg + '[' +verifyResult.code + ']' }}
    </v-alert>

    <v-alert  v-if="!verifyResult.valid" type="error">
       {{verifyResult.msg + '[' +verifyResult.code + ']' }}
    </v-alert>
    </v-flex>
             </v-card-text>
   </v-card>         
          

 </v-dialog>    
</v-row>
       
  
  
 <v-btn @click="check" style="position:fixed;bottom:20px;right:20px;"  class="ma-2" dark="" fab color="primary">
      <v-icon>check</v-icon>
    </v-btn>
    
    </v-container>
  </v-content>
</template>

<script>
import faker from "faker";
export default {
  computed: {
    mailResult() {
      return this.$store.state.user.mailResult;
    },
    user() {
      return this.$store.state.user.user;
    },
    qrdata() {
      return this.$store.state.user.qr;
    },
    verifyResult() {
      return this.$store.state.user.pass ? this.$store.state.user.pass : null;
    }
  },
  watch: {
   mailResult(val){
     alert(val.msg)
   }
  },
  async created() {
    await this.getUser();
    setTimeout(() => {
      this.editedItem = Object.assign({}, this.user);
    }, 300);
  },
  methods: {
    
    sendQR() {
      this.$store.dispatch("user/sendQR",{
          correlationId: this.user.correlationId,
      });

    },
    check() {
      this.$store.dispatch("user/clearVerify");
      this.dialog = true;
    },
    editswitch() {
      this.isediting = !this.isediting;
    },
    async getUser() {
      await this.$store.dispatch("user/getUser", this.$route.params.id);
      await this.$store.dispatch("user/getQr", this.user.correlationId);
    },

    async update() {
      await this.$store
        .dispatch("user/updateUser", {
          name: this.editedItem.name,
          id: this.editedItem._id,
          locked: this.editedItem.locked,
          blocked: this.editedItem.blocked,
          correlationId: this.editedItem.correlationId
        })
        .then(() => this.getUser());
    },

    verifycheck() {
      this.$store.dispatch("user/verify", {
        id: this.user.correlationId,
        token: this.verifyItem.token,
        channel: "dashboard",
        user: "admin"
      });
    },
    setPage() {
      var pagination = {};
      if (this.page) {
        pagination.skip = (this.page - 1) * this.perpage;
      }
      if (this.perpage) {
        pagination.limit = this.perpage < 1 ? this.total : this.perpage;
      }
      if (this.sortby) {
        pagination.sortby = this.sortby;
      }
      if (this.sortdesc) {
        pagination.sortdesc = this.sortdesc;
      }
      // eslint-disable-next-line no-console
      console.log(pagination);
      this.pagination = pagination;
    },
    async entryParallelTest() {
      var promises = [];
      var start = Date.now();
      for (var i = 0; i < this.createcount; i++) {
        promises.push(
          this.$store.dispatch("user/createUser", {
            name: faker.name.findName(),
            correlationId: faker.random.uuid(),
            email: faker.internet.email()
          })
        );
      }
      await Promise.all(promises);
      var end = Date.now();
      var tps = this.createcount / ((end - start) / 1000);

      this.testduration = Math.round(tps);
    },
    async entryTest() {
      var start = Date.now();
      for (var i = 0; i < this.createcount; i++) {
        await this.$store.dispatch("user/createUser", {
          name: faker.name.findName(),
          correlationId: faker.random.uuid(),
          email: faker.internet.email()
        });
      }

      var end = Date.now();
      var tps = this.createcount / ((end - start) / 1000);

      this.testduration = Math.round(tps);
    }
  },
  data: () => ({
    dialog: false,
    isediting: false,
    createcount: 100,
    testduration: 0,
    tab: null,
    editedItem: {
      name: "",
      correlationId: "",
      id: null
    },
    verifyItem: {
      token: "",
      correlationId: null
    },
    defaultItem: {
      name: "",
      correlationId: ""
    },
    headers: [
      {
        text: "Name (100g serving)",
        align: "left",
        value: "name"
      },
      { text: "Correlation Id", value: "correlationId" },

      { text: "Date", value: "createdAt" },
      { text: "Locked", align: "center", value: "locked" },
      { text: "Blocked", align: "center", value: "blocked" },
      { text: "Actions", value: "action", sortable: false }
    ],
    drawers: ["Default (no property)", "Permanent", "Temporary"],
    primaryDrawer: {
      model: null,
      type: "default (no property)",
      clipped: false,
      floating: false,
      mini: false
    },
    footer: {
      inset: false
    }
  })
};
</script>