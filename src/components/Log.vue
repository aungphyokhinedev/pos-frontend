<template>
  <v-content>
    <v-container fluid>
 
     
      
            <v-row align="center" justify="space-around">
        <v-data-table
          expand
          dense=""
          :headers="headers"
          :items="items"
          :items-per-page.sync="perpage"
          :page.sync="page"
          :sort-by.sync="sortby"
          :sort-desc.sync="sortdesc"
          :server-items-length="total"
          :items-per-page-options="15"
          class="elevation-1 md12"
        >
        
          <template v-slot:top> 
    <v-toolbar  dark  color="primary" flat >
        <v-icon small class="mr-2" >
           help_outline
                </v-icon>
     
        <span class="title mr-2">Token Logs</span>
        
        <v-spacer></v-spacer>
       <v-icon small @click="pagintateGetItems"  >
           refresh 
                </v-icon>
               
      </v-toolbar>
          </template>

     
          <template v-slot:item.valid="{ item }">

                 <v-icon small="" color="red" v-if="!item.valid">
           notification_important
                </v-icon>
               
   
               
            </template>
     
   
          <template v-slot:no-data>
            <v-flex>There is no data!</v-flex>
          </template>
        </v-data-table>

    
            </v-row>
   
    </v-container>
  </v-content>
</template>

<script> 
import moment from 'moment'
export default {
  computed: {
     query() {
      return this.$store.state.common.filter;
    },
    criteria() {
      return this.page + this.perpage + this.sortby + this.sortdesc;
    },
    items() {
      var result = [];
      if(this.$store.state.log.items &&
      this.$store.state.log.items.data
      ){
        this.$store.state.log.items.data.forEach(log =>{
        var newlog = Object.assign({}, log);
        newlog.createdAt = moment(newlog.createdAt).format('D MMM YY hh:mm:ss')
        result.push(newlog);

      })
      }
      

      return result;
    },
    total() {
      return  this.$store.state.log.items.total;
    },
    limit() {
      return this.$store.state.log.items.limit
    },
     pagination() {
      return this.$store.state.log.pagination;
    }
  },
  watch: {
    query() {
       setTimeout(()=>this.pagintateGetItems(),1000);
    },
    criteria() {
      this.pagintateGetItems();
    },
  },
  created() {

    this.pagintateGetItems()
   
    
  },
  methods: {
    add() {
      this.dialog = true
    },
    async pagintateGetItems() {
      await this.setPage()
      setTimeout(()=>this.getItems(),100) 
      
    },
    async setPage() {
      var pagination =  {};
      if(this.page){
        pagination.skip = (this.page - 1) * this.perpage
      }
      if(this.perpage){
        pagination.limit = this.perpage < 1? this.total : this.perpage
      }
      if(this.sortby ){
        pagination.sortby = this.sortby
         if(this.sortdesc){
        pagination.sortdesc = this.sortdesc + ''
      }
      }
     
      // eslint-disable-next-line no-console
      console.log('save pagination')
      // eslint-disable-next-line no-console
      console.log(pagination)
      await this.$store.dispatch("log/setPagination", pagination);
    },
    getItems() {
      // Dispatch the action to buy a TV
      this.$store.dispatch("log/getItems", {pagination:this.pagination,query:this.query });
    },

    
  },
  data: () => ({
    perpage: 10,
    page: 1,
    sortdesc:false,
    sortby:'createdAt',
    dialog: false,
    headers: [
  { text: "Correlation ID", value: "correlationId" },
   { text: "User", value: "user" },
   { text: "Channel", value: "channel" },
   
      { text: "Date",align: "center", value: "createdAt" },
      
     { text: "Status",align: "center", value: "valid" },
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