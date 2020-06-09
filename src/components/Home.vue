<template>
  <v-content>
    <v-container fluid>
      <v-row dense>
        <v-col cols="12">
          <v-card class="grad0 shadow" dark>
            <v-card-title class="headline">Total: {{userInfo.total }}</v-card-title>

            <v-card-subtitle>Locked {{userInfo.locked}}, Blocked {{userInfo.blocked}}</v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
      <v-row align="center" justify="space-around">
        <v-col cols="12">
          <v-card>
            <v-row>
              <v-col cols="8">
                <div
                  style="margin-left:20px;margin-bottom:10px;margin-top:15px;"
                  class="title"
                >Services and Latency</div>
                <ul style="list-style-type:none">
                  <li
                    class="body-2"
                    v-for="item in summaryInfo"
                    :key="item.name"
                  >{{ item.name }} - {{ item.latency }}ms</li>
                </ul>
              </v-col>
              <v-col cols="4">
                <VueApexCharts height="230" :options="options" :series="series" />
                <!--<VueApexCharts height=230 width=300  :options="options" :series="series" /> -->
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
//import moment from "moment";
import VueApexCharts from "vue-apexcharts";
export default {
  components: {
    VueApexCharts
  },
  beforeDestroy() {
    clearInterval(this.timer);
    clearInterval(this.timer2);
  },
  async created() {
    this.loadData(true);
    this.loadSummary();
    this.timer = setInterval(this.loadSummary, 10000);
    // this.timer2 = setInterval(this.loadInfoData, 5000)
  },
  computed: {
    options() {
      var avg = this.avgLatency;
      var data = {
        chart: {
          height: 230,
          type: "radialBar"
        },
        plotOptions: {
          radialBar: {
            dataLabels: {
              name: {
                fontSize: "22px"
              },
              value: {
                fontSize: "16px"
              },
              total: {
                show: true,
                label: "Base",
                formatter: function() {
                  // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                  return avg;
                }
              }
            }
          }
        }
        //  series: [44, 55, 67, 83],
        //  labels: ['Apples', 'Oranges', 'Bananas', 'Berries'],
      };

      data.labels = this.summaryInfo.map(item => item.name);
      return data;
    },
    labels() {
      return [44, 55, 67, 83];
    },
    series() {
      return this.summaryInfo.map(item => {
        return item.latency + this.avgLatency;
      });
    },

    colors() {
      var colors = [
        "#F3B415",
        "#F27036",
        "#663F59",
        "#6A6E94",
        "#4E88B4",
        "#00A7C6",
        "#18D8D8",
        "#A9D794",
        "#46AF78",
        "#A93F55",
        "#8C5E58",
        "#2176FF",
        "#33A1FD",
        "#7A918D",
        "#BAFF29"
      ];
      return colors.reverse();
    },
    loading() {
      return this.$store.state.summary.loading;
    },
    userInfo() {
      return this.$store.state.summary.userInfo
        ? this.$store.state.summary.userInfo
        : { total: 0, locked: 0, blocked: 0 };
    },
    summaryInfo() {
      return this.$store.state.summary.summaryInfo
        ? this.$store.state.summary.summaryInfo
        : [];
    }
  },
  watch: {
    isLoggedIn() {
      if (this.isLoggedIn) {
        this.$router.push("/dashboard/user");
      }
    }
  },
  methods: {
    generateData(count, yrange) {
      var i = 0;
      var series = [];
      while (i < count) {
        var x = (i + 1).toString();
        var y =
          Math.floor(Math.random() * (yrange.max - yrange.min + 1)) +
          yrange.min;

        series.push({
          x: x,
          y: y
        });
        i++;
      }
      return series;
    },
    async loadData(force) {
      if (this.autoSync || force) {
        // eslint-disable-next-line no-console
        console.log("load data");
        await this.$store.dispatch("summary/clearState");
        await this.$store.dispatch("summary/getUserInfo");
      }
    },
    async loadSummary() {
      await this.$store.dispatch("summary/getSummary");
    }
  },
  data: () => ({
    autoSync: true,
    timer: null,
    timer2: null,
    avgLatency: 50
  })
};
</script>
<style>
.apexcharts-legend {
  text-align: left;
}
.apexcharts-legend-series {
  float: left;
}
.grad0 {
  background: linear-gradient(90deg, #d53369 0%, #daae51 100%);
}
.grad1 {
  background: linear-gradient(90deg, #9ebd13 0%, #008552 100%);
}
.grad2 {
  background: linear-gradient(90deg, #4b6cb7 0%, #182848 100%);
}
.shadow {
  -webkit-box-shadow: 2px 108px 136px -78px rgba(0, 0, 0, 0.58);
  -moz-box-shadow: 2px 108px 136px -78px rgba(0, 0, 0, 0.58);
  box-shadow: 2px 108px 136px -78px rgba(0, 0, 0, 0.58);
}
</style>