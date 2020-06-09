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
          <span class="title1">{{isediting?'Update Item':'New Item'}}</span>
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
            <v-btn color="primary" dark @click="save">Create Item</v-btn>
          </v-row>
          <v-row v-if="isediting" align="center" justify="left">
             <v-btn @click="goPosting(editedItem)"  color="primary" text dark>Transactions</v-btn>
           
          
          </v-row>
          <v-row v-if="isediting" align="center" justify="center">
            
            <v-btn color="primary" dark @click="save">Update Item</v-btn>
          
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
   // this.fakeItems();
  },
  methods: {
    changeUnit(value) {
        this.editedItem.unit = value._id;
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
    async fakeItems() {

      for (var i = 0; i < 1; i++) {
        var total = faker.random.arrayElement([200,250,175,300,340,400,475]);
        var amtone =  faker.random.arrayElement([150,40,100,75]);
        var amttow = total - amtone;

        var payload = {
        correlationId:faker.random.number() + "" + faker.random.number(),
        transactionCode:"CTR",
        unit:"MMK",
        transactionDate:faker.date.recent(),
        narration:"Payment from " + faker.company.companyName(),
        data:[
        
          {"account":"C000001",
            "amount":total,
            "type":"C",
            "narration":faker.lorem.words()
          },
          {	"account":"R0004900005",
              "amount":amtone,
              "type":"D",
              "narration":faker.lorem.words()
          },
          {	"account":"R000000000940",
              "amount":amttow,
              "type":"D",
              "narration":faker.lorem.words()
          }
        ],
        excludeLocks : ["C000001"]
      };
        await this.$store.dispatch("accountjournal/createFakeItems", payload);
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
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
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

    isadding: false,
    dialog: false,
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