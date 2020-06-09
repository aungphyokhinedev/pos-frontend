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
            <span class="title mr-2">Account Postings</span>

            <v-spacer></v-spacer>
            <v-icon small @click="getItems">refresh</v-icon>
          </v-toolbar>
        </template>
        <template v-slot:item.journal.correlationID="{ item }">
          <a @click="edit(item)">{{item.journal.correlationID ? item.journal.correlationID: '-'}}</a>
        </template>
        <template v-slot:item.account="{ item }">
         {{item.account.accountCode}} - {{item.account.name}}
        </template>
        <template v-slot:item.amount="{ item }">
          
            <div style="color:#007a3e" v-if="item.amount >= 0">{{item.amount}}</div>
             <div style="color:#b80052" v-if="item.amount < 0">({{item.amount * -1}})</div>
          
        </template>
        
        <template v-slot:no-data>
          <v-flex>There is no data!</v-flex>
        </template>
      </v-data-table>

      <v-card v-if="isadding">
        <v-card-title>
          <span class="title1">{{isediting?'Update Item':'New Item'}}</span>
          <v-spacer />
          <v-icon small>help_outline</v-icon>
          <v-icon @click="deleteUser" v-if="isediting" small>delete</v-icon>
        </v-card-title>

        <v-card-text>
          <v-col cols="12" style="padding:0">
           <AutoComplete
              :label="account?account.name:'Account'"
              service="account"
              searchBy="accountCode"
              v-bind:select="editedItem.account"
              v-on:change="changeAccount"
            />
           
            <v-text-field
              dense
              type="number"
              v-model="editedItem.amount"
              label="Amount"
              append-icon="text_format"
              :counter="50"
            ></v-text-field>
            
            <v-text-field
              dense
              v-model="editedItem.narration"
              label="Narration"
              append-icon="text_format"
              :counter="50"
            ></v-text-field>
            
          </v-col>

          <v-row v-if="!isediting" align="center" justify="center">
            <v-btn color="primary" dark @click="save">Create Item</v-btn>
          </v-row>
          <v-row v-if="isediting" align="center" justify="center">
            <v-btn color="primary" dark @click="save">Update Item</v-btn>
          </v-row>
        </v-card-text>
      </v-card>
       <v-alert v-if="journalCheck && journalCheck.total != 0" dense text type="error">
        <v-row align="center" justify="space-between">
          {{"Transaction is not balanced. [" + journalCheck.total + "]"}}
         
        </v-row>
      </v-alert>

      <v-col align="center" justify="center">
        <v-row>
          <v-dialog v-model="dialog" max-width="350px"></v-dialog>
        </v-row>
        <v-row align="center" justify="center"></v-row>
      </v-col>
      <v-btn
      v-if="journalid"
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
import faker from "faker";
import moment from "moment";
import AutoComplete from "../components/AutoComplete";
export default {
   components: {
    AutoComplete: AutoComplete
  },
  computed: {
    sortDesc() {
        if(this.sortOrder == false || this.sortOrder == 'false') {
            return false;
        }
        else{
            return true;
        }
        
    },
    journalCheck() {
      return this.$store.state.accountjournal.journalCheck;
    },
    loading() {
      return this.$store.state.accountposting.loading;
    },
    success() {
      return this.$store.state.accountposting.success;
    },
    error() {
      return this.$store.state.accountposting.error;
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
        this.$store.state.accountposting.items &&
        this.$store.state.accountposting.items.rows
      ) {
        this.$store.state.accountposting.items.rows.forEach(item => {
          var newitem = Object.assign({}, item);
          newitem.date = moment(newitem.date).format("D-MMM-YY");
       
          result.push(newitem);
        });
      }

      return result;
    },
    filterChange() {
      return this.$store.state.common.filter;
    },
    total() {
      return this.$store.state.accountposting.items.total;
    },
    limit() {
      return this.$store.state.accountposting.items.limit;
    },
    pageChange() {
      return (
        this.page + "" + this.pageSize + "" + this.sort + "" + this.sortOrder
      );
    },
    pagination() {
      return this.$store.state.accountposting.pagination;
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
    this.journalid = this.$route.params.journalid;
    this.accountid = this.$route.params.accountid;
    this.$store.dispatch("accountposting/clearState");
    this.getItems();
    
  },
  methods: {
    changeAccount(value) {
        this.account = value;
        this.editedItem.account = value._id;
    },
    async clear() {
      this.$store.dispatch("accountposting/clearState");
    },
    async fakeItems() {
      for (var i = 0; i < 100; i++) {
        var payload = {
          name: faker.commerce.productName()
        };
        await this.$store.dispatch("service/createItem", payload);
      }
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
        populate: ["account", "journal", "unit"]
      };
      // eslint-disable-next-line no-console
      console.log(this.sort + ":" + this.sortOrder);
      if (this.sort && this.sort != "") {
        data.sort = (this.sortDesc ? "-" : "") + this.sort;
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

     if(this.journalid){
          if(!data.query) data.query = {};
          data.query.journal = this.journalid;
      }
      if(this.accountid){
          if(!data.query) data.query = {};
          data.query.account = this.accountid;
      }
      await this.$store.dispatch("accountposting/getItems", data);

      if(this.journalid){
          await this.$store.dispatch("accountjournal/checkJournal", this.journalid);
      }
    },

    async deleteUser() {
      if (confirm("Are you sure you want to delete this item?")) {
        if (
          await this.$store.dispatch("accountposting/deleteItem", this.editedItem._id)
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
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    async save() {
      if (this.isediting) {
        // eslint-disable-next-line no-console
        console.log("editing");
        if (
          await this.$store.dispatch("accountposting/updateItem", {
            account: this.editedItem.account,
            amount: this.editedItem.amount,
            narration: this.editedItem.narration,
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
        if(this.journalid){
            this.editedItem.journal = this.journalid;
            if (await this.$store.dispatch("accountposting/createItem", this.editedItem)) {
            this.getItems();
            this.close();
            }
        }
        
      }
    }
  },
  data: () => ({
    pageSize: 10,
    account: null,
    accountid:null,
    journalid: null,
    page: 1,
    sort: "date",
    sortOrder: true,
    showError: false,

    isadding: false,
    dialog: false,
    headers: [
        {
        text: "Trans Code (Click to edit)",
        align: "left",
        value: "journal.correlationID"
      },
     
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
    ]
  })
};
</script>