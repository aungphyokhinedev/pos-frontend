

<template>
  <v-list dense>
        <v-divider></v-divider>
        <v-list-item>
          <v-list-item-content class="pa-0">
            <v-list-item-title> <v-row>
                <v-col>Discounts</v-col>
                <v-spacer />
                <v-col class="text-right">({{discount}})</v-col>
              </v-row></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content class="pa-0">
            <v-list-item-title>
 <v-row>
                <v-col>Tax</v-col>
                <v-spacer />
                <v-col class="text-right">{{tax}}</v-col>
              </v-row>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <v-list-item-content class="pa-0 pb-0 pt-6" >
            <v-list-item-title>Total Items {{total}}/{{totalQty}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content class="pa-0 pb-4">
            <v-list-item-title class="title font-weight-regular">
              <v-row>
                <v-col>Total Amount</v-col>
                <v-spacer />
                <v-col class="text-right">{{totalAmount}}</v-col>
              </v-row>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
</template>

<script>
import numeral from "numeral";
import constants from "../../../../common/constants"
export default {
  props: ["model"],
  computed: {
    shop() {
      return this.$store.state.posfrontend.shop;
    },
    total() {
        return this.model.items.length
    },
    totalQty() {
      return this.model.items.reduce((total, item) => {
        return total + parseInt(item.qty);
      }, 0);
    },

    totalAmount() {
      return numeral(this.model.total).format(constants.numberFormat)
    },
    tax() {
     return numeral(this.model.tax).format(constants.numberFormat)
    },
    discount() {
      return numeral(this.model.discount).format(constants.numberFormat)
    }
  },
  methods: {
  
  },
  watch: {},
  data() {
    return {};
  }
};
</script>
<style scoped>
</style>