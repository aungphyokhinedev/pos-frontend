


<template>
  <div>
    <v-card>
  
      <v-toolbar class="elevation-0" color="mt-2" dense>
        <div class="overline">Report Filter</div>
        <v-spacer />
        <v-btn @click="showFilter" class="mr-2" small icon>
          <v-icon :color="isFiltered?'primary':''" small>mdi-filter-outline</v-icon>
        </v-btn>
        <v-btn @click="showDateOption" class="mr-2" small icon>
          <v-icon :color="choosedDate?'primary':''" small>mdi-progress-clock</v-icon>
        </v-btn>
        <v-btn @click="showGroup" class="mr-2" small icon>
          <v-icon :color="isGrouped?'primary':''" small>mdi-playlist-check</v-icon>
        </v-btn>
        <v-btn @click="clear" class="mr-0" small icon>
          <v-icon small>mdi-refresh</v-icon>
        </v-btn>
      </v-toolbar>
      <v-row no-gutters>
        <v-col>
          <v-list dense two-line>
           
                <v-list-item v-if="dateFilter.start">
                  <v-list-item-icon>
                    <v-icon color="indigo">mdi-progress-clock</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>From Date</v-list-item-title>
                    <v-list-item-subtitle>{{moment(dateFilter.start).format('MMMM Do YYYY')}}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              
                <v-list-item v-if="dateFilter.end">
                  <v-list-item-action></v-list-item-action>

                  <v-list-item-content>
                    <v-list-item-title>To Date</v-list-item-title>
                    <v-list-item-subtitle>{{moment(dateFilter.end).format('MMMM Do YYYY')}}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
            

            <v-divider v-if="valueFilter" inset></v-divider>

            <v-list-item v-for="(item,i) in valueFilter" :key="i">
              <v-list-item-icon v-if="i==0">
                <v-icon color="indigo">mdi-filter-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-action v-if="i>0"></v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>Filter by {{item.name}}</v-list-item-title>
                <v-list-item-subtitle>{{item.findBy}}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-divider v-if="groupFilter" inset></v-divider>

            <v-list-item v-for="(item,i) in groupFilter" :key="i">
              <v-list-item-icon v-if="i==0">
                <v-icon color="indigo">mdi-playlist-check</v-icon>
              </v-list-item-icon>
              <v-list-item-action v-if="i>0"></v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>Group by</v-list-item-title>
                <v-list-item-subtitle>{{item.name}}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-card>
    <DatePicker v-on:changeDate="changeDate" :dates="dates" ref="datemenu" />
    <EntryForm
      :title="model.filter.title"
      :subtitle="model.filter.subtitle"
      :items="model.filter.items"
      v-on:save="saveFilter"
      ref="filter"
    />
    <GroupOptions ref="group" v-on:change="saveGroup" :model="model.group" />
  </div>
</template>
<script>
import moment from "moment";
import DatePicker from "../Dialogue/DatePicker";
import EntryForm from "../Dialogue/EntryForm";
import GroupOptions from "../Dialogue/GroupbyOptions";

export default {
  components: {
    DatePicker,
    EntryForm,
    GroupOptions
  },
  props: ["model", "value"],
  data: () => ({
    dates: [],
    filter: null,
    group: null,
    valueFilter: null,
    params: null
  }),
  async mounted() {
      if(this.value){
          this.group = this.value.group ? this.value.meta.group : null
          this.dates = []
          this.filter = null
          
          if(this.value.start){
              this.dates.push(moment(this.value.start).format("YYYY-MM-DD"))
          }
           if(this.value.end){
              this.dates.push(moment(this.value.end).format("YYYY-MM-DD"))
          }

          if( this.value.meta && this.value.meta.filter){
     
              this.filter = this.value
                this.setValueFilter()
          }
          
      }
  },
  watch: {
    dateFilter(){
      this.changePrarms()
    },
    groupFilter(){
      this.changePrarms()
    },
    valueFilter(){
      this.changePrarms()
    }
  },
  computed: {
    moment() {
      return moment;
    },
    isGrouped() {
      return this.group;
    },
    isFiltered() {
      return this.filter;
    },
    choosedDate() {
      return this.dates.length > 0;
    },
    groupFilter() {
      if (this.group) {
        return this.group.filter(item => item.checked);
      } else {
        return null;
      }
    },
    dateFilter() {
      let _params = {};
      if (this.dates.length == 1) {
        _params.start = moment(this.dates[0]).format("MM-DD-YYYY");
        _params.end = moment(this.dates[0])
          .add(1, "days")
          .format("MM-DD-YYYY");
      } else if (this.dates.length == 2) {
        const _asc = this.dates[0] < this.dates[1];
        const _start = moment(this.dates[0]).format("MM-DD-YYYY");
        const _end = moment(this.dates[1]).format("MM-DD-YYYY");
        _params.start = _asc ? _start : _end;
        _params.end = _asc ? _end : _start;
      } else {
        _params.start = moment(Date.now()).format("MM-DD-YYYY");
        _params.end = moment(Date.now())
          .add(1, "days")
          .format("MM-DD-YYYY");
      }

      return _params;
    },

  },
  methods: {
    changePrarms() {
       let _params = {start:this.dateFilter.start,end:this.dateFilter.end};
      let _meta = {};
  
  // eslint-disable-next-line no-console
        console.log("date --", _params)
      if (this.valueFilter && this.valueFilter.length > 0) {
        this.valueFilter.forEach(item => {
          _params[item.name] = item.value;
        });
        _meta = { ..._meta, filter: this.valueFilter };
      }
 // eslint-disable-next-line no-console
        console.log("value --", _params)
      if (this.groupFilter && this.groupFilter.length > 0) {
        _params.group = this.groupFilter[0].value;
        _meta = { ..._meta, group: this.groupFilter };
      }
 
      _params.meta = _meta;
        // eslint-disable-next-line no-console
        console.log("rep --", _params)
       this.$emit("change", _params);
      return _params;
    },
    async setValueFilter() {
      let _params = [];
      if (this.filter) {
        for (let item of this.model.filter.items) {
          if (this.filter[item.value]) {
            let _value = await this.fetchByIds(
              [this.filter[item.value]],
              item.collection
            );
            if (_value && _value.rows.length > 0) {
              _params.push({
                name: item.value,
                findBy: _value.rows[0][item.findBy],
                value: _value.rows[0]._id
              });
            }
          }
        }
      }
      this.valueFilter = _params;
    },
    clear() {
      this.dates = [];
      this.filter = null;
      this.group = null;
      this.valueFilter = null;
    },
    showGroup() {
      this.$refs.group.show();
    },
    async showFilter() {
      this.$refs.filter.show();
    },
    saveGroup(params) {
      this.group = [...params];
    },
    saveFilter(params) {
     
      this.filter = { ...params };
      this.setValueFilter();
    },
    showDateOption() {
      this.$refs.datemenu.show();
    },
    changeDate(value) {
      this.dates = value;
      // this.changeFilter();
      this.$emit("changeDate", value);
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