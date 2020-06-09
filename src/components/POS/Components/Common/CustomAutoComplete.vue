<template>
<div>

    <v-combobox
    v-bind="$attrs"
      style="border-radius:0"
      :search-input.sync="search"
      v-model="model"
      select="select"
      :item-text="displayKey"
      item-value="_id"
      :items="items"
      :label="label"
      :filter="customFilter"
      :error-messages="error"
    >
    <template v-slot:item="data">
      <v-list-item-content>
                    <v-list-item-title>{{data.item[displayKey]}}</v-list-item-title>
                  </v-list-item-content>
    </template>
    </v-combobox>

</div>
</template>

<script>
export default {
  data: () => ({
    descriptionLimit: 60,
    entries: [],
    isLoading: false,
    search: "movie",
    model: null
  }),
  props: ["label", "select", "collection","store", 
  "findBy","value","extraValues",
  "query","public", "error", "populate"],
  created() {
   
    this.model = this.select;
  },

  computed: {
    extraQuery() {
      let _query = {...this.query,deleteFlag: false};
      return _query;

    },
    displayKey() {
      if (this.findBy) {
        return this.findBy[0];
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

      return this.entries ? this.entries.total > 0? this.entries.rows :[] : [];
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
  methods:{
    customFilter(item, queryText){
      const searchText = queryText.toLowerCase()
      if(!this.findBy) {
         return item["name"].toLowerCase().indexOf(searchText) > -1
      }

      let _match = false;
      
      for(const _key of this.findBy){
        _match = _match ||  item[_key].toLowerCase().indexOf(searchText) > -1
      }
      return _match
    }
  },
  watch: {
    model() {
      if(this.model){
      
        this.$emit("change",{ name: this.value, value: this.model } );
        if(this.extraValues){
          for(var _value of this.extraValues){

            if(this.model[_value.value]){
              this.$emit("change",{ name: _value.name, value: this.model[_value.value] } );
            }
            
          }
        }
      }
      else{
         this.$emit("change",{ name: this.value, value: null } );
      }
      
    },
    async search(val) {
      if (!val) return;
      // Items have already been loaded
      // if (this.items.length > 1) return

      // Items have already been requested
      if (this.isLoading) return;

      this.isLoading = true;
      var query = {
        nocache : true,
        page: 1,
        sort: this.displayKey,
        query: this.extraQuery,
        collection: this.collection,
      };
      let regexs = []
     
     if(this.findBy) {
      for(const _key of this.findBy){
        let _regex = {};
        _regex[_key] = { $regex: val, $options: "$i" };
        regexs.push( _regex);
      }
      query.query.$or = regexs
     }
      
      if(this.public){
        query.public = this.public
      }
      if(this.populate){
        query.populate = this.populate
      }

      this.entries = await this.$store.dispatch(this.store + "/getItems", query);
      this.isLoading = false;
    }
  }
};
</script>