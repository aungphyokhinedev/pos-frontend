<template>
  <v-dialog style="border-radius:0" title v-model="dialog" max-width="350">
   
    <v-list class="pa-5" v-if="renderComponent">
      <v-subheader class="caption mt-3">ORDER ITEMS BY</v-subheader>
      <v-list-item v-for="item in orderItems" @click="order(item)" :key="item.name">
        <v-list-item-content>
          <v-row no-gutters>
            <v-col>{{item.text}}</v-col>
            <v-spacer />
          
            <v-col style="text-align:right">
              <v-icon v-if="item.value == -1">mdi-sort-alphabetical-descending</v-icon>
              <v-icon v-if="item.value == 1">mdi-sort-alphabetical-ascending</v-icon>
            </v-col>
          </v-row>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-row no-gutters>
          <v-col style="text-align:center">
            <v-btn text @click="save" color="primary">close</v-btn>
          </v-col>
        </v-row>
      </v-list-item>
    </v-list>
  </v-dialog>
</template>
<script>
export default {
  data() {
    return {
      dialog: false,
      orderItems: this.model,
      renderComponent: true
    };
  },
  created(){
    
    for(let _item of this.orderItems){
      if(_item.default){
        this.order(_item,_item.default)
      }
    }
  },
  props: ["model"],
  watch:{
    model(value){
      this.orderItems = value
    },
  },
  methods: {
    show() {
      this.dialog = true;
    },
    order(item, value) {
     
      this.renderComponent = false;
      this.orderItems.forEach(element => {
        
        if (element.name == item.name) {
          if(value){
           element.value = value
        }
         else{
           element.value = item.value == 1 ? -1 : item.value == -1 ? null : 1;
         } 
        } else {
          element.value = null;
        }
      });
      this.$emit("changeOrder", this.orderItems);
      this.renderComponent = true;
    },
    save() {
      this.dialog = false;
    }
  }
};
</script>