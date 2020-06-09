<template>
  <div>
       <AlertDialogue  v-if="error" v-on:ok="errorClose" :model="errorModel" />
  <AlertDialogue  v-if="success" v-on:ok="errorClose" :model="successModel" />
    
  </div>
</template>

<script>
import AlertDialogue from "../Dialogue/AlertDialogue";
export default {
  components: {
    AlertDialogue:AlertDialogue,
  },
  created() {
  },
  props:["model"],
  computed: {
    loading() {
      return this.$store.state[this.model.store].loading;
    },
     success() {
      return this.$store.state[this.model.store].success;
    },
    error() {
      return this.$store.state[this.model.store].error;
    },
    errorModel() {
      return {
      persistent: true,
      show:true,
      title:'Application Error',
      subtitle:this.error,
      type:'error',
      actions:{
        ok:{
          name:"Close",
        }
      }
    }
    },
    successModel() {
      return {
      show:true,
      title:'Success',
      subtitle:this.success,
      type:'success',
      actions:{
        ok:{
          name:"Close",
        }
      }
    }
    }
  },
  watch: {},
  methods: {
    errorClose(){
      this.$store.dispatch(this.model.store + "/clearState");
    },
  },
  data: () => ({
   
  })
};
</script>

<style lang="scss">
</style>