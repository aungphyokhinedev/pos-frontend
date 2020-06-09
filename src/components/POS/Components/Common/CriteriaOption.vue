<template>
  <div>
    <template v-for="(item,i) in criterias" >
        <div class="mb-0" :key="i">
       
<div >
    <div class="d-flex align-center justify-space-between flex-direction-row">
 <div class="overline mt-1">{{item.name}}</div>
  </div>
      <v-chip-group
        v-model="item.group"
        column

      >
        <span v-for="(childitem,i) in item.items" :key="i">
                 <CustomCriteria   :type="item.type" :model="childitem" />
             </span>
         
      </v-chip-group>
  
   
</div>
       
   
        </div>
    </template>
  </div>
</template>

<script>

import CustomCriteria from "../Common/CustomCriteria"
export default {
  components: {
    CustomCriteria
  },
  created() {
   
      try{
      let _data = JSON.parse(this.model)
      if(_data){
        if(this.select){
          const _selected = this.select.split(",")
          const _items = _selected.map(item=>{
            const _value = item.split(":")
            return {
              label:_value[0],
              value:_value[1]
            }
          })
          _data = _data.map(item=>{
             const _value = _items.filter(select=>select.label == item.name)[0]
               // eslint-disable-next-line no-console
          console.log(_value)
            // eslint-disable-next-line no-console
          console.log(item.items)
             let _index = item.items.map(child=>child.label).indexOf(_value.value)
 // eslint-disable-next-line no-console
          console.log(_index)
             return {
               ...item,group:_index
             }
          })

        }
        this.criterias = _data;
      }
      }catch(e){
        // eslint-disable-next-line no-console
        console.log(e)
      }
    
  },
  props:["model","value","select"],
  computed: {
    isSeleted(){
      const _seleteds = this.criterias.reduce((total,item)=>total+(item.group?item.group.length:0),0)
      // eslint-disable-next-line no-console
      console.log(_seleteds)
      return _seleteds > 0
    },
     seleteds(){
       return  this.criterias.map(item=>{
            const _item = (item.items && item.group >= 0) ? item.items[item.group] : null;
            return    {
                label: _item?_item.label:"",
                value: _item?_item.value:"all",
                type: item.type
            }
        })
    },
    values(){
       return  this.criterias.map(item=>{
            const _value = (item.items && item.group >= 0) ? item.items[item.group].label : 'all';
            return    {
                name: item.name,
                value: _value,
                type: item.type
            }
        })
    },
    selected(){
        const _values = this.values.map(item=>{
            return item.name + ":" +item.value
        })
        return _values.join(",")
    }
  },
  watch: {
      selected(value){
          this.$emit("change",{name:this.value,value, meta:this.seleteds})
      }
  },
  methods: {
   
  },
  data: () => ({
      criterias:[],
  })
};
</script>

<style lang="scss">
</style>