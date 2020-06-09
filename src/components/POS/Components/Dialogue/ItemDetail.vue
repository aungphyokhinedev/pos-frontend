

<template>
  <div class="text-center">
    <v-dialog v-model="dialog" max-width="500">
      <v-card v-if="value" class="mx-auto pa-5 pl-0 pr-0" outlined>
        <v-list-item  three-line class="ml-2 mr-2 mt-0 mb-3">
          <v-list-item-content>
            <div class="overline mb-4">{{model.title}}</div>

            <template v-for="(item,i) in model.items">
              <v-list-item-title
                v-if="item.type == 'title' && item.index == i + 1"
                :key="i"
                class="headline mb-1"
              >{{value[item.value]}}</v-list-item-title>
              <template v-if="item.type == 'subtitle' && item.index == i + 1">
                <div class="mb-1" :key="i">
                  <v-list-item-title v-if="setNested(item.value,value) != null">{{item.label}}</v-list-item-title>
                  <v-list-item-subtitle>{{setNested(item.value,value)}}</v-list-item-subtitle>
                </div>
              </template>
                 <template v-if="item.type == 'link' && item.index == i + 1">
                <div class="mb-1" :key="i">
                  <v-list-item-title v-if="setNested(item.value,value) != null">{{item.label}}</v-list-item-title>
                  <v-list-item-subtitle  @click="go(item)"><a>{{setNested(item.value,value)}}</a></v-list-item-subtitle>
                </div>
              </template>

              <template v-if="item.type == 'barcode' && item.index == i + 1">
               <v-expansion-panels  :key="'qrcode' + i" flat>
          <v-expansion-panel>
            <v-expansion-panel-header  class="pa-0 ma-0">{{item.title}}</v-expansion-panel-header>
            <v-expansion-panel-content class="exp-dense">
               <v-row no-gutters="" class="d-flex align-center mt-2 mb-2">
                    <v-col no-gutters="">
                     <v-card style="border:solid 1px #ddd" width="129" height="129" class="pa-1 elevation-0" color="white">
                       <barcode :value="value[item.value]" 
                  :size=120
                  format="CODE128" 
                  label="Barcode Fail"
                  :hidelabel="item.hidelabel"
                
                  />
                    </v-card> 
                    </v-col>
                    <v-col class="text-right">
                     <v-btn  x-small="" class="primary" dark
                  @click="downloadQR(i,value[item.name])"
                   icon  fab><v-icon x-small >mdi-download</v-icon></v-btn>
                    </v-col>
                  </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
               
               
              </template>
            </template>
          </v-list-item-content>
        </v-list-item>
        <v-divider />
        <v-expansion-panels v-if="model.advanceActions" flat>
          <v-expansion-panel>
            <v-expansion-panel-header>Advance Actions</v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-list subheader three-line>
                <template  v-for="(item,i) in advanceActions">
                  
                  <v-list-item v-if="!item._disable" :key="i" style="padding:0">
                    <v-list-item-content style="padding:0">
                      <v-list-item-title>{{item.title}}</v-list-item-title>
                      <v-list-item-subtitle>{{item.subtitle}}</v-list-item-subtitle>
                      <v-list-item-subtitle>
                        <v-btn
                          small
                          @click="doAction(item)"
                          outlined
                          color="primary"
                          tile
                          class="mt-4 mb-6"
                        >Continue</v-btn>
                        
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  
                  </v-list-item>
                  
                   
                </template>
                
              </v-list>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <v-divider />
        <v-expansion-panels v-if="model.actions" flat>
          <v-expansion-panel>
            <v-expansion-panel-header>More Actions</v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-list subheader three-line>
                <template  v-for="(item,i) in actions">
                  
                  <v-list-item v-if="!item._disable" :key="i" style="padding:0">
                    <v-list-item-content style="padding:0">
                      <v-list-item-title>{{item.title}}</v-list-item-title>
                      <v-list-item-subtitle>{{item.subtitle}}</v-list-item-subtitle>
                      <v-list-item-subtitle>
                        <v-btn
                          small
                          @click="doAction(item)"
                          outlined
                          color="primary"
                          tile
                          class="mt-4 mb-6"
                        >Continue</v-btn>
                        
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  
                  </v-list-item>
                  
                   
                </template>
                
              </v-list>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <v-list-item one-line class="ml-2 mr-2">
          <v-list-item-content>
            <div class="text-center">
              <v-btn @click="close" color="primary" text>Close</v-btn>
            </div>
          </v-list-item-content>
        </v-list-item>
        
      </v-card>
    </v-dialog>
  
  </div>
</template>
<script>

import FileSaver from "file-saver";
import constants from "../../../../common/constants";
import utility from "../../../../common/utility";
import barcode from "../Common/CustomBarcodeGenerator"

export default {
  components: {
    barcode:barcode
  },
  computed: {
    baseUrl() {
      return constants.baseUrl;
    },
    setNested() {
      return utility.setNestedValueData;
    },
    actions() {
   
      let _actions = [...this.model.actions]
      return this.prepareActions(_actions)
    },
    advanceActions() {
   
      let _actions = [...this.model.advanceActions]
      return  this.prepareActions(_actions)
    },
    

  },
  props: ["model"],
  data() {
    return {
      dialog: false,
      value: null
    };
  },
  methods: {
    go(params){
        alert(JSON.stringify(params))
    },
   downloadQR(params,name){
    
     var canvas = document.querySelector("#qrcode" +params+ " canvas");
     canvas.toBlob(function(blob) {
   FileSaver.saveAs(blob, "qr_" + name +".png");
}.bind(this));
     
     
   },
    prepareActions(params){
      for (var action of params) {
       
        if(action.type == 'link'){
          action.newurl = utility.setUrlData(action.url, this.value);
        }
        if(action.condition && action.condition instanceof Function) {
          action._disable = !action.condition(this.value)
        }
        
      }
      return params;
    },
    show(value) {
      this.dialog = true;
      this.value = value;
    },
    doAction(action){
      if(action.type == 'link'){
        this.route(action.newurl)
      }
      else if(action.type == 'action'){
        if(action.do && action.do instanceof Function){
          
          action.do(this.value,this)
        }
       
      }

    },
    route(url) {
      this.$router.push(url);
    },
    close() {
      this.dialog = false;
    },
    addSalePerson() {
      this.dialog = false;
      this.$emit("addsaleperson", this.shop);
    }
  }
};
</script>
<style >
.exp-dense .v-expansion-panel-content__wrap{
  padding: 0 !important;
}
</style>