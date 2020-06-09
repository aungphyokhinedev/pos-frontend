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
      <template style="width:20px;" v-slot:item.active="{ item }">
          <v-chip outlined style="margin: 2px 0" small v-if="item.active">
            <v-icon small left color="green">mdi-check</v-icon>Active
          </v-chip>
        </template>
        <template v-slot:top>
          <v-toolbar dark color="primary" flat>
            <v-icon class="mr-2" small>help_outline</v-icon>
            <span class="title mr-2">Schedule Tasks</span>

            <v-spacer></v-spacer>
            <v-icon small @click="getItems">refresh</v-icon>
          </v-toolbar>
        </template>
        <template v-slot:item.name="{ item }">
          <a @click="edit(item)">{{item.name ? item.name: '-'}}</a>
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
              v-model="editedItem.name"
              label="Name"
              append-icon="text_format"
              :counter="50"
            ></v-text-field>
             <v-text-field
              dense
              v-model="editedItem.service"
              label="Service"
              append-icon="text_format"
              :counter="50"
            ></v-text-field>
            <v-text-field
              dense
              v-model="editedItem.method"
              label="Method"
              append-icon="text_format"
              :counter="50"
            ></v-text-field>
            <v-text-field
              dense
              v-model="editedItem.remark"
              label="Remark"
              append-icon="text_format"
              :counter="50"
            ></v-text-field>

          

          
          </v-col>
         <v-row style="padding:10px" >
              <v-checkbox class="mr-3" dense v-model="editedItem.active" label="Active" required></v-checkbox>
           
            </v-row>
          <v-row v-if="!isediting" align="center" justify="center">
            <v-btn color="primary" dark @click="save">Create Item</v-btn>
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
export default {
  computed: {
    loading() {
      return this.$store.state.scheduletask.loading;
    },
    success() {
      return this.$store.state.scheduletask.success;
    },
    error() {
      return this.$store.state.scheduletask.error;
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
        this.$store.state.scheduletask.items &&
        this.$store.state.scheduletask.items.rows
      ) {
        this.$store.state.scheduletask.items.rows.forEach(item => {
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
      return this.$store.state.scheduletask.items.total;
    },
    limit() {
      return this.$store.state.scheduletask.items.limit;
    },
    pageChange() {
      return (
        this.page + "" + this.pageSize + "" + this.sort + "" + this.sortOrder
      );
    },
    pagination() {
      return this.$store.state.scheduletask.pagination;
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
    this.$store.dispatch("scheduletask/clearState");
    this.getItems();
  },
  methods: {
    async clear() {
      this.$store.dispatch("scheduletask/clearState");
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
      };
      // eslint-disable-next-line no-console
      console.log(this.sort + ":" + this.sortOrder);
      if (this.sort && this.sort != "") {
        data.sort = ((this.sortOrder + "" == "true") ? "-" : "") + this.sort;
      }

      if (this.filterChange.query) {
        data.search = this.filterChange.query;
        data.searchFields = "name,code";
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
      await this.$store.dispatch("scheduletask/getItems", data);
    },

    async deleteUser() {
      if (confirm("Are you sure you want to delete this item?")) {
        if (
          await this.$store.dispatch("scheduletask/deleteItem", this.editedItem._id)
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
          await this.$store.dispatch("scheduletask/updateItem", {
            name: this.editedItem.name,
            service: this.editedItem.service,
            remark: this.editedItem.remark,
            method: this.editedItem.method,
            active: this.editedItem.active,
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
        if (await this.$store.dispatch("scheduletask/createItem", this.editedItem)) {
          this.getItems();
          this.close();
        }
      }
    }
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
        text: "Name (Click to edit)",
        align: "left",
        value: "name"
      },
      {
        text: "Service",
        align: "left",
        value: "service"
      },
      {
        text: "Method",
        align: "left",
        value: "method"
      },
         {
        text: "Remark",
        align: "left",
        value: "remark"
      },
       {
        text: "Active",
        align: "left",
        value: "active"
      },
      { text: "Created At", align: "center", value: "createdAt", width: 110 }
    ]
  })
};
</script>