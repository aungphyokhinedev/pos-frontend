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
            <span class="title mr-2">Accounts</span>

            <v-spacer></v-spacer>
            <v-icon small @click="getItems">refresh</v-icon>
          </v-toolbar>
        </template>
        <template v-slot:item.accountCode="{ item }">
          <a @click="sync(item)">{{item.accountCode}}</a>
        </template>
         <template v-slot:item.blocked="{ item }">
          <a>{{item.blocked}}</a>
        </template>
        <template v-slot:item.locked="{ item }">
          <a>{{item.locked}}</a>
        </template>
        <template v-slot:no-data>
          <v-flex>There is no data!</v-flex>
        </template>
          <template v-slot:item.amount="{ item }">
       <a @click="goPosting(item)" >{{item.amount}}</a>
        </template>
      </v-data-table>

   
      <v-col align="center" justify="center">
        <v-row>
          <v-dialog v-model="dialog" max-width="350px"></v-dialog>
        </v-row>
        <v-row align="center" justify="center"></v-row>
      </v-col>
    
    </v-container>
  </v-content>
</template>

<script>
import faker from "faker";
import moment from "moment";
export default {
  computed: {
    loading() {
      return this.$store.state.account.loading;
    },
    success() {
      return this.$store.state.account.success;
    },
    error() {
      return this.$store.state.account.error;
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
        this.$store.state.account.items &&
        this.$store.state.account.items.rows
      ) {
        this.$store.state.account.items.rows.forEach(item => {
          var newitem = Object.assign({}, item);
          newitem.createdAt = moment(newitem.createdAt).format("D-MMM-YY");
        
          result.push(newitem);
        });
      }

      return result;
    },
    filterChange() {
      return this.$store.state.common.filter;
    },
    total() {
      return this.$store.state.account.items.total;
    },
    limit() {
      return this.$store.state.account.items.limit;
    },
    pageChange() {
      return (
        this.page + "" + this.pageSize + "" + this.sort + "" + this.sortOrder
      );
    },
    pagination() {
      return this.$store.state.account.pagination;
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
    this.$store.dispatch("account/clearState");
    this.getItems();
  },
  methods: {
    goPosting(item) {
      this.$router.push("accountposting/account/"+item._id);
    },
     changeUnit(value) {
      this.editedItem.unit = value;
    },
   changeType(value) {
      this.editedItem.type = value;
    },
    changeRule(value) {
      this.editedItem.rule = value;
    },
    async clear() {
      this.$store.dispatch("account/clearState");
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
   async sync(item) {
      if (confirm("Are you sure you want to sync this account?")) {
        if (
          await this.$store.dispatch("account/sync", item.accountCode)
        ) {
          this.getItems();
          this.close();
        }
      }
    },

    async getItems() {
      var data = {
        page: this.page,
        pageSize: this.pageSize,
        populate: ["type", "rule", "unit"]
      };
      // eslint-disable-next-line no-console
      console.log(this.sort + ":" + this.sortOrder);
      if (this.sort && this.sort != "") {
        data.sort = (this.sortOrder ? "-" : "") + this.sort;
      }

      if (this.filterChange.query) {
        data.search = this.filterChange.query;
        data.searchFields = "name,accountCode";
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
      await this.$store.dispatch("account/getItems", data);
    },
    close() {
      this.isadding = false;
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

  },
  data: () => ({
    pageSize: 10,
    page: 1,
    sort: "createdAt",
    sortOrder: true,
    showError: false,

    isadding: false,
    dialog: false,
    headers: [
      {
        text: "Code (Click to sync)",
        align: "left",
        value: "accountCode"
      },
      {
        text: "Name",
        align: "left",
        value: "name"
      },
      {
        text: "Unit",
        align: "left",
        value: "unit.unitCode"
      },
     
     
      {
        text: "Locked",
        align: "left",
        value: "locked"
      },
      { text: "Created At", align: "center", value: "createdAt", width: 110 },
       {
        text: "Amounts",
        align: "right",
        value: "amount"
      },
    ]
  })
};
</script>