

<template>
  <v-row no-gutters="" @click="click">
      <v-col style="max-width:220px" no-gutters>
       
       <v-rating
       background-color="primary"
          :value="model.rate"
          color="primary"
          dense
          half-increments
          readonly
          size="17"
        ></v-rating>
 </v-col>
  <v-col>
        <div   style="margin-top:3px;" class="grey--text caption ml-1">{{numeral(model.rate).format('0.0')}} ({{numeral(model.total).format("0a")}})</div>
         </v-col>
  <v-spacer/>
  </v-row>
</template>

<script>
import numeral from "numeral"
export default {
  props: ["model"],
  computed: {
    numeral(){
      return numeral
    }
  },
  methods: {
    click() {
      this.$emit("click");
    }
  },
  watch: {},
  data() {
    return {};
  }
};
</script>
<style scoped>
</style>