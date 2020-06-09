<template>
<div>
  <div class="overline">{{label}}</div>
  <div class="mt-2  d-flex flex-direction-row justify-center align-center flex-wrap">
  <div  v-for="(item,i) in days" :key="i" >
  <v-avatar class="ml-1 mb-1" 
  :color="item.checked?'accent':''" @click="select(item)"   tile>
    <v-label >{{item.label}}</v-label>

  </v-avatar>

  </div> 
  </div> 
</div>
</template>

<script>
export default {
    props:["model","value","label"],
    created() {
      if(this.model){
        const _checks = this.model.split(",");
        // eslint-disable-next-line no-console
        console.log("_checks", _checks);
        let _items = this.days.map(item=>{
              var _item = {...item}
              if(_checks.indexOf(_item.label) >= 0){
                  _item.checked = !_item.checked
              }
              return _item;
          })
          this.days = _items;
      }
      
    },
    computed:{
    },
    watch: {
 
    },
    methods:{
      select(params){
         let _items = this.days.map(item=>{
              var _item = {...item}
              if(params.label == _item.label){
                  _item.checked = !_item.checked
              }
              return _item;
          })
          this.days = _items;
          
          this.$emit("change", {name:this.value,
          value:_items.filter(item=>item.checked).map(item=>item.label).join(",")});
      }
    },
    data: () => ({ 
      days:[
          {label:"Sun",checked:false},
          {label:"Mon",checked:false},
          {label:"Tue",checked:false},
          {label:"Wed",checked:false},
          {label:"Thu",checked:false},
          {label:"Fri",checked:false},
          {label:"Sat",checked:false},
          ]
    }),
   
  }
</script>
<style scoped>
.combo-box {
  max-width: 70px;
   margin: 2px;
}
</style>