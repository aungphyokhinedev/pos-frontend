<template>
  <div class="mb-5 mt-2">
    <div class="text-right mb-2">
  <v-btn small class="pa-0" @click="addNewCriteria" text color="primary" >
              Add New option <v-icon small>mdi-plus</v-icon>
             </v-btn>
            
    </div>
    <template v-for="(item,i) in criterias" >
        <div class="mb-5" :key="i">
       
<div >
    <div class="d-flex align-center justify-space-between flex-direction-row">
 <div class="overline">{{item.name}} [{{item.type}}]</div>

  </div>
      <v-chip-group
        v-model="item.group"
        column
        multiple
        
      >
        <span v-for="(childitem,i) in item.items" :key="i">
                 <CustomCriteria  :type="item.type" :model="childitem" />
             </span>
           
         
      </v-chip-group>
<div class="d-flex align-center justify-space-between flex-dierection-row">
      <v-chip outlined="" color="primary" @click="addNewItem(item)">
           Add New <v-icon small>mdi-plus</v-icon>
      </v-chip>
     <v-btn v-if="item.group && item.group.length > 0" small class="pa-0" @click="removeItems" text 
              color="red" >
              Remove
             </v-btn>
</div>  
</div>
       
   
        </div>
    </template>
 

    <EntryForm
    key="entry"
    :title="entryModel.title"
    :subtitle="entryModel.subtitle"
    :items="entryModel.items" 
    v-on:save="saveCriteria" 
    ref="entry" />
      <EntryForm
      :key="'item' + currentCriteria.type"
      v-if="currentCriteria"
    :title="itemEntryModel.title"
    :subtitle="itemEntryModel.subtitle"
    :items="itemEntryModel.items" 
    v-on:save="saveItem" 
    ref="itementry" />

  </div>
</template>

<script>

import CustomCriteria from "../Common/CustomCriteria"
export default {
  name:"criteria-entry",
  components: {
    EntryForm:() =>  import("../Dialogue/EntryForm"),
    CustomCriteria
  },
  created() {
    if(this.model){
      try{
      const _data = JSON.parse(this.model)
      if(_data){
        this.criterias = _data;
      }
      }catch(e){
        // eslint-disable-next-line no-console
        console.log(e)
      }
    }
  },
  props:["model","value"],
  computed: {
    isSeleted(){
      const _seleteds = this.criterias.reduce((total,item)=>total+(item.group?item.group.length:0),0)
      // eslint-disable-next-line no-console
      console.log(_seleteds)
      return _seleteds > 0
    },

      itemEntryModel(){
if(!this.currentCriteria) return null;

  if(this.currentCriteria.type == 'label'){
              return {
              title: "New Label",
          subtitle:"Please put new " +  this.currentCriteria.name,
          items:[
            {
            index: 1,
            type: "text",
            label: "Value",
            icon: "mdi-account-outline",
            value: "label",
            required: true,
            counter: 30
            // rules: [{rule:constants.emailRule,message:"Invalid Email"}]
            }
          ]
          }
          }
          else if(this.currentCriteria.type == 'color'){
              return {
              title: "New Color",
          subtitle:"Please put new " +  this.currentCriteria.name,
          items:[
            {
            index: 1,
            type: "text",
            label: "Name",
            icon: "mdi-account-outline",
            value: "label",
            required: true,
            counter: 30
            // rules: [{rule:constants.emailRule,message:"Invalid Email"}]
            },
            {
            index: 2,
            type: "color",
            label: "Value",
            icon: "mdi-account-outline",
            value: "value",
            required: true,
            // rules: [{rule:constants.emailRule,message:"Invalid Email"}]
            },
          ]
          }
          }
          else{
return {
              title: "New Label",
          subtitle:"Please put new " +  this.currentCriteria.name,
          items:[

            {
            index: 1,
            type: "number",
            label: "Value",
            icon: "mdi-account-outline",
            value: "value",
            required: true,
            // rules: [{rule:constants.emailRule,message:"Invalid Email"}]
            },
          ]
          }
          }
      },
      entryModel(){

          return {
          title: "New Product Criteria",
          subtitle:"Please put new criteria information",
          items:[
            {
            index: 1,
            type: "text",
            label: "Criteria Name",
            icon: "mdi-account-outline",
            value: "name",
            required: true,
            counter: 30
            // rules: [{rule:constants.emailRule,message:"Invalid Email"}]
            },
            {
            index: 2,
            type: "dropdown",
            label: "Value Type",
            icon: "mdi-account-outline",
            items:["label","number","color"],
            value: "type",
            required: true,
            counter: 30
            // rules: [{rule:constants.emailRule,message:"Invalid Email"}]
            },
          ]
      } 
      },
      criteriasData(){
        const _values = this.criterias.map(item=>{
        return {name:item.name,
        type:item.type,
        items:item.items}

        })
        return JSON.stringify(_values)
      }

  },
  watch: {
    criteriasData(value){
      
      this.$emit("change", { name: this.value, value});
    }
  },
  methods: {
   
    removeItems(){
      let _newdata = this.criterias.map(item=>{
        
        const _newitems = item.items.filter((childitem,i)=>{
         
          return item.group ? item.group.indexOf(i) < 0 : true
        })
        // eslint-disable-next-line no-console
          console.log(_newitems)

        return {
          name: item.name,
          type:item.type,
          items: _newitems,
        }
      })

      this.criterias = _newdata

    },
      saveCriteria(params){
         const _exit =  this.criterias.filter(item=>item.name == params.name).length  
         if(_exit){
             alert("Item name must be different from existing items.")
             return
         }
          this.currentCriteria = {...params,items:[]}
          this.criterias.push(this.currentCriteria)
            
      },
       saveItem(params){
          const _params = params.label?params:{...params,label:params.value};
          const _exit =  this.currentCriteria.items.filter(item=>item.label == _params.label).length
          if(_exit){
              alert("Item label/value must be different from existing items.")
              return
          }
          this.currentCriteria.items.push(_params)
       },
    addNewCriteria(){
      this.$refs.entry.show();
    },
    addNewItem(item){  
        this.currentCriteria = item;
         this.$nextTick(()=>{
             this.$refs.itementry.show(); ///is supposed to run after the looping process is completed, but always seem to run just before starts... then the looping is done in a split second
});
     
    }
  },
  data: () => ({
      criterias:[],
      currentCriteria: null,
  })
};
</script>

<style lang="scss">
</style>