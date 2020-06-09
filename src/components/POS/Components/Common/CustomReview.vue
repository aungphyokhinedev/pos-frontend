

<template>
   <div>
         <v-btn outlined="" color="primary" @click="click" small icon>
        <v-icon small>
          mdi-forum-outline
        </v-icon>
        </v-btn>
   </div> 
</template>

<script>
export default {
  props: ["model"],
  computed: {
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