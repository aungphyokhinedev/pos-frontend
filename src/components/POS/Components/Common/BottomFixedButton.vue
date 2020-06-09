



<template>
   <div class="fixedbutton">
          <v-btn @click="click" :color="backcolor" fab dark>
            <v-icon >{{icon?icon:'mdi-help' }}</v-icon>
          </v-btn>
        </div>
</template>

<script>
export default {
  props: ["color","icon"],
  computed: {
     backcolor(){
         return this.color ? this.color: 'primary'
     }
     
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
.fixedbutton {
    position:fixed; 
    right:20px; 
    bottom:20px;
}
</style>