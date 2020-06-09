<template>
<div>
  <div class="overline">{{label}}</div>

  <div class="mt-2  d-flex flex-direction-row justify-center align-center flex-wrap">
  <div  v-for="(item,i) in options" :key="i" >
    
  <v-avatar :title="item.name" style="border:solid 1px #bbb" class="ma-1" 
  :color="item.checked?'primary':''" @click="select(item)"  >
    <v-label :dark="item.checked" v-if="!item.icon" >{{item.name}}</v-label>
    
    <v-icon :dark="item.checked" v-if="item.icon">
        {{item.icon}}
    </v-icon>
  </v-avatar>

  </div> 
  </div> 
</div>
</template>

<script>
export default {
    props:["model","value","label","items"],
    created() {
        this.options = [...this.items]
      if(this.model){
        

        const _checks = this.model.split(",");
        // eslint-disable-next-line no-console
        console.log("_checks", _checks);
        let _items = this.options.map(item=>{
              var _item = {...item}
              if(_checks.indexOf(_item.name) >= 0){
                  _item.checked = !_item.checked
              }
              return _item;
          })
          this.options = _items;
      }
      
    },
   
    computed:{
    },
    watch: {
 
    },
    methods:{
      select(params){
         let _items = this.options.map(item=>{
              var _item = {...item}
              if(params.name == _item.name){
                  _item.checked = !_item.checked
              }
              return _item;
          })
          this.options = _items;
          
          this.$emit("change", {name:this.value,
          value:_items.filter(item=>item.checked).map(item=>item.name).join(",")});
      }
    },
    data: () => ({ 
        options:[]
    }),
   
  }
</script>
<style scoped>
.combo-box {
  max-width: 70px;
   margin: 2px;
}
</style>