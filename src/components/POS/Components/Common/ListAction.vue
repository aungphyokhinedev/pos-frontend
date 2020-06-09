
<template>
<div v-if="model"> 
  <template  v-for="(item,i) in items">
      <v-btn 
      @click="doAction(item)"
      :key="i" v-if="item.type == 'action' && !item._disable" icon>
          <v-icon>
              {{item.icon}}
          </v-icon>
      </v-btn>
      </template>
</div>
</template>

<script>

export default {
props: ["model","data"],
  computed:{
     items(){
         return this.model.items.map(item=>{
             let _item = {...item}
             if(item.condition && item.condition instanceof Function){
                _item._disable = !item.condition(this.data)
             }
             return _item
         })
     }     
  },
  methods:{
       doAction(action){
      if(action.type == 'link'){
        this.route(action.newurl)
      }
      else if(action.type == 'action'){
        if(action.do && action.do instanceof Function){
          
          action.do(this.data,this)
        }
       
      }

    },
  },
  data() {
    return {
    };
  }
};
</script>

<style scoped>
</style>