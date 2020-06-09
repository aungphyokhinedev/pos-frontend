<template>
  <div>
    <v-text-field
      dense
      v-bind="$attrs"
      :counter="length"
      v-model="datamodel"
      @change="change"
      :append-icon="showPassword ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
      :type="showPassword ? 'text' : 'password'"
      @click:append="showPassword = !showPassword"
    ></v-text-field>
  </div>
</template>

<script>
export default {
  props: ["model", "value", "length"],
  created() {
    this.datamodel = this.model;
  },
  computed: {},
  watch: {
    model(value) {
      this.datamodel = value;
    }
  },
  methods: {
    change() {
      this.$emit("change", { name: this.value, value: this.datamodel });
    }
  },
  data: () => ({
    datamodel: null,
    showPassword: false
  })
};
</script>
<style scoped>
</style>