
<template>
 <v-system-bar
dark=""
 v-if="!isonline"
            class="bar"
         
          :height="height"
          :lights-out="lightsOut"
          :window="window"
          
        >

          <v-icon class="mr-3">mdi-wifi-strength-alert-outline</v-icon>
          <span>Connection is not available. </span>
          <v-spacer></v-spacer>
  
          <v-icon small>mdi-message</v-icon>
        </v-system-bar>
</template>

<script>

export default {
props: ["icon", "color"],
  data() {
    return {
    };
  },
  computed: {
    isonline(){
      return this.$online;
    }
  },
};
</script>

<style scoped>

.bar{
   position: fixed;
    z-index: 100;
    left:0;
    bottom:0;
    right:0;
}
</style>