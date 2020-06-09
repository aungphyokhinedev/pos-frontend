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
            <span class="title mr-2">POS Items</span>

            <v-spacer></v-spacer>
            <v-icon small @click="getItems">refresh</v-icon>
          </v-toolbar>
        </template>
        <template v-slot:item.itemCode="{ item }">
          <a @click="edit(item)">{{item.itemCode ? item.itemCode: '-'}}</a>
        </template>
           <template style="width:20px;" v-slot:item.deliverable="{ item }">
          <v-chip outlined style="margin: 2px 0" small v-if="item.deliverable">
            <v-icon small left color="green">mdi-check</v-icon>Deliverable
          </v-chip>
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
              v-model="editedItem.itemCode"
              label="Code"
              append-icon="text_format"
              :counter="50"
            ></v-text-field>
             
            <AutoComplete
              label="Owner"
              service="pos/owner"
              v-bind:select="editedItem.owner"
              v-on:change="changeOwner"
            />
             <AutoComplete
              label="Category"
              service="pos/category"
              v-bind:select="editedItem.category"
              v-on:change="changeCategory"
            />
            <v-text-field
              dense
              v-model="editedItem.name"
              label="Name"
              append-icon="text_format"
              :counter="50"
            ></v-text-field>
             <v-text-field
              dense
              v-model="editedItem.description"
              label="Description"
              append-icon="text_format"
              :counter="50"
            ></v-text-field>
             <v-text-field
              dense
              v-model="editedItem.unitPrice"
              type="number"
              label="Price"
              append-icon="text_format"
              :counter="50"
            ></v-text-field>

             <v-text-field
              dense
              v-model="editedItem.unit"
              label="Unit"
              append-icon="text_format"
              :counter="50"
            ></v-text-field>
              <v-text-field
              dense
              v-model="editedItem.photo"

              label="Photo"
              append-icon="text_format"
              :counter="50"
            ></v-text-field>    
               <AutoComplete
              label="Discount"
              service="pos/discount"
              v-bind:select="editedItem.discount"
              v-on:change="changeDiscount"
            /> 
             
             
             <v-row style="padding:10px" v-if="isediting">
             
              <v-checkbox dense v-model="editedItem.deliverable" label="Deliverable" required></v-checkbox>
            </v-row>
           
          </v-col>

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
import moment from "moment";
import AutoComplete from "../components/AutoComplete";
export default {
   components: {
    AutoComplete: AutoComplete
  },
  computed: {
    loading() {
      return this.$store.state.positem.loading;
    },
    success() {
      return this.$store.state.positem.success;
    },
    error() {
      return this.$store.state.positem.error;
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
        this.$store.state.positem.items &&
        this.$store.state.positem.items.rows
      ) {
        this.$store.state.positem.items.rows.forEach(item => {
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
      return this.$store.state.positem.items.total;
    },
    limit() {
      return this.$store.state.positem.items.limit;
    },
    pageChange() {
      return (
        this.page + "" + this.pageSize + "" + this.sort + "" + this.sortOrder
      );
    },
    pagination() {
      return this.$store.state.positem.pagination;
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
    this.$store.dispatch("positem/clearState");
    this.getItems();
  },
  methods: {
    async clear() {
      this.$store.dispatch("positem/clearState");
    },
    changeOwner(value) {
        this.editedItem.owner = value._id;
    },
  changeCategory(value) {
        this.editedItem.category = value._id;
    },
    changeDiscount(value) {
        this.editedItem.discount = value._id;
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
          populate: [ "owner","discount","category"]
      };
      // eslint-disable-next-line no-console
      console.log(this.sort + ":" + this.sortOrder);
      if (this.sort && this.sort != "") {
        data.sort = ((this.sortOrder + "" == "true") ? "-" : "") + this.sort;
      }

      if (this.filterChange.query) {
        data.search = this.filterChange.query;
        data.searchFields = "name";
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
      await this.$store.dispatch("positem/getItems", data);
    },

    async deleteUser() {
      if (confirm("Are you sure you want to delete this item?")) {
        if (
          await this.$store.dispatch("positem/deleteItem", this.editedItem._id)
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
          await this.$store.dispatch("positem/updateItem", {
            name: this.editedItem.name,
            description: this.editedItem.description,
            itemCode: this.editedItem.itemCode,
            owner:this.editedItem.owner,
            category:this.editedItem.category,
            discount:this.editedItem.discount,
            unitPrice: this.editedItem.unitPrice,
            unit: this.editedItem.unit,
            photo: this.editedItem.photo,
            deliverable: this.editedItem.deliverable,
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
        if (await this.$store.dispatch("positem/createItem", this.editedItem)) {
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
        text: "Code (Click to edit)",
        align: "left",
        value: "itemCode"
      },
      {
        text: "Name",
        align: "left",
        value: "name"
      },
      {
        text: "Owner",
        align: "left",
        value: "owner.name"
      },
       {
        text: "Category",
        align: "left",
        value: "category.name"
      },
       {
        text: "Discount",
        align: "left",
        value: "discount.name"
      },
      {
        text: "Price",
        align: "left",
        value: "unitPrice"
      },
       {
        text: "Unit",
        align: "left",
        value: "unit"
      },
      {
        text: "Deliverable",
        align: "left",
        value: "deliverable"
      },
     
      { text: "Created At", align: "center", value: "createdAt", width: 110 }
    ]
  })
};
</script>