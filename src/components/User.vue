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
        :items="users"
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
            <span class="title mr-2">Registered Users</span>

            <v-spacer></v-spacer>
            <v-icon small @click="refresh">refresh</v-icon>
          </v-toolbar>
        </template>
        <template v-slot:item.email="{ item }">
          <a @click="edit(item)">{{item.email ? item.email: '-'}}</a>
        </template>

        <template style="width:20px;" v-slot:item.locked="{ item }">
          <v-chip outlined style="margin: 2px 0" small v-if="item.locked">
            <v-icon small left color="orange">mdi-key</v-icon>Locked
          </v-chip>
        </template>
        <template style="width:20px;" v-slot:item.blocked="{ item }">
          <v-chip outlined style="margin: 2px 0" small v-if="item.blocked">
            <v-icon small left color="red">mdi-account</v-icon>Blocked
          </v-chip>
        </template>
        <template style="width:20px;" v-slot:item.action="{ item }">
          <v-btn dense text small color="primary" :to="'./userdetail/' + item._id">
            <v-icon small>code</v-icon>
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
          <span class="title1">{{isediting?'Update Register':'New Register'}}</span>
          <v-spacer />
          <v-icon small>help_outline</v-icon>
          <v-icon @click="deleteUser" v-if="isediting" small>delete</v-icon>
        </v-card-title>

        <v-card-text>
          <v-col cols="12" style="padding:0">
            <v-text-field
              dense
              v-model="editedItem.userName"
              label="User Name"
              append-icon="text_format"
              :counter="50"
            ></v-text-field>
            <v-combobox
              v-model="editedItem.provider"
              @change="changeProvider"
              :items="providers"
              label="Login Provider"
            ></v-combobox>

            <v-text-field
              v-if="editedItem.provider=='internal' && !isediting"
              dense
              v-model="editedItem.password"
              label="Password"
              append-icon="text_format"
            ></v-text-field>
            <v-text-field
              v-if="editedItem.provider=='internal' && !isediting"
              dense
              v-model="editedItem.confirmPassword"
              label="Confirm Password"
              append-icon="text_format"
            ></v-text-field>

            <v-text-field dense v-model="editedItem.email" label="Email" append-icon="text_format"></v-text-field>
            <v-row style="padding:10px" v-if="isediting">
              <v-checkbox class="mr-3" dense v-model="editedItem.locked" label="Locked" required></v-checkbox>
              <v-checkbox dense v-model="editedItem.blocked" label="Blocked" required></v-checkbox>
            </v-row>
          </v-col>

          <v-row v-if="!isediting" align="center" justify="center">
            <v-btn color="primary" dark @click="save">Create User</v-btn>
          </v-row>
          <v-row v-if="isediting" align="center" justify="center">
            <v-btn color="primary" dark @click="save">Update User</v-btn>
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
        @click="next()"
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
      return this.$store.state.user.loading;
    },

    success() {
      return this.$store.state.user.success;
    },
    error() {
      return this.$store.state.user.error;
    },
    searching() {
      return this.$store.state.common.searching;
    },
    adding() {
      return this.$store.state.common.adding;
    },
    users() {
      var result = [];
      if (this.$store.state.user.users && this.$store.state.user.users.rows) {
        this.$store.state.user.users.rows.forEach(user => {
          var newuser = Object.assign({}, user);
          newuser.createdAt = moment(newuser.createdAt).format("D-MMM-YY");
          newuser.updatedAt = moment(newuser.updatedAt).format("D-MMM-YY");
          newuser.lastSucessfullLoggedInDate = moment(
            newuser.lastSucessfullLoggedInDate
          ).format("D-MMM-YY hh:mm");
          result.push(newuser);
        });
      }

      return result;
    },
    filterChange() {
      return this.$store.state.common.filter;
    },
    total() {
      return this.$store.state.user.users.total;
    },
    limit() {
      return this.$store.state.user.users.limit;
    },
    pageChange() {
      return (
        this.page + "" + this.pageSize + "" + this.sort + "" + this.sortOrder
      );
    },
    pagination() {
      return this.$store.state.user.pagination;
    }
  },
  watch: {
    error() {
      this.showError = true;
    },
    filterChange() {
      this.getUsers();
    },
    pageChange() {
      this.getUsers();
    },
    searching() {
      this.pagintateGetUsers();
    },
    query() {
      setTimeout(() => this.pagintateGetUsers(), 1000);
    }
  },
  created() {
    this.$store.dispatch("user/clearState");
    this.getUsers();
  },
  methods: {
    changeProvider(val) {
      this.editedItem.provider = val;
    },
    next() {
      if(!this.isadding){
        this.add();
      }
      else{
        this.close();
      }
    },
    refresh() {
      this.getUsers();
    },
    async clear() {
      this.$store.dispatch("user/clearState");
    },
    add() {
      this.editedItem = {};
      this.isediting = false;
      this.isadding = true;
    },
    async fakeUsers() {
      for (var i = 0; i < 1000; i++) {
        var payload = {
          email: faker.internet.email(),
          provider: "local",
          userName: faker.name.findName(),
          photoUrl: faker.image.imageUrl(),
          blocked: false,
          lastSucessfullLoggedInDate: faker.date.past(),
          lastLoggedInDate: faker.date.past()
        };
        await this.$store.dispatch("user/createUser", payload);
      }
    },
    edit(item) {
      // eslint-disable-next-line no-console
      console.log(item);
      this.editedItem = Object.assign({}, item);
      this.isediting = true;
      this.isadding = true;
    },

    async getUsers() {
      var data = {
        page: this.page,
        pageSize: this.pageSize
      };
      // eslint-disable-next-line no-console
      console.log(this.sort + ":" + this.sortOrder);
      if (this.sort && this.sort != "") {
        data.sort = (this.sortOrder  ? "-" : "") + this.sort;
      }

      if (this.filterChange.query) {
        data.search = this.filterChange.query;
        data.searchFields = "email,provider";
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
      await this.$store.dispatch("user/getUsers", data);
    },

    async deleteUser() {
      if (confirm("Are you sure you want to delete this item?")) {
        var done = await this.$store.dispatch(
          "user/deleteUser",
          this.editedItem._id
        );
        if (done) {
          this.getUsers();
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
        if(await this.$store
          .dispatch("user/updateUser", {
            userName: this.editedItem.userName,
            email: this.editedItem.email,
            _id: this.editedItem._id,
            locked: this.editedItem.locked,
            blocked: this.editedItem.blocked,
            provider: this.editedItem.provider
          })) {
          this.getUsers();
          this.isadding = false;
        }

        // Object.assign(this.users[this.editedIndex], this.editedItem);
      } else {
        // eslint-disable-next-line no-console
        console.log("add new");
        if (this.editedItem.provider == "internal") {
          if (await this.$store.dispatch(
            "user/createInternalUser",
            this.editedItem
          )){
            this.getUsers();
            this.close();
          }
        } else {
          if(await this.$store.dispatch(
            "user/createUser",
            this.editedItem
          )){
            this.getUsers();
            this.close();
          }
        }
      }
    }
  },
  data: () => ({
    editedItem: {},
    provider: null,
    pageSize: 10,
    page: 1,
    sort: "createdAt",
    sortOrder: true,
    showError: false,
    providers: ["local", "google", "facebook", "internal"],
    isadding: false,
    dialog: false,
    headers: [
      {
        text: "Email (Click to edit)",
        align: "left",
        value: "email"
      },
      { text: "Provider", value: "provider", width: 100 },
      { text: "Locked", align: "center", value: "locked", width: 100 },
      { text: "Blocked", align: "center", value: "blocked", width: 100 },
      //  { text: "ID", value: "_id" },
      { text: "Created At", align: "center", value: "createdAt", width: 110 },

      // { text: "Update At",  align: "center",value: "updatedAt" , width: 110 },
      {
        text: "Last login Date",
        align: "right",
        value: "lastSucessfullLoggedInDate",
        width: 150
      }
    ]
  })
};
</script>