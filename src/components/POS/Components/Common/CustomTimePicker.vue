<template>
<div>
  <div class="overline mb-2">{{label}}
  <div v-if="error" style="color:red" class="overline ">{{error}}</div>

  </div>
  
    <v-row class="align-start" no-gutters="">
        <v-col>
          <div class="d-flex  align-center justify-center">
       

            <v-combobox
            outlined=""
           
            class="combo-box ml-2 mr-2"
          
            dense=""
          v-model="hour"
          :items="hours"
          item-value="value"
          @change="change"
        ></v-combobox>
          <v-combobox
             outlined=""
            class="combo-box  mr-2"
          
            dense=""
          v-model="minute"
          :items="minutes"
          item-value="value"
          @change="change"
        ></v-combobox>

          <v-combobox
            outlined=""
            class="combo-box"
           
            dense=""
          v-model="ampm"
          :items="['AM','PM']"
          @change="change"
        ></v-combobox>
          </div>
        </v-col>
 
            
      
    </v-row>

</div>
</template>

<script>
import moment from "moment"
export default {
    props:["model","value","label","error"],
    created() {
      if(this.model){
        this.hour = moment(this.model).format("hh") ;
        this.minute = moment(this.model).format("mm");
        this.ampm = moment(this.model).format("A");
      }
      
    },
    computed:{
    },
    watch: {
 
    },
    methods:{
      change(){
        // eslint-disable-next-line no-console
        console.log("change time")
        if(this.hour < 1){
          this.hour = 1
        }
        if(this.hour > 12){
          this.hour = 12
        }
        if(this.minute < 0){
          this.minute = 0
        }
        if(this.minute > 59){
          this.minute = 59
        }
          // eslint-disable-next-line no-console
        console.log("change time", this.hour)
        try{
        const _value = moment("1/1/2000 " + this.hour + ":" +this.minute + " " + this.ampm)
        this.$emit("change", {name:this.value,value:_value});
        }catch(e){
          // eslint-disable-next-line no-console
          console.log(e)
        }
        
      }

    },
    data: () => ({ 
   
      hour: "01",
      minute: "00",
      hours:["01","02","03","04","05","06","07","08","09","10","11","12"],
      minutes:["00","15","30","45"],
      ampm: "AM"
    }),
   
  }
</script>
<style scoped>
.combo-box {
  max-width: 80px;
   margin-top: 2px;
   padding:0;
   border-radius: 0;

}
.v-input__control{
  background-color: red;
}
.v-input__slot{
  border:none !important;
  background-color: red;
}
</style>