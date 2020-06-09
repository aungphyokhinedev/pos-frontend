

<template>
     <v-badge
         v-if="cartCount > 0"
       
          :content="cartCount"
          overlap
        >
          <v-btn small class="" @click="goToCart"   icon>
          <v-icon small="" class=" mr-1">mdi-basket</v-icon>
        </v-btn>
        </v-badge>
</template>

<script>
export default {
  props: [],
  computed: {
    cart() {
      let _collection = this.$store.getters[ "pospublic/getCollection"]
      return _collection("cartItems") || []
    },
    cartCount() {
      if(!this.cartItems) return 0
      return  this.cartItems.reduce((total,cart)=>{
       
        return total + (cart.items ? cart.items.length : 0)
      },0)
     // return this.cartItems ? this.cartItems.length : 0
    },
    cartItems() {
      let _collection = this.$store.getters["pospublic/getCollection"]
      return _collection("cartItems") || []
    },
  },
  methods: {
     goToCart() {
       this.$router.push("/pos/front/user/cart");
    },
  },
  watch: {},
  data() {
    return {};
  }
};
</script>
<style scoped>
</style>