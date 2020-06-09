


<template>
  <div>
 
    <div v-if="model">
      <v-card class="mt-3 pa-5" v-if="summary">
      
        <div class="d-flex align-center justify-center">
          <apexchart
            :colors="colors"
            width="300"
            height="200"
            type="donut"
            :options="chartOptions"
            :series="series"
          ></apexchart>
        </div>
      </v-card>
      <v-card v-if="summary" class="pa-5 mt-3">
         <div class="font-weight-medium">
       Total Amount {{numeral(totalAmount).format("0,0.0")}} and {{totalCount}} transactions
        </div>
        <v-list >
        <v-list-item class="pa-0 " v-for="(item,i) in summary" two-line :key="i">
      <v-list-item-content class="pa-0 ">
        <v-list-item-title>{{item._label}}</v-list-item-title>
        <v-list-item-subtitle>Amount: {{numeral(item.total).format("0,0.0")}}, Transactions: {{item.count}}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
        </v-list>
      </v-card>

    

      <v-btn v-if="summary" large block class="mt-3" @click="search">New Search</v-btn>

      <ReportFilter :value="reportParams" v-on:change="filterChange" v-if="!summary" :model="model" />

      <v-btn v-if="!summary" large block class="mt-3" @click="fetchSummary">Continue</v-btn>
    </div>
    <div v-if="!model">Model is missing!</div>
    <AlertDialogue :model="alertModel" ref="alert" />
  </div>
</template>
<script>
import moment from "moment";
import numeral from "numeral";
import ReportFilter from "./ReportFilter";
import AlertDialogue from "../Dialogue/AlertDialogue"
export default {
  components: {
    ReportFilter,
    AlertDialogue
  },
  props: ["model"],
  data: () => ({
    summary: null,
    reportParams: null,
    alertModel: {
      persistent:false,
      title:"No Data Found",
      subtitle:"There is no data for current search, plese change report filter.",
      show:false,

    }
  }),
  async created() {},

  watch: {},
  computed: {
      numeral(){
    return numeral
  },
    totalAmount() {
      return this.summary
        ? this.summary.reduce((total, item) => total + item.total, 0)
        : 0;
    },
    totalCount() {
      return this.summary
        ? this.summary.reduce((total, item) => total + item.count, 0)
        : 0;
    },
    chartOptions() {
      return {
        chart: {
          type: "donut"
        },
        colors: this.colors,
        labels: this.summary.map(item => item._label),
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 300
              },

              legend: {
                position: "bottom"
              }
            }
          }
        ]
      };
    },
    colors() {
      return ["#3f51b5", "#039be5", "#f57c00", "#d81b60"];
    },
    series() {
      return this.summary.map(item => item.total);
    },
    moment() {
      return moment;
    }
  },
  methods: {
    filterChange(value) {
 
      this.reportParams = value;
    },
    search() {
      this.summary = null;
    },

    async fetchSummary() {
      let _data = await this.$store.dispatch(
        this.model.store + "/" + this.model.action,
        this.reportParams
      );
      if (_data && _data.length > 0) {
        if (this.reportParams.group) {
          const _ids = _data.map(item => item._id);
          const _groupinfo = this.reportParams.meta.group;
          const _values = await this.fetchByIds(_ids, _groupinfo[0].collection);
          _data = _data.map(item => {
            const _label = _values.rows.filter(
              value => value._id == item._id
            )[0];

            return {
              ...item,
              _label: _label ? _label[_groupinfo[0].display] : "other"
            };
          });
        } else {
          _data[0]._label = "All";
        }
        this.summary = _data;
      }
      else{
        this.alertModel.show = true
      }
    },
    async fetchByIds(ids, collection) {
      return await this.$store.dispatch("pospublic/findItems", {
        nocache: true,
        collection,
        query: {
          _id: { $in: ids }
        }
      });
    }
  }
};
</script>