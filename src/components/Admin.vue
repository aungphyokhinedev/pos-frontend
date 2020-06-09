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

       <v-data-table   v-if="!isadding"
            dense
            :headers="headers"
            :items="users"
            :items-per-page.sync="perpage"
            :page.sync="page"
            :sort-by.sync="sortby"
            :sort-desc.sync="sortdesc"
            :server-items-length="total"
            :items-per-page-options="15"
            class="elevation-1"
          >
            <template v-slot:top>
              <v-toolbar dark color="primary" flat>
                 <v-icon class="mr-2" small>help_outline</v-icon>
                <span class="title mr-2">Admin Users</span>

                <v-spacer></v-spacer>
 <v-icon small @click="getUsers" >refresh</v-icon>
              
              </v-toolbar>
            </template>
            <template v-slot:item.email="{ item }">
              <a  @click="edit(item)">{{item.email ? item.email: '-'}}</a>
              
            </template>

            <template style="width:20px;" v-slot:item.action="{ item }">
              <v-btn
              dense
              text="" small=""
              color="primary"
             
                :to="'./userdetail/' + item._id"

              ><v-icon small>
                code
                </v-icon>
              </v-btn>
             
              <!-- <v-icon  class="mr-2" @click="editItem(item)">edit</v-icon>
            <v-icon  class="mr-2" @click="deleteItem(item)">delete</v-icon>
             <v-icon  class="mr-2" @click="viewItem(item)">code</v-icon>
              <v-icon  @click="verify(item)">check</v-icon>-->
            </template>
            <template v-slot:no-data>
              <v-flex>There is no data!</v-flex>
            </template>
          </v-data-table>

 <v-card v-if="isadding">
            <v-card-title>
              <span class="title1">{{isediting?'Update Token':'New Token'}}</span>
              <v-spacer />
              <v-icon small>help_outline</v-icon>
              <v-icon @click="deleteUser" v-if="isediting" small>delete</v-icon>
            </v-card-title>

            <v-card-text>
              <v-col cols="12" style="padding:0">
                <v-text-field
                  dense
                  v-model="editedItem.name"
                  label="User Name"
                  append-icon="text_format"
                  :counter="50"
                ></v-text-field>
          
                <v-text-field
                  dense
                  v-model="editedItem.correlationId"
                  label="Correlation Id"
                  append-icon=" mdi-key"
                ></v-text-field>
             
                <v-text-field
                  dense
                  v-model="editedItem.email"
                  label="Email"
                  append-icon="text_format"
                ></v-text-field>
                 <v-row style="padding:10px" v-if="isediting">
                  
                  <v-checkbox class="mr-3" dense v-model="editedItem.locked" label="Locked" required></v-checkbox>
                  <v-checkbox dense v-model="editedItem.blocked" label="Blocked" required></v-checkbox>
               
                </v-row>
              </v-col>
              
              <v-row v-if="!isediting" align="center" justify="center">
                <v-btn color="primary" dark @click="save">Create Token</v-btn>
              </v-row>
               <v-row v-if="isediting" align="center" justify="center">
                <v-btn color="primary" dark @click="save">Update Token</v-btn>
              </v-row>
            </v-card-text>
          </v-card>

     

      <v-col align="center" justify="center">
        <v-row>
          <v-dialog v-model="dialog" max-width="350px"></v-dialog>
        </v-row>
        <v-row align="center" justify="center"></v-row>
      </v-col>
      <v-btn
        color="primary"
        dark
        style="position:fixed;bottom:20px;right:20px;"
        class="mx-2"
        @click="add()"
        fab
      >
        <v-icon dark>{{isadding?'list':'add'}}</v-icon>
      </v-btn>
    </v-container>
  </v-content>
</template>

<script>
import moment from "moment";
export default {

  computed: {
    loading() {
      return this.$store.state.admin.loading;
    },
    errorMsg() {
      var error = this.$store.state.admin.error;
      if(error && error.response && error.response.data){
        return error.response.data.message;
      }
      return 'Error, Something went wrong';
    },
    error() {
      return this.$store.state.admin.error;
    },
    searching() {
      return this.$store.state.common.searching;
    },
    adding() {
      return this.$store.state.common.adding;
    },
    users() {
      var result = [];
      if (this.$store.state.admin.users && this.$store.state.admin.users.data) {
        this.$store.state.admin.users.data.forEach(user => {
          var newuser = Object.assign({}, user);
          newuser.createdAt = moment(newuser.createdAt).format("YY-MMM-D");
          result.push(newuser);
        });
      }

      return result;
    },
    query() {
      return this.$store.state.common.filter;
    },
    total() {
      return this.$store.state.admin.users.total;
    },
    limit() {
      return this.$store.state.admin.users.limit;
    },
    criteria() {
      return this.page + this.perpage + this.sortby + this.sortdesc;
    },
    pagination() {
      return this.$store.state.admin.pagination;
    }
  },
  watch: {
    error(){
      this.showError = true
    },
    isadding(val) {
      if(val){
        this.carouselindex = 1;
      }
      else{
        this.carouselindex = 0;
      }
    },
    adding() {
      this.dialog = true;
    },
    searching() {
      this.pagintateGetUsers();
    },
    dialog(val) {
      val || this.close();
    },
    criteria() {
      this.pagintateGetUsers();
    },

    query() {

      setTimeout(()=>this.pagintateGetUsers(),1000);
    },
  },
  created() {
    this.$store.dispatch("admin/clearState");
    this.getUsers()
  },
  methods: {
    async clearError() {
       this.$store.dispatch("admin/clearState");
    },
    edit(item) {
      // eslint-disable-next-line no-console
      console.log(item)
      this.editedItem = Object.assign({}, item);
      this.isediting = true;
      this.isadding = true;
    },
    add() {
      this.editedItem = {};
      this.isediting = false;
      this.isadding = !this.isadding;
     
      //this.dialog = true
    },
    async pagintateGetUsers() {
      await this.setPage();
      setTimeout(()=>this.getUsers(),100)
      
  
    },
    async setPage() {
      var pagination = {};
      if (this.page) {
        pagination.skip = (this.page - 1) * this.perpage;
      }
      if (this.perpage) {
        pagination.limit = this.perpage < 1 ? this.total : this.perpage;
      }
      if (this.sortby) {
        pagination.sortby = this.sortby;
        if (this.sortdesc) {
          pagination.sortdesc = this.sortdesc + '';
        }
      }
      
      // eslint-disable-next-line no-console
      console.log("save pagination");
      // eslint-disable-next-line no-console
      console.log(pagination);
      await this.$store.dispatch("admin/setPagination", pagination);
    },
    async getUsers() {
      // Dispatch the action to buy a TV
      await this.$store.dispatch("admin/getAllUser",{pagination:this.pagination,query:this.query });
    },

    async deleteUser() {
      
      if(confirm("Are you sure you want to delete this item?")){
        await this.$store.dispatch("admin/deleteUser",this.editedItem._id )
       this.pagintateGetUsers();
       this.isadding = false;
      }
         
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    async save() {
      if (this.isediting) {
        // eslint-disable-next-line no-console
        console.log("editing");
        await this.$store
          .dispatch("admin/updateUser", {
            name: this.editedItem.name,
            id: this.editedItem._id,
            locked: this.editedItem.locked,
            blocked: this.editedItem.blocked,
            correlationId: this.editedItem.correlationId
          })
          .then(() => this.getUsers());

        // Object.assign(this.users[this.editedIndex], this.editedItem);
      } else {
        // eslint-disable-next-line no-console
        console.log("add new");
        await this.$store
          .dispatch("admin/createUser", this.editedItem)
          .then(() => this.getUsers());
      }
      this.isadding = false;
      this.close();
    }
  },
  data: () => ({
    showError:false,
    isadding: false,
    isediting: false,
    carouselindex: 0,
    perpage: 10,
    page: 1,
    sortdesc: true,
    sortby: 'createdAt',
    dialog: false,
    editedIndex: -1,
    editedItem:null,
    verifyItem: {
      name: "",
      token: "",
      correlationId: null
    },
    defaultItem: {
      name: "",
      correlationId: "",
      email: ""
    },
    headers: [
      {
        text: "Name (Click to edit)",
        align: "left",
        value: "email",
         width: 200
      },
      { text: "Correlation Id (ID)", value: "correlationId" },
      { text: "Locked", align: "center", value: "locked", width: 120},
      { text: "Blocked", align: "center", value: "blocked" , width: 120},
      //  { text: "ID", value: "_id" },
      { text: "Date",  align: "center",value: "createdAt" , width: 100 },

      { text: "Token", align: "center", value: "action", sortable: false, width: 50  }
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