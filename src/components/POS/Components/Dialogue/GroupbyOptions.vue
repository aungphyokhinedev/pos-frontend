<template>
  <v-dialog style="border-radius:0" title v-model="dialog" max-width="350">
  
    <v-list class="pa-5">
      <v-subheader class="caption mt-3">{{model.title}}</v-subheader>
      <v-list-item v-for="item in groupItems" @click="group(item)" :key="item.index">
        <v-list-item-content>
          <v-row no-gutters>
            <v-col>{{item.name}}</v-col>
            <v-spacer />
          
            <v-col style="text-align:right">
              <v-icon v-if="item.checked">mdi-check-box-outline</v-icon>
              <v-icon v-if="!item.checked">mdi-checkbox-blank-outline</v-icon>
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
      groupItems: []
    };
  },
  created(){
      this.groupItems = [...this.model.items]
  },
  props: ["model"],
  methods: {
    show() {
      this.dialog = true;
    },
    group(item) {
      this.groupItems = this.groupItems.map(groupitem=>{
          let _checked = groupitem.index == item.index ? !item.checked : false;
          return {...groupitem,checked : _checked} })
     
      this.$emit("change", this.groupItems);
    },
    save() {
      this.dialog = false;
    }
  }
};
</script>