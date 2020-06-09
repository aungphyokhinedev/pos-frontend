

<template>
  <div v-if="model" class="text-center">
    <v-dialog :persistent="model.persistent" v-model="model.show" max-width="500">
      <v-card  outlined>
        <DirectOrder :key="model.id"  :id="model.id" />
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import DirectOrder from "../Panel/DirectOrder"
export default {
  components: {
      DirectOrder
  },
  computed: {
  },
  props: [],
  data() {
    return {
        model:null
    };
  },
  methods: {
    show(params) {
        this.model = {
            show: true,
            id:params.id
        }
    },
    close() {
        this.model.show = false
        this.$emit("close")
    },
  }
};
</script>
<style >
</style>