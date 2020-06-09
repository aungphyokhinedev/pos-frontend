

<template>
<v-flex>
     <v-flex v-if="isEmpty" >You don't have any {{name}}</v-flex>
    <v-flex v-if="minimize" class="mt-2">
       
     <v-btn v-if="isEmpty" @click="showEntryForm" outlined large color="primary">Please add one</v-btn>
      
        <v-btn text v-if="!isEmpty && minimize" @click="minimize = false"     color="primary">
            {{name}}
            [{{items.length}}]
            
            </v-btn>
   
    </v-flex>
  
  <v-flex class="mt-2" v-if="!isEmpty && !minimize">
    <v-system-bar
      :class="barcss"
      window
      :color="!issearching?'primary':'white'"
      :dark="!issearching"
    >
      <v-icon v-if="!issearching" class="ml-2" @click="issearching = true">mdi-magnify</v-icon>

      <span v-if="!issearching">{{items.length}} total data entries</span>
      <v-spacer v-if="!issearching"></v-spacer>
     
      <SearchInputBar
        v-on:clear="closeSearch"
        v-on:change="searchChange"
        v-if="issearching"
        :value="searchkeyword"
      />

      <v-icon v-if="!issearching">mdi-unfold-more-horizontal</v-icon>
      <v-icon @click="minimize = true" v-if="!issearching">mdi-close</v-icon>
    </v-system-bar>

    <v-toolbar class="mt-2"  v-if="!issearching" flat>
      <span class="mr-4">Your {{name}} List</span>
      <v-btn @click="add" dark outlined x-small color="primary">Add New</v-btn>

      <v-spacer></v-spacer>

      <v-btn class="mr-1" small icon>
        <v-icon  small>refresh</v-icon>
      </v-btn>
    </v-toolbar>
    <v-data-table dense="" :headers="headers" :items="items" item-key="name" class="elevation-1"></v-data-table>
  </v-flex>
  </v-flex>
</template>

<script>
import SearchInputBar from "./SearchInputBar.vue";
export default {
  components: {
    SearchInputBar: SearchInputBar
  },
  props: ["headers","name","items","types","actions"],
  computed: {
    barcss() {
      return this.issearching ? "barexpand" : "barnormal";
    },
    isEmpty() {
            return   this.items == null || this.items.length == 0;
    },
  },
  methods: {
    searchChange(value) {
      this.$emit('search',value);
    },
    closeSearch() {
        this.issearching = false;
    },
    add() {
        this.$emit('addnew');
    }
  },
  data: () => ({
    minimize:true,
    searchkeyword: null,
    issearching: false,
    
  })
};
</script>
<style scoped>
.barnormal {
  min-height: 30px;
  transition: min-height 0.15s ease-out;
}

.barexpand {
  border: none;
  padding: 0;
  min-height: 60px;
  transition: min-height 0.25s ease-in;
}
.hide {
  animation: fadeout 1s;
}
.show {
  animation: fadein 1s;
}
@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes fadeout {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>