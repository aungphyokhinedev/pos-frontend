

<template>
  <div  >
       <v-text-field  outlined=""
              title=""
              small
              dense
              placeholder="Custom Function"
              v-model="formula"
            ></v-text-field>
      <v-btn @click="addRow">Add Row</v-btn>
     <v-btn @click="cno++">Add Column</v-btn>
     {{rows}}

     <v-row no-gutters="" v-for="(row,i) in rows" :key="i">
         <v-col v-for="(col,j) in cno" :key="j">
              <v-text-field  outlined=""
              title=""
              small
              dense
              :placeholder="cnames[j]"
              @change="change"
              v-model="row[cnames[j]]"
            ></v-text-field>
         </v-col>
     </v-row>
   
  </div>

</template>

<script>
export default {
  components: {
  },
  computed: {
  },
  watch:{
      rows(value){
          for(let row of value){
              if(this.process)
              this.process(row)
          }
      },
      formula(value){
          try{
              this.process = eval("(row)=>{" + value + "}") ;
          }
          catch{
              this.process = null
          }
      }

  },
  async created() {
  },
  data: () => ({
      cnames:["A","B","C","D","E","F"],
      rows:[],
      cno:0,
      formula:null,
      process:null,
      test: null
  }),
  methods: {
      change(){
          this.rows = [...this.rows]
      },
      addRow(){ 
          this.rows.push({})
      },
  }
};
</script>
<style scoped>
</style>