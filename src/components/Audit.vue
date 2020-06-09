<template>
  <v-content>
    <v-container fluid>
 
   
      
            <v-row align="center" justify="center">
        <v-data-table
          dense=""
          :headers="headers"
          :items="items"
          :items-per-page.sync="perpage"
          :page.sync="page"
          :sort-by.sync="sortby"
          :sort-desc.sync="sortdesc"
          :server-items-length="total"
          :items-per-page-options="15"
          class="elevation-1"
        >
        
          <template v-slot:top> 
    <v-toolbar  dark  color="primary" flat >
         <v-icon class="mr-2" small >
           help_outline
                </v-icon>
     
        <span class="title mr-2">Audit Logs</span>
        
        <v-spacer></v-spacer>
       <v-icon small @click="pagintateGetItems"  >
           refresh 
                </v-icon>
              
      </v-toolbar>
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
      if(this.$store.state.audit.items &&
      this.$store.state.audit.items.data
      ){
        this.$store.state.audit.items.data.forEach(log =>{
        var newlog = Object.assign({}, log);
        newlog.createdAt = moment(newlog.createdAt).format('D MMM YY hh:mm:ss')
        result.push(newlog);

      })
      }
      

      return result;
    },
    total() {
      return  this.$store.state.audit.items.total;
    },
    limit() {
      return this.$store.state.audit.items.limit
    },
      pagination() {
      return this.$store.state.audit.pagination;
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
      await this.$store.dispatch("audit/setPagination", pagination);
    },
    getItems() {
      // Dispatch the action to buy a TV
      this.$store.dispatch("audit/getItems", {pagination:this.pagination,query:this.query });
    },

    
  },
  data: () => ({
    perpage: 10,
    page: 1,
    sortdesc:false,
    sortby:null,
    dialog: 'createdAt',
    headers: [
  { text: "Email", value: "email" },
   { text: "Token ID", value: "tokenId" },
   { text: "User ID", value: "uid" },
   { text: "Remark",align: "center", value: "remark" },
      { text: "Date",align: "center", value: "createdAt" },
      
     
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