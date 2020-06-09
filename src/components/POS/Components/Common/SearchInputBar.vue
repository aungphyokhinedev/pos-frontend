

<template>
  <v-card style="border-radius:0" :color="!dark ? 'accent' :null" :dark="dark" v-if="show" class="pa-2 pl-6 pr-3" outlined>
    <OrderOptions :model="orderItems" v-on:changeOrder="changeOrder" ref="ordermenu" />
    
    <DatePicker v-on:changeDate="changeDate" :dates="dates" ref="datemenu" />
    <v-row>
      <v-btn class="mr-1" text icon small>
        <v-icon small>mdi-magnify</v-icon>
      </v-btn>

      <v-col style="padding:0;">
        <input
        @focus="dark = true"
         @blur="dark = false"
          v-if="renderComponent"
          v-on:change="changeSearch"
          v-model="value"
          class="body-1 pa-0"
          placeholder="Put your search here"
          style="width:100%;border:none;outline: none;"
        />
      </v-col>
      <v-btn @click="showOrderOption" class="mr-2" text icon small>
        <v-icon small>mdi-sort-alphabetical</v-icon>
      </v-btn>
      <v-btn @click="showDateOption" class="mr-2" text icon small>
        <v-icon small>mdi-progress-clock</v-icon>
      </v-btn>
      <v-btn class="mr-2" @click="clear" text icon small>
        <v-icon small>mdi-close</v-icon>
      </v-btn>
    </v-row>
  </v-card>
</template>

<script>

import OrderOptions from "../Dialogue/OrderOptions";
import DatePicker from "../Dialogue/DatePicker";
export default {
  components: {
    OrderOptions: OrderOptions,
    DatePicker: DatePicker
  },
  props: ["sortItems","show"],
  computed: {},
  watch: {
      sortItems(value){
          this.orderItems = value
      }
  },
  created() {
      this.orderItems = this.sortItems
  },
   data: () => ({
    renderComponent: true,
    dates: [],
    value: null,
    orderItems: [],
    dark: false
  }),
  methods: {
    inputEnter() {
      this.dark = true
    },
    clear() {
      this.$emit("clear");  
      this.value = null;
      this.dates = [];
      this.orderItems.forEach(
          element=>element.value = element.default
      )
      this.changeFilter();  
    },
    close() {
      this.renderComponent = false;
      this.clear()
      this.renderComponent = true;
    },
    changeFilter() {
      let _sort = null;
      for (let element of this.orderItems) {
        if (element.value) {
          _sort = element.value == 1 ? element.name : "-" + element.name;
        }
      }
      let _dates = this.dates;
      if (this.dates.length == 1) {
        let _start = this.dates[0] 
        _start += " 0:0:0";
        let _end = this.dates[0] 
        _end += " 23:59:59";
        _dates = { $gte: _start, $lte: _end };
      } else if (this.dates.length == 2) {
        let _start = this.dates[0] <= this.dates[1]?this.dates[0]:this.dates[1]
        let _end = this.dates[1] > this.dates[0]?this.dates[1]:this.dates[0]
        _end += " 23:59:59"
       _dates = { $gte: _start, $lte: _end };
      }
      else{
          _dates = null;
      }
      this.$emit("change", {
        dates: _dates,
        sort: _sort,
        search: this.value
      });
    },
    changeSearch() {
      this.changeFilter();
    },
    changeOrder(value) {
      this.changeFilter();
      this.$emit("changeOrder", value);
    },
    changeDate(value) {
      this.dates = value;
      this.changeFilter();
      this.$emit("changeDate", value);
    },
    showOrderOption() {
      this.$refs.ordermenu.show();
    },
    showDateOption() {
      this.$refs.datemenu.show();
    }
  },
 
};

</script>
<style scoped>
</style>