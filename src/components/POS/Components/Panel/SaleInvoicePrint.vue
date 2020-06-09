

<template>
 <v-dialog  v-model="dialogue" max-width="600" persistent>
  
      <v-card v-if="model" :key="model.invoiceno" class="mx-auto " outlined>

<div class="ma-7" id="printPanel">
 
<div :style="setup ? divStyle : ''" >
<img width="100%" style="margin-bottom:10px"  v-if="setup && setup.bannerPhoto" :src="imageUrl + setup.bannerPhoto" />



     <table   :style="'border-collapse: collapse;width:100%;' + fontStyle">
       
        
     <tr>
        <td colspan="2">
            Invoice No.
        </td>
        <td style="text-align:right;">
            {{model.invoiceno}}
        </td>
    </tr>
    <tr v-if="model.shop">
        <td colspan="2">
            Shop
        </td>
        <td style="text-align:right">
            {{model.shop.name}}<br/>
{{model.shop.mobile}}<br/>
{{model.shop.address}}<br/>
        </td>
    </tr>
 <tr v-if="model.user">
        <td colspan="2">
            Sale Person
        </td>
        <td style="text-align:right">
            {{model.user.name}}
        </td>
    </tr>
       <tr v-if="model.customer">
      <td colspan="2">Customer
      </td>
     
      <td style="text-align:right">
        {{model.customer.name}} ({{model.customer.id}})
      </td>
    </tr>
     </table>
  <table  :style="'border-collapse: collapse;width:100%;' + fontStyle">
   
   
    <tr style="border-top:solid 1px #000;border-bottom:solid 1px #000;">
      <td>Name
      </td>
      <td>Qty 
      </td>
      <td style="text-align:right">Price
      </td>
      <td style="text-align:right">
        Amount
      </td>
    </tr>
    <tr :key="item._id" v-for="item in model.items">
      <td>{{item.name}} ({{item.unit}})
      </td>
       <td style="padding-right: 10px;">{{item.qty}} 
      </td>
       <td style="text-align:right">{{item.displayPrice}}
      </td>
       <td style="text-align:right">{{item.displayAmt}}
      </td>
    </tr>
    <tr style="border-top:solid 1px #000">
      <td  colspan="3">Discount</td>
      <td style="text-align:right">
           {{model.discount}}
      </td>
    </tr>
     <tr>
      <td colspan="3">Tax</td>
      <td style="text-align:right">
          {{model.tax}}
      </td>
    </tr>
    <tr  style="border-top:solid 1px #000">
      <td colspan="3">Total Items {{model.total}}/{{model.totalQty}}</td><td></td>
    </tr>
     <tr  style="border-top:solid 1px #000;margin: 30px 0">
      <td colspan="3" >Amount</td>
      <td style="text-align:right">{{model.totalAmount}}</td>
    </tr>
    <tr>
      <td>
       
      </td>
      </tr>
<tr>
        <td colspan="3">
     
        </td>
        
        <td style="text-align:right;">
             <barcode v-if="model.qr" :key="model.qr" style="float:right;margin-top:20px;" :value="model.qr" 
                  :size=100
                  format="CODE128" 
                  label="Barcode Fail"
                  hidelabel="true"
                  />
        </td>
    </tr>
  </table>
  <img width="100%" style="margin-top:10px" v-if="setup && setup.footerPhoto" :src="imageUrl + setup.footerPhoto" />
</div>
</div>
 <v-row class="mt-10" no-gutters>
        <v-col>
          <v-btn @click="cancel" style="border-radius:0" large block>CANCEL</v-btn>
        </v-col>
        <v-col>
          <v-btn @click="print" style="border-radius:0" large block color="primary" dark>PRINT</v-btn>
        </v-col>
      </v-row>
      </v-card>
 </v-dialog>
</template>

<script>
import constants from "../../../../common/constants"
import barcode from "../Common/CustomBarcodeGenerator"
export default {
  components:{
    barcode
  },
  props:["model"],
 data() {
    return {
      dialogue: false
    }},
    methods:{
      cancel(){
this.dialogue = false;
      },
        print(){
         
          this.$htmlToPaper('printPanel');
          this.dialogue = false;
         
        },
        show(){
          this.dialogue = true;
        }
        
    },
    mounted(){
    },
    computed:{
      imageUrl() {
        return constants.imageUrl
      },
      fontStyle(){
        if(!this.setup) return ''
        return this.setup.fontSize? ('font-size:' + this.setup.fontSize + 'px;'):'';
      },
      divStyle() {
        if(!this.setup) return ''
        return this.setup.width?('width:' + this.setup.width +'cm;'):'';
        
      },
      setup() {
      return this.$store.state.posfrontend.invoiceSetup;
    },
    }
  }
</script>
<style scoped>
</style>