

<template>

<v-row  >
<v-col>
      <ShopEntry v-on:addshop="addShop" ref="shopentry"/>
<DataListTable v-on:addnew="showEntryForm" :items="items" :headers="headers" name="Users"/>
</v-col>
</v-row>
</template>

<script>
import DataListTable from './Common/DataListTable.vue';
import ShopEntry from '../Components/Dialogue/ShopEntry';
export default {
   components: {
       DataListTable:DataListTable,
       ShopEntry:ShopEntry
    },
    props: {
      source: String,
    },
    computed: {
       
    },
    methods: {
        addShop(value) {
            // eslint-disable-next-line no-console
            console.log(value);
        },
        showEntryForm(){
            this.$refs.shopentry.show();
        }
    },  
    data: () => ({
       headers: [
          {
            text: 'Name (click to edit)',
            align: 'left',
            sortable: false,
            value: 'name',
          },
          { text: 'Address', value: 'address' },
          { text: 'Mobile', value: 'mobile' },
          { text: 'Email', value: 'email' },
            { text: 'Description', value: 'description' },
        ],
        items:[]
    }),
  }
</script>
<style scoped>
</style>