<template>
<div>

<div v-if="display=='table'"> 
 
 <v-data-table 
        v-bind="$attrs"
        :page="page"
        hide-default-footer
        :show-select="selectable == 'true'"
        dense
        :headers="headers"
        :items="items"
        :item-key="model.key"
        v-model="selectedItems"
      >
        <template v-slot:item.edit="{ item }">
          <a @click="edit(item)">{{item.edit ? item.edit: '-'}}</a>
        </template>
      </v-data-table>

      <v-row no-gutters>
        <v-btn small @click="previous" v-if="hasPrevious" text>
          <v-icon>mdi-chevron-left</v-icon>back
        </v-btn>
        <v-spacer />

        <v-btn small right @click="next" v-if="hasNext" text>
          next
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-row>

</div>
<div v-if="display !='table'">
   <v-divider v-if="items && items.length > 0"/>
    <v-list two-line >
    
      <v-list-item
     
        v-for="item in items"
        :key="item[model.key]"
      >
        <v-list-item-avatar

        class="secondary" 
          @click="edit(item)">
              <img style="border:solid 1px #ccc" v-if="model.listData.logo != null && item[model.listData.logo] != null"
        :src="imageUrl + item[model.listData.logo]"
      >
      
          <v-icon dark v-if="model.listData.logo  == null || item[model.listData.logo] == null"
          >
          {{model.listData.icon}}
          </v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title @click="edit(item)" v-text="item[model.listData.title]"></v-list-item-title>
          <v-list-item-subtitle v-html="item[model.listData.subtitle]"></v-list-item-subtitle>
      
        </v-list-item-content>

        <v-list-item-action v-if="selectable == 'true'">
         <v-checkbox
        v-model="item.checked"
        @change="selectList"
      ></v-checkbox>
        </v-list-item-action>
      </v-list-item>
    </v-list>
 </div>   
</div>
</template>

<script>
import constants from "../../../../common/constants"
export default {
    props:["model","display","selectable"],
    created() {
        this.page = this.model.page
        this.size = this.model.size || this.model.items.length
       
    },
    computed:{
         imageUrl() {
      return constants.imageUrl;
    },
        items() {
            let _items = []
            for(let _item of this.model.items){
              ///for edit/detail click
                if(this.model.editItem){
                    _item.edit = _item[this.model.editItem]
                }
                _items.push(_item)
            } 
            return _items;
        },
        headers() {
            let _headers = []
            for(let _item of this.model.headers){
                if(_item.edit){
                    _item.value = "edit"
                }
                _headers.push(_item)
            }
            return _headers;
        },
        hasPrevious() {
        return this.page > 1;
        },
        hasNext() {
        return this.total > this.page * this.size;
        },
        total() {
        return this.model.items.length;
        },
    },
    watch: {
        selectedItems(values){
          let _ids = values.map(item=>item._id);         
          let _newitems = this.model.items.map(item=>{
            return {...item,
            checked: _ids.indexOf(item._id) >= 0}
          })    
          this.model.items = _newitems; 
          this.selected = [...values]
        },
        selected(value){
            this.$emit("select",value)
        }
    },
    methods:{
        selectList(){
            let _selected = []
            for(let _item of this.items){
                if(_item.checked){
                    _selected.push(_item)
                }
            }
            this.selected = [..._selected]
        },
        edit(item){
            this.$emit("edit",item)
        },
      previous() {
        this.page -= 1;
        },
        next() {
        this.page += 1;
        },
    },
    data: () => ({ 
      page: 1,
      size:10,
      selected: [],
      selectedItems: [],
      dataItems: []
    }),
   
  }
</script>
<style scoped>
</style>