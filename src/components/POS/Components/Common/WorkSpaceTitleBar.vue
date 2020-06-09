
<template>
   <v-toolbar elevation=2 dark style="border-radius:0;" class="secondary" dense>
          <span class="title ml-3 mr-5">
            iPos&nbsp;
            <span class="font-weight-light">Cybernetics</span>
          </span>

          <v-spacer></v-spacer>

          <v-btn @click="search" icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
     
        </v-toolbar>
</template>

<script>
export default {
  methods:{
    search(){
      this.$router.push("/pos/sale/transaction/all");
    }
  },
  data() {
    return {
    };
  }
};
</script>

<style scoped>
</style>