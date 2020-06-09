

<template>
  <v-btn outlined="" icon small>
      <v-icon @click="shuffle" color="primary" v-if="value"  small>mdi-bookmark
      </v-icon>
      <v-icon v-if="!value" @click="shuffle" color="primary"  small>mdi-bookmark-outline
      </v-icon>
  </v-btn>
</template>

<script>
export default {
  props: ["model"],
  created(){
      this.getInfo()
  },
  computed: {
  },
  methods: {
    async getInfo(){
        const _data = await this.$store.dispatch(this.model.store + "/findItems",{
          nocache: true,
          collection: "posfavourite",
          page:1,
          pageSize:1,
          query:{
         user: this.model.user,
         transactionID: this.model.transactionID,
          type:this.model.type}

      })
    
      this.value = _data.rows? _data.rows.length > 0 : false
      
    },
    async shuffle() {
    await this.$store.dispatch(this.model.store + "/setFavourite",{
          user: this.model.user,
          transactionID: this.model.transactionID,
          type:this.model.type

      })
      this.getInfo()
    }
  },
  watch: {},
  data() {
    return {
        value: false
    };
  }
};
</script>
<style scoped>
</style>