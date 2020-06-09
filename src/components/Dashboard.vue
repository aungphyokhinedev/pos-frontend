<template>
  <v-app id="sandbox">
    <v-dialog v-model="timedialog" max-width="350px">
      <v-card>
        <v-card-title>Time Filter</v-card-title>
        <v-card-text>
          <v-menu
            ref="startMenu"
            v-model="startMenu"
            :close-on-content-click="false"
            :nudge-right="40"
            :return-value.sync="start"
            transition="scale-transition"
            min-width="290px"
            offset-y
            full-width
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="start"
                label="Start Date"
                prepend-icon="event"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="start" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="startMenu = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.startMenu.save(start)">OK</v-btn>
            </v-date-picker>
          </v-menu>
          <v-menu
            ref="endMenu"
            v-model="endMenu"
            :close-on-content-click="false"
            :nudge-right="40"
            :return-value.sync="end"
            transition="scale-transition"
            min-width="290px"
            offset-y
            full-width
          >
            <template v-slot:activator="{ on }">
              <v-text-field v-model="end" label="End Date" prepend-icon="event" readonly v-on="on"></v-text-field>
            </template>
            <v-date-picker v-model="end" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="endMenu = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.endMenu.save(end)">OK</v-btn>
            </v-date-picker>
          </v-menu>
          <v-btn
            style="margin-bottom:10px;"
            class="col-md-12"
            dark
            @click="timedialog = false"
            color="primary"
          >close</v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-navigation-drawer
      v-model="primaryDrawer.model"
      :clipped="primaryDrawer.clipped"
      :permanent="mini"
      app
      overflow
    >
      <v-list style="padding:0" dense>
        <v-list-item>
          <!--   <v-img width="50" src="@/assets/securepass.png"></v-img> -->

          <v-list-item-avatar size="50">
            <avatar :username="user?user.email:''"></avatar>
          </v-list-item-avatar>

          <v-list-item-content>Administrator</v-list-item-content>
        </v-list-item>
        <v-list-item link to="/dashboard/home">
          <v-list-item-content>
            <v-list-item-title>Summary</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-group sub-group no-action>
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>SSO Services</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item link to="/dashboard/user">
            <v-list-item-content>
              <v-list-item-title>Registered Users</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link to="/dashboard/usergroup">
            <v-list-item-content>
              <v-list-item-title>User Groups</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link to="/dashboard/service">
            <v-list-item-content>
              <v-list-item-title>Services</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link to="/dashboard/application">
            <v-list-item-content>
              <v-list-item-title>Applications</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link to="/dashboard/rule">
            <v-list-item-content>
              <v-list-item-title>Read/Write Rules</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item link to="/dashboard/accessrule">
            <v-list-item-content>
              <v-list-item-title>Access Rules</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link to="/dashboard/permission">
            <v-list-item-content>
              <v-list-item-title>Permissions</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link to="/dashboard/checkpermission">
            <v-list-item-content>
              <v-list-item-title>Check User's Permission</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link to="/dashboard/checkapppermission">
            <v-list-item-content>
              <v-list-item-title>Check Application's Rule</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <v-list-group sub-group no-action>
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Account Services</v-list-item-title>
            </v-list-item-content>
          </template>
           <v-list-item link to="/dashboard/accounttype">
          <v-list-item-content>
            <v-list-item-title>Types</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
          <v-list-item link to="/dashboard/accountunit">
          <v-list-item-content>
            <v-list-item-title>Units</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
         <v-list-item link to="/dashboard/accountjournal">
          <v-list-item-content>
            <v-list-item-title>Journals</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
         <v-list-item link to="/dashboard/accountposting">
          <v-list-item-content>
            <v-list-item-title>Postings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/dashboard/accountaccessrule">
          <v-list-item-content>
            <v-list-item-title>Access Rules</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
         <v-list-item link to="/dashboard/accounttransactioncode">
          <v-list-item-content>
            <v-list-item-title>Transaction Codes</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
         <v-list-item link to="/dashboard/account">
          <v-list-item-content>
            <v-list-item-title>Accounts</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/dashboard/accountperiod">
          <v-list-item-content>
            <v-list-item-title>Account Periods</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
         <v-list-item link to="/dashboard/accountlock">
          <v-list-item-content>
            <v-list-item-title>Locking Check</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
         <v-list-item link to="/dashboard/accountcheck">
          <v-list-item-content>
            <v-list-item-title>Account Check</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
          <v-list-item link to="/dashboard/accounttransaction">
          <v-list-item-content>
            <v-list-item-title>Transaction Check</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
         </v-list-group>
  <v-list-group sub-group no-action>
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Common</v-list-item-title>
            </v-list-item-content>
          </template>
        <v-list-item link to="/dashboard/file">
          <v-list-item-content>
            <v-list-item-title>Upload Files</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
         <v-list-item link to="/dashboard/code">
          <v-list-item-content>
            <v-list-item-title>Codes</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
         <v-list-item link to="/dashboard/address">
          <v-list-item-content>
            <v-list-item-title>Addresses</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
          <v-list-item link to="/dashboard/geolocation">
          <v-list-item-content>
            <v-list-item-title>Geolocations</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/dashboard/contact">
          <v-list-item-content>
            <v-list-item-title>Contacts</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/dashboard/ranking">
          <v-list-item-content>
            <v-list-item-title>Rankings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
 </v-list-group>
 <v-list-group sub-group no-action>
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Inventory Services</v-list-item-title>
            </v-list-item-content>
          </template>
         <v-list-item link to="/dashboard/code">
          <v-list-item-content>
            <v-list-item-title>Codes</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
         <v-list-item link to="/dashboard/address">
          <v-list-item-content>
            <v-list-item-title>Addresses</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/dashboard/contact">
          <v-list-item-content>
            <v-list-item-title>Contacts</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/dashboard/inventorybrand">
          <v-list-item-content>
            <v-list-item-title>Brands</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
         <v-list-item link to="/dashboard/inventorycategory">
          <v-list-item-content>
            <v-list-item-title>Categories</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
          <v-list-item link to="/dashboard/inventoryitem">
          <v-list-item-content>
            <v-list-item-title>Items</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
          <v-list-item link to="/dashboard/inventorysupplier">
          <v-list-item-content>
            <v-list-item-title>Suppliers</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
          <v-list-item link to="/dashboard/inventorysuppliercontact">
          <v-list-item-content>
            <v-list-item-title>Suppliers' Contacts</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
          <v-list-item link to="/dashboard/inventorysupplieritem">
          <v-list-item-content>
            <v-list-item-title>Suppliers' Items</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
          <v-list-item link to="/dashboard/inventorystock">
          <v-list-item-content>
            <v-list-item-title>Stocks</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        </v-list-group>
        <v-list-group sub-group no-action>
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Socket Services</v-list-item-title>
            </v-list-item-content>
          </template>
        <v-list-item link to="/dashboard/socketevent">
          <v-list-item-content>
            <v-list-item-title>Events</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
              <v-list-item link to="/dashboard/socketroom">
          <v-list-item-content>
            <v-list-item-title>Rooms</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
              <v-list-item link to="/dashboard/socketroomuser">
          <v-list-item-content>
            <v-list-item-title>Users</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
         <v-list-item link to="/dashboard/socket">
          <v-list-item-content>
            <v-list-item-title>Socket Check</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
         <v-list-item link to="/dashboard/socketinvite">
          <v-list-item-content>
            <v-list-item-title>Socket Invite</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
  </v-list-group>
   <v-list-group sub-group no-action>
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Geolocation Services</v-list-item-title>
            </v-list-item-content>
          </template>
        <v-list-item link to="/dashboard/geolocation">
          <v-list-item-content>
            <v-list-item-title>Geolocations</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/dashboard/geolocationsearch">
          <v-list-item-content>
            <v-list-item-title>Proxy Search</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        </v-list-group>
         <v-list-group sub-group no-action>
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>E-Commerce Services</v-list-item-title>
            </v-list-item-content>
          </template>
        <v-list-item link to="/dashboard/commercecategory">
          <v-list-item-content>
            <v-list-item-title>Categories</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
         <v-list-item link to="/dashboard/commercecustomer">
          <v-list-item-content>
            <v-list-item-title>Customers</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
         <v-list-item link to="/dashboard/commercediscount">
          <v-list-item-content>
            <v-list-item-title>Discounts</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
         <v-list-item link to="/dashboard/commerceinfo">
          <v-list-item-content>
            <v-list-item-title>Infos</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
         <v-list-item link to="/dashboard/commerceorder">
          <v-list-item-content>
            <v-list-item-title>Orders</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
         <v-list-item link to="/dashboard/commerceorderdetail">
          <v-list-item-content>
            <v-list-item-title>Order Details</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
         <v-list-item link to="/dashboard/commercepayment">
          <v-list-item-content>
            <v-list-item-title>Payments</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
         <v-list-item link to="/dashboard/commerceproduct">
          <v-list-item-content>
            <v-list-item-title>Products</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
         <v-list-item link to="/dashboard/commerceproductinfo">
          <v-list-item-content>
            <v-list-item-title>Product Infos</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
         <v-list-item link to="/dashboard/commerceshipping">
          <v-list-item-content>
            <v-list-item-title>Shipping</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
   </v-list-group>
  <v-list-group sub-group no-action>
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Schedule Services</v-list-item-title>
            </v-list-item-content>
          </template>
        <v-list-item link to="/dashboard/schedulerule">
          <v-list-item-content>
            <v-list-item-title>Rules</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
            <v-list-item link to="/dashboard/scheduletask">
          <v-list-item-content>
            <v-list-item-title>Tasks</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

            <v-list-item link to="/dashboard/scheduletaskparam">
          <v-list-item-content>
            <v-list-item-title>Params</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
            <v-list-item link to="/dashboard/scheduletaskrule">
          <v-list-item-content>
            <v-list-item-title>Task Rules</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
          <v-list-item link to="/dashboard/schedulelog">
          <v-list-item-content>
            <v-list-item-title>Task Logs</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
  </v-list-group>
<v-list-group sub-group no-action>
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>POS Services</v-list-item-title>
            </v-list-item-content>
          </template>
         <v-list-item link to="/dashboard/posowner">
          <v-list-item-content>
            <v-list-item-title>Owners</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
         <v-list-item link to="/dashboard/posbill">
          <v-list-item-content>
            <v-list-item-title>Bills</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/dashboard/poscategory">
          <v-list-item-content>
            <v-list-item-title>Categories</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/dashboard/poscustomer">
          <v-list-item-content>
            <v-list-item-title>Customers</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
         <v-list-item link to="/dashboard/posdiscount">
          <v-list-item-content>
            <v-list-item-title>Discounts</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
          <v-list-item link to="/dashboard/positem">
          <v-list-item-content>
            <v-list-item-title>Items</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
          <v-list-item link to="/dashboard/posorder">
          <v-list-item-content>
            <v-list-item-title>Orders</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
          <v-list-item link to="/dashboard/posshop">
          <v-list-item-content>
            <v-list-item-title>Shops</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
          <v-list-item link to="/dashboard/posuser">
          <v-list-item-content>
            <v-list-item-title>Users</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
          <v-list-item link to="/dashboard/posshopuser">
          <v-list-item-content>
            <v-list-item-title>Shop and Users</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link to="/dashboard/posshipping">
          <v-list-item-content>
            <v-list-item-title>Shippings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/dashboard/posorderdetail">
          <v-list-item-content>
            <v-list-item-title>Order Details</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/dashboard/possale">
          <v-list-item-content>
            <v-list-item-title>Sales</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/dashboard/possaledetail">
          <v-list-item-content>
            <v-list-item-title>Sale Details</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/dashboard/posrating">
          <v-list-item-content>
            <v-list-item-title>Ratings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        </v-list-group>


        <v-list-item link to="/dashboard/audit">
          <v-list-item-content>
            <v-list-item-title>Audit Logs</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn small text @click="logout()">
            <v-icon small>logout</v-icon>Logout
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="primaryDrawer.clipped" app>
      <v-btn icon @click.stop="mini = !mini">
        <v-icon>{{mini?'mdi-chevron-left':'list'}}</v-icon>
      </v-btn>
      <v-toolbar-title v-if="!searching">Admin Panel</v-toolbar-title>
      <v-row>
        <v-row align="center" filled justify="center">
          <v-text-field
            v-model="query"
            v-if="searching"
            style="margin-top: 25px; margin-right: 10px;margin-left: 10px;"
            single-line
            dense
            rounded
            label="Search Keyword"
            prepend-inner-icon="search"
          ></v-text-field>

          <v-chip
            outlined
            color="secondary"
            dark
            @click:close="query = null"
            class="mr-1"
            v-if="filterdata.query"
            close
          >{{this.filterdata.query}}</v-chip>
          <v-chip
            outlined
            color="primary"
            @click:close="start = null"
            class="mr-1"
            v-if="filterdata.start"
            close
          >{{this.filterdata.start}}</v-chip>
          <v-chip
            outlined
            color="primary"
            @click:close="end = null"
            class="mr-1"
            v-if="filterdata.end"
            close
          >{{this.filterdata.end}}</v-chip>
          <v-icon v-if="searching" small class="mr-3" @click="search(false)">close</v-icon>
          <v-icon v-if="searching" small class="mr-7" @click="showtimedialogue()">apps</v-icon>
        </v-row>
        <v-icon v-if="!searching" class="mr-3" @click="search(true)">search</v-icon>
      </v-row>
    </v-app-bar>

    <router-view></router-view>
    <v-flex style="margin-bottom:50px;"></v-flex>
  </v-app>
</template>

<script>
import Avatar from "vue-avatar";
export default {
  components: {
    Avatar
  },
  watch: {
    isLoggedIn() {
      if (!this.isLoggedIn) {
        this.$router.push("../login");
      }
    },
    filterstatus() {
      var filter = {};
      if (this.query && this.query.trim().length > 0) {
        filter.query = this.query;
      } else {
        filter.query = null;
      }

      filter.start = this.start ? this.start : null;
      filter.end = this.end ? this.end : null;
      this.$store.dispatch("common/setFilter", filter);
    }
  },
  created() {
    if (!this.$store.state.common.isLoggedIn) {
      this.$router.push("../login");
    }
    var filter = this.$store.state.common.filter;
    this.query = filter.query;
    this.start = filter.start;
    this.end = filter.end;
  },
  computed: {
    user() {
      return this.$store.state.common.user;
    },
    searching() {
      return this.$store.state.common.searching;
    },
    isLoggedIn() {
      return this.$store.state.common.isLoggedIn;
    },
    adding() {
      return this.$store.state.common.adding;
    },
    filterdata() {
      return this.$store.state.common.filter;
    },
    filterstatus() {
      return this.query + this.start + this.end;
    }
  },
  data: () => ({
    startMenu: false,
    endMenu: false,
    timedialog: false,
    filter: {},
    query: null,
    start: null,
    end: null,
    light: -70,
    mini: true,
    drawers: ["Default (no property)", "Permanent", "Temporary"],
    primaryDrawer: {
      model: true,
      type: "permanent",
      clipped: false,
      floating: false,
      mini: false
    },
    footer: {
      inset: false
    }
  }),
  methods: {
    showtimedialogue() {
      this.timedialog = !this.timedialog;
    },
    logout() {
      this.$store.dispatch("common/logout");
    },
    search(val) {
      if (!val) {
        this.query = null;
        this.start = null;
        this.end = null;
      }
      this.$store.dispatch("common/setSearch", val);
    },
    add() {
      this.$store.dispatch("common/setAdd", !this.adding);
    }
  }
};
</script>

<style scoped>
.gradient {
  background: linear-gradient(90deg, #9ebd13 0%, #008552 100%);
}
.drawer {
  background-color: #333;
}
</style>