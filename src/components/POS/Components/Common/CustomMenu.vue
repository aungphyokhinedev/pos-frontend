<template>
<div>

   <v-menu transition="slide-x-transition"
  
   :close-on-content-click="false"
    bottom right>
            <template v-slot:activator="{ on }">
              <v-btn text color="primary" v-on="on">
                {{selectedItem.title}}
                <v-icon small>mdi-chevron-down</v-icon>
              </v-btn>
            </template>

            <v-list dense="" class="pa-3 pb-7 pt-7" >
             <template v-for="(item, i) in this.model.items">
              <v-list-item v-if="!item.group" :key="i" @click="select(item)">
                <v-list-item-title color="primary">
                  <v-icon  class="mr-5">{{item.icon}}</v-icon>
                  <span  class="mr-5" >{{ item.title }} </span>
                </v-list-item-title>
              </v-list-item>

               <v-list-group
               v-if="item.group"
:key="i"
          no-action
       
           :prepend-icon="item.icon"
        
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>{{item.title}}</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="(childitem, k) in item.items"
            :key="k"
            @click="select(childitem)"
          >
            <v-list-item-title v-text="childitem.title"></v-list-item-title>
            
          </v-list-item>
        </v-list-group>
             </template>
            </v-list>
          </v-menu>
          </div>
</template>


<script>
export default {
  props: ["model","value"],
  created() {
     
      if(this.value){
          this.selectedValue = 0//this.value.value
      }
      else{

          this.selectedValue = 0
      }
  },
  watch: {
      selectedValue(){
            for(var item of this.listItems){
                if(item.value == this.selectedValue){
                    this.$emit("change",item);
                }
            }
      }
  },
   computed: {
      listItems(){
        var _items = this.model.items.filter(item=>item.group != true)
        this.model.items.filter(item=>item.group == true).map((item)=>_items = _items.concat(item.items))
        return _items;
      },
      selectedItem(){

            for(var item of this.listItems){
                if(item.value == this.selectedValue){
                    return item
                }
            }
            return null
      }
  },
  methods: {
    close() {
      this.$emit("close");
    },
    select(item){
        this.selectedValue = item.value
    }
  },
  data() {
    return {
        selectedValue : null
    };
  }
};
</script>
<style scoped>
</style>