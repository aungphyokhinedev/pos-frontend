

<template>
  <v-row :style="'background-color:' +color" no-gutters>
   
    <v-col style="color:white" class="d-flex align-center pl-4">
      <strong class="mr-1 body-2">{{prefix}}:</strong>
      <span class="body-2">{{message}}</span>
    </v-col>

    <v-btn small="" dark=""  text @click="close">close</v-btn>
  </v-row>
</template>

<script>
export default {
  props: ["message", "show", "type"],
  computed: {
    prefix() {
      return this.type == "error"
        ? "Error"
        : this.type == "success"
        ? "Success"
        : "Info";
    },
    color() {
      return this.type == "error"
        ? "#4CAF50"
        : this.type == "success"
        ? "#6200ea"
        : "#6200ea";
    }
  },
  methods: {
    close() {
      this.$emit("close");
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