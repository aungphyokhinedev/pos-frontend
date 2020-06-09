<template>
  <v-content>
    <v-container fluid>
      <v-progress-linear v-if="loading" indeterminate color="primary"></v-progress-linear>
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
    
      <v-data-table
        v-if="!isadding"
        dense
        :headers="headers"
        :items="items"
        :items-per-page.sync="pageSize"
        :page.sync="page"
        :sort-by.sync="sort"
        :sort-desc.sync="sortOrder"
        :server-items-length="total"
        :items-per-page-options="15"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar dark color="primary" flat>
            <v-icon class="mr-2" small>help_outline</v-icon>
            <span class="title mr-2">Account Journals</span>

            <v-spacer></v-spacer>
            <v-icon small @click="getItems">refresh</v-icon>
          </v-toolbar>
        </template>
        <template v-slot:item.correlationID="{ item }">
          <a @click="edit(item)">{{item.correlationID ? item.correlationID: '-'}}</a>
         
        </template>
        <template v-slot:item._id="{ item }">
        
       <a @click="goPosting(item)" >Check</a>
        </template>

        <template v-slot:no-data>
          <v-flex>There is no data!</v-flex>
        </template>
      </v-data-table>



      <v-card v-if="isadding">
        <v-card-title>
          <span class="title1">Journal Data</span>
          <v-spacer />
          <v-icon small>help_outline</v-icon>
          <v-icon @click="deleteUser" v-if="isediting" small>delete</v-icon>
        </v-card-title>
       

        <v-card-text>
          <v-col cols="12" style="padding:0">
            <v-text-field
              dense
              v-model="editedItem.correlationID"
              label="Correlation ID"
              append-icon="text_format"
              :counter="50"
            ></v-text-field>
            <AutoComplete
              label="TransactionCode"
              service="account/transactioncode"
              searchBy="transactionCode"
              v-bind:select="editedItem.transactionCode"
              v-on:change="changeTransactionCode"
            />
             <AutoComplete
              label="Unit"
              service="account/unit"
              searchBy="unitCode"
              v-bind:select="editedItem.unit"
              v-on:change="changeUnit"
            />
            <v-text-field
              dense
              v-model="editedItem.narration"
              label="Narration"
              append-icon="text_format"
              :counter="50"
            ></v-text-field>
            
          </v-col>

          <v-row v-if="!isediting" align="center" justify="center">
            <v-btn color="primary" dark @click="addJournal">Create Item</v-btn>
          </v-row>
          
         
        </v-card-text>
      </v-card>
<v-card style="margin:10px 0;" v-if="isadding && journal">
  <v-simple-table dense="">
     <template v-slot:top>
          <v-toolbar dark color="primary" flat>
            <v-icon class="mr-2" small>help_outline</v-icon>
            <span class="title mr-2">Journal Info</span>

            <v-spacer></v-spacer>
            <v-icon small @click="getItems">refresh</v-icon>
          </v-toolbar>
        </template>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">Correlation ID</th>
          <th class="text-left">Transaction Code</th>
          <th class="text-left">Unit</th>
          <th class="text-left">Narration</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in [journal]" :key="item.correlationID">
          <td>{{ item.correlationID }}</td>
          <td>{{ item.transactionCode }}</td>
           <td>{{ item.unit }}</td>
            <td>{{ item.narration }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
     </v-card>
    
      <v-card v-if="isadding && journal">
        <v-card-title>
          <span class="title1">Posting Data</span>
          <v-spacer />
          <v-icon small>help_outline</v-icon>
          <v-icon @click="deleteUser" v-if="isediting" small>delete</v-icon>
        </v-card-title>
       

       <v-card-text>
          <v-col cols="12" style="padding:0">
           <AutoComplete
              label="Account"
              service="account"
              searchBy="accountCode"
              v-bind:select="postItem.account"
              v-on:change="changeAccount"
            />
           
            <v-text-field
              dense
              type="number"
              v-model="postItem.amount"
              label="Amount"
              append-icon="text_format"
              :counter="50"
            ></v-text-field>
            <v-text-field
              dense
              v-model="postItem.type"
              label="Type [D,C]"
              append-icon="text_format"
              :counter="1"
            ></v-text-field>
            <v-text-field
              dense
              v-model="postItem.narration"
              label="Narration"
              append-icon="text_format"
              :counter="50"
            ></v-text-field>
            
          </v-col>

          <v-row v-if="!isediting" align="center" justify="center">
            <v-btn color="primary" dark @click="addPost">Create Item</v-btn>
          </v-row>
  
        </v-card-text>
      </v-card>

      <v-card style="margin:10px 0;" v-if="isadding && postings.length > 0">
  <v-simple-table dense="">
     <template v-slot:top>
          <v-toolbar dark color="primary" flat>
            <v-icon class="mr-2" small>help_outline</v-icon>
            <span class="title mr-2">Posting Info</span>

            <v-spacer></v-spacer>
            <v-icon small @click="getItems">refresh</v-icon>
          </v-toolbar>
        </template>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">Account</th>
          <th class="text-left">Amount</th>
          <th class="text-left">Type</th>
          <th class="text-left">Narration</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in postings" :key="item.account">
          <td>{{ item.account }}</td>
          <td>{{ item.amount }}</td>
           <td>{{ item.type }}</td>
            <td>{{ item.narration }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
     </v-card>
     <v-row v-if="isadding && postings.length > 0" align="center" justify="center">
            <v-btn color="primary" dark @click="addItems">Save Transaction</v-btn>
          </v-row>
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
        @click="next"
        fab
      >
        <v-icon dark>{{isadding?'list':'add'}}</v-icon>
      </v-btn>
    </v-container>
  </v-content>
</template>

<script>

import moment from "moment";
import AutoComplete from "../components/AutoComplete";
export default {
   components: {
    AutoComplete: AutoComplete
  },
  computed: {
 
    loading() {
      return this.$store.state.accountjournal.loading;
    },
    success() {
      return this.$store.state.accountjournal.success;
    },
    error() {
      return this.$store.state.accountjournal.error;
    },
    searching() {
      return this.$store.state.common.searching;
    },
    adding() {
      return this.$store.state.common.adding;
    },
    
    items() {
      var result = [];
      if (
        this.$store.state.accountjournal.items &&
        this.$store.state.accountjournal.items.rows
      ) {
        this.$store.state.accountjournal.items.rows.forEach(item => {
          var newitem = Object.assign({}, item);
          newitem.date = moment(newitem.date).format("D-MMM-YY");
         newitem.transactionDate = moment(newitem.transactionDate).format("D-MMM-YY");
          result.push(newitem);
        });
      }

      return result;
    },
    filterChange() {
      return this.$store.state.common.filter;
    },
    total() {
      return this.$store.state.accountjournal.items.total;
    },
    limit() {
      return this.$store.state.accountjournal.items.limit;
    },
    pageChange() {
      return (
        this.page + "" + this.pageSize + "" + this.sort + "" + this.sortOrder
      );
    },
    pagination() {
      return this.$store.state.accountjournal.pagination;
    }
  },
  watch: {
    error() {
      this.showError = true;
    },
    filterChange() {
      this.getItems();
    },
    pageChange() {
      this.getItems();
    },
    searching() {
      this.pagintategetItems();
    },
    query() {
      setTimeout(() => this.pagintategetItems(), 1000);
    }
  },
  created() {
    this.$store.dispatch("accountjournal/clearState");
    this.getItems();
  },
  methods: {
    changeUnit(value) {
        this.editedItem.unit = value.unitCode;
    },
    changeAccount(value) {
     
      this.postItem.account = value.accountCode;
    },
     changeTransactionCode(value) {
      this.editedItem.transactionCode = value.transactionCode;
    },
    goPosting(item) {
      this.$router.push("accountposting/"+item._id);
    },
    async clear() {
      this.$store.dispatch("accountjournal/clearState");
    },
    async addItems() {

        var payload = {...this.journal,
        data:this.postings};
        
        await this.$store.dispatch("accountjournal/createFakeItems", payload);
        this.getItems();
        this.close();
    },
    next() {
      if (!this.isadding) {
        this.add();
      } else {
        this.close();
      }
    },
    add() {
      this.editedItem = {};
      this.isediting = false;
      this.isadding = true;
    },
    edit(item) {
      // eslint-disable-next-line no-console
      console.log(item);
      this.editedItem = Object.assign({}, item);
      this.isediting = true;
      this.isadding = true;
    },

    async getItems() {
      var data = {
        page: this.page,
        pageSize: this.pageSize,
         populate: [ "unit"]
      };
      // eslint-disable-next-line no-console
      console.log(this.sort + ":" + this.sortOrder);
      if (this.sort && this.sort != "") {
        data.sort = (this.sortOrder ? "-" : "") + this.sort;
      }

      if (this.filterChange.query) {
        data.search = this.filterChange.query;
        data.searchFields = "correlationID,transactionCode,narration";
      }

      if (this.filterChange.start || this.filterChange.end) {
        data.query = { createdAt: {} };
        if (this.filterChange.start) {
          data.query.createdAt.$gte = this.filterChange.start;
        }
        if (this.filterChange.end) {
          data.query.createdAt.$lt = this.filterChange.end;
        }
      }
      // Dispatch the action to buy a TV
      await this.$store.dispatch("accountjournal/getItems", data);
    },

    async deleteUser() {
      if (confirm("Are you sure you want to delete this item?")) {
        if (
          await this.$store.dispatch("accountjournal/deleteItem", this.editedItem._id)
        ) {
          this.getItems();
          this.close();
        }
      }
    },
    close() {
      
      this.isadding = false;
      this.dialog = false;

      setTimeout(() => {
         this.postings = [];
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
        this.postItem = {};
        this.journal = null;
       
   
      }, 300);
    },

    addJournal() {
        // eslint-disable-next-line no-console
        console.log("add journal");
        this.journal = this.editedItem;
    },
    addPost() {
        this.postItem.amount = parseInt(this.postItem.amount);
        this.postings.push({...this.postItem});
        this.postItem = {};
    },
    async save() {
      if (this.isediting) {
        // eslint-disable-next-line no-console
        console.log("editing");
        if (
          await this.$store.dispatch("accountjournal/updateItem", {
            narration: this.editedItem.narration,
            unit: this.editedItem.unit,
            transactionCode: this.editedItem.transactionCode,
            correlationID: this.editedItem.correlationID,
            _id: this.editedItem._id
          })
        ) {
          this.getItems();
          this.close();
        }

        // Object.assign(this.users[this.editedIndex], this.editedItem);
      } else {
        // eslint-disable-next-line no-console
        console.log("add new");
        if (await this.$store.dispatch("accountjournal/createItem", this.editedItem)) {
          this.getItems();
          this.close();
        }
      }
    }
  },
  data: () => ({
    pageSize: 10,
    page: 1,
    sort: "date",
    sortOrder: true,
    showError: false,
    postItem: {},
    editedItem: {},
    isadding: false,
    dialog: false,
    journal: null,
    postings: [],
    postHeaders: [
        {
        text: "Account",
        align: "left",
        value: "account"
      },
      {
        text: "Amount",
        align: "right",
        value: "amount"
      },
      
       {
        text: "Unit",
        align: "right",
        value: "unit.unitCode"
      },
       {
        text: "Narration",
        align: "left",
        value: "narration"
      },
      
      { text: "Created At", align: "center", value: "date", width: 110 }
    ],
    headers: [
      {
        text: "ID (Click to edit)",
        align: "left",
        value: "correlationID"
      },
    
      {
        text: "Trans Code",
        align: "center",
        value: "transactionCode"
      },
       {
        text: "Unit",
        align: "center",
        value: "unit.unitCode"
      },
      {
        text: "Narration",
        align: "left",
        value: "narration"
      },
       { text: "Tran Date", align: "center", value: "transactionDate", width: 110 },
      { text: "Created At", align: "center", value: "date", width: 110 },
        {
        text: "Actions",
        align: "left",
        value: "_id"
      },
    ]
  })
};
</script>