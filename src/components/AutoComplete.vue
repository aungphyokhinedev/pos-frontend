<template>
  <v-flex>
    <v-combobox
      :search-input.sync="search"
      v-model="model"
      select="select"
      :item-text="displayKey"
      item-value="_id"
      :items="items"
      :label="label"
    ></v-combobox>
  </v-flex>
</template>

<script>
import axios from "../common/myaxios";
import constants from "../common/constants";
export default {
  data: () => ({
    descriptionLimit: 60,
    entries: [],
    isLoading: false,
    search: "movie",
    model: null
  }),
  props: ["label", "select", "service", "searchBy","returnValue","query"],
  created() {
    this.model = this.select;
  },

  computed: {
    extraQuery() {
      if (this.query) {
        return this.query;
      } else {
        return {};
      }
    },
    displayKey() {
      if (this.searchBy) {
        return this.searchBy;
      } else {
        return "name";
      }
    },
    fields() {
      if (!this.model) return [];

      return Object.keys(this.model).map(key => {
        return {
          key,
          value: this.model[key] || "n/a"
        };
      });
    },
    items() {
      return this.entries;
      /* 
        return this.entries.map(entry => {
          const Description = entry.Description.length > this.descriptionLimit
            ? entry.Description.slice(0, this.descriptionLimit) + '...'
            : entry.Description

          return Object.assign({}, entry, { Description })
        })
        */
    }
  },

  watch: {
    model() {
      this.$emit("change", this.model);
    },
    search(val) {
      if (!val) return;
      // Items have already been loaded
      // if (this.items.length > 1) return

      // Items have already been requested
      if (this.isLoading) return;

      this.isLoading = true;
      var query = {
        page: 1,
        sort: this.displayKey,
        query: this.extraQuery
      };
      query.query[this.displayKey] = { $regex: val, $options: "$i" };

      axios
        .post(constants.baseUrl + this.service + "/list", query)
        .then(response => {
          // eslint-disable-next-line no-console
          console.log(response.data);
          const { total, rows } = response.data;
          this.count = total;
          this.entries = rows;
        })
        .catch(error => {
          // eslint-disable-next-line no-console
          console.log(error);
        })
        .finally(() => (this.isLoading = false));

      // eslint-disable-next-line no-console
      console.log(val);
    }
  }
};
</script>