

<template>

  <div class="mx-auto " style="max-width:600px;width:100%;">
    <div class="title mb-5 mt-10 text-center">Invoice Preview</div>
      <v-card v-if="model"   outlined>

<div  class="ma-7" id="printPanel">
 
<div :style="setup ? divStyle : ''" >
<img width="100%"  style="margin-bottom:10px;"  v-if="setup && setup.bannerPhoto" :src="imageUrl + setup.bannerPhoto" />



     <table   :style="'border-collapse: collapse;width:100%;' + fontStyle">
       
      <tr>
        <td colspan="2">
            Date.{{moment(model.date).format("DD-MMM-YYYY")}}
        </td>
        <td style="text-align:right;">
            
        </td>
    </tr>   
     <tr>
        <td colspan="2">
            Invoice No.
        </td>
        <td style="text-align:right;">
            {{model.invoiceNumber}}
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
        {{model.customer.name}} ({{model.customer.customerId}})
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
       <td style="text-align:right">{{numeral(item.unitPrice).format("0,0.0")}}
      </td>
       <td style="text-align:right">{{numeral(item.amount).format("0,0.0")}}
      </td>
    </tr>
    <tr style="border-top:solid 1px #000">
      <td  colspan="3">Discount</td>
      <td style="text-align:right">
           {{numeral(model.discountAmount).format("0,0.0")}}
      </td>
    </tr>
     <tr>
      <td colspan="3">Tax</td>
      <td style="text-align:right">
          {{numeral(model.taxAmount).format("0,0.0")}}
      </td>
    </tr>
    <tr  style="border-top:solid 1px #000">
      <td colspan="3">Total Items {{model.items.length}}</td><td></td>
    </tr>
     <tr  style="border-top:solid 1px #000;margin: 30px 0">
      <td colspan="3" >Amount</td>
      <td style="text-align:right">{{numeral(model.total).format("0,0.0")}}</td>
    </tr>
    <tr>
      <td>
       
      </td>
      </tr>
<tr>
        <td >
     
   
      <barcode v-if="qr" :key="qr" style="margin-top:15px" :value="qr" 
                  :size=100
                  format="CODE128" 
                  label="Barcode Fail"
                  hidelabel="true"
                  />
                
                 
        </td>
        
      
    </tr>
  </table>
   <div style="font-size:12px;text-align:center;margin-bottom:10px;margin-top:10px;">
     Invoice Ref: {{model._id}}
                  </div>

  <img width="100%" style="margin-top:10px" v-if="setup && setup.footerPhoto" :src="imageUrl + setup.footerPhoto" />
</div>
</div>

      </v-card>
      <div style="position:fixed; right:20px; bottom:20px;">
          <v-btn @click="print"  color="primary" fab dark>
            <v-icon>mdi-printer</v-icon>
          </v-btn>
        </div>
 <v-row class="mt-5 mb-12" no-gutters>
        <v-col>
          <v-btn @click="cancel" style="border-radius:0" large block text>back</v-btn>
        </v-col>
       
      </v-row>
  </div>
</template>

<script>
import moment from "moment";
import numeral from "numeral";
import constants from "../../../common/constants"
import barcode from "../Components/Common/CustomBarcodeGenerator"
export default {
  components:{
    barcode
  },
  async mounted(){
      const _id = this.$route.params.id;
      this.model = await this.$store.dispatch("posfrontend/getInvoice", {id:_id});
  },
 data() {
    return {
      model: null,
    }},
    methods:{
        print(){
         
          this.$htmlToPaper('printPanel');
          this.$router.go(-1);
         
        },
        cancel(){
          this.$router.go(-1);
        }
    },
  
    computed:{
      moment(){
        return moment
      },
      numeral(){
        return numeral
      },
      qr(){
           let _qr = {saleid:this.model._id,invno: this.model.invoiceNumber};
           return JSON.stringify(_qr)
      },
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